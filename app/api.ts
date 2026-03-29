// app/api.ts
// ─────────────────────────────────────────────────────────────────────────────
// SKILLEX — Supabase client + full API layer
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export function onAuthChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── STUDY GROUPS ─────────────────────────────────────────────────────────────

export async function getGroups({
  filter = 'ALL',
  sort = 'activity_density',
  userId = null as string | null,
} = {}) {
  let query = supabase.from('groups_with_stats').select('*')

  if (filter === 'MY_GROUPS' && userId) {
    const { data: memberships } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', userId)
    const ids = memberships?.map((m: any) => m.group_id) ?? []
    query = query.in('id', ids.length ? ids : ['none'])
  }

  if (filter === 'TRENDING') {
    query = query.gte('activity_7d', 3)
  }

  const { data, error } = await query.order(sort, { ascending: false })
  if (error) throw error
  return data
}

export async function getGroup(groupId: string) {
  const { data, error } = await supabase
    .from('groups_with_stats')
    .select('*')
    .eq('id', groupId)
    .single()
  if (error) throw error
  return data
}

export async function createGroup({
  code,
  tag,
  title,
  description,
  capacity = 20,
}: {
  code: string
  tag: string
  title: string
  description?: string
  capacity?: number
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to create a group')

  const { data: group, error } = await supabase
    .from('study_groups')
    .insert({ code, tag, title, description, capacity, created_by: user.id })
    .select()
    .single()
  if (error) throw error

  await supabase
    .from('group_members')
    .insert({ group_id: group.id, user_id: user.id, role: 'owner' })

  await logActivity(group.id, user.id, 'created')
  return group
}

// ─── MEMBERSHIP ───────────────────────────────────────────────────────────────

export async function joinGroup(groupId: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to join a group')

  const group = await getGroup(groupId)
  if (group.member_count >= group.capacity) throw new Error('This group is full')

  const { data, error } = await supabase
    .from('group_members')
    .insert({ group_id: groupId, user_id: user.id })
    .select()
    .single()
  if (error) throw error

  await logActivity(groupId, user.id, 'join')
  return data
}

export async function leaveGroup(groupId: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in')

  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', user.id)
  if (error) throw error

  await logActivity(groupId, user.id, 'leave')
}

export async function isMember(groupId: string, userId: string) {
  const { data } = await supabase
    .from('group_members')
    .select('id')
    .eq('group_id', groupId)
    .eq('user_id', userId)
    .maybeSingle()
  return !!data
}

export async function getGroupMembers(groupId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select('*, profiles(id, full_name, avatar_url, username)')
    .eq('group_id', groupId)
    .order('joined_at', { ascending: true })
  if (error) throw error
  return data
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────────

export async function getMessages(groupId: string, limit = 50) {
  const { data, error } = await supabase
    .from('group_messages')
    .select('*, profiles(full_name, avatar_url)')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data.reverse()
}

export async function sendMessage(groupId: string, content: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in to send messages')

  const { data, error } = await supabase
    .from('group_messages')
    .insert({ group_id: groupId, user_id: user.id, content })
    .select('*, profiles(full_name, avatar_url)')
    .single()
  if (error) throw error

  await logActivity(groupId, user.id, 'post')
  return data
}

export function subscribeToMessages(groupId: string, onMessage: (msg: any) => void) {
  const channel = supabase
    .channel(`messages:${groupId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${groupId}` },
      async (payload) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', payload.new.user_id)
          .single()
        onMessage({ ...payload.new, profiles: profile })
      }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}

export function subscribeToMembers(groupId: string, onMemberChange: (payload: any) => void) {
  const channel = supabase
    .channel(`members:${groupId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'group_members', filter: `group_id=eq.${groupId}` },
      (payload) => onMemberChange(payload)
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}

// ─── ACTIVITY ─────────────────────────────────────────────────────────────────

async function logActivity(groupId: string, userId: string, action: string) {
  await supabase
    .from('group_activity')
    .insert({ group_id: groupId, user_id: userId, action })
}

export async function getGroupActivity(groupId: string, limit = 20) {
  const { data, error } = await supabase
    .from('group_activity')
    .select('*, profiles(full_name)')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}
export function onAuthChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
}
