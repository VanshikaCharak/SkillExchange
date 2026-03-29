// app/hooks.ts
// ─────────────────────────────────────────────────────────────────────────────
// SKILLEX — All React hooks
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react'
import {
  getGroups, getGroup, createGroup,
  joinGroup, leaveGroup, isMember, getGroupMembers,
  getMessages, sendMessage, subscribeToMessages, subscribeToMembers,
  signIn, signUp, signOut, getCurrentUser, onAuthChange,
  getProfile, updateProfile,
} from './api'    // ← fixed: was '../lib/api'
    // ← fixed: was '../lib/skills-api'

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then(u => { setUser(u); setLoading(false) })
    const { data: { subscription } } = onAuthChange(setUser)
    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    return await signIn(email, password)
  }, [])

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    return await signUp(email, password, fullName)
  }, [])

  const logout = useCallback(() => signOut(), [])

  return { user, loading, login, register, logout }
}

// ─── GROUPS ───────────────────────────────────────────────────────────────────

export function useGroups(userId: string | null = null) {
  const [groups, setGroups]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [filter, setFilter]   = useState('ALL')
  const [sort, setSort]       = useState('activity_density')

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getGroups({ filter, sort, userId })
      setGroups(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [filter, sort, userId])

  useEffect(() => { fetch() }, [fetch])

  return { groups, loading, error, filter, setFilter, sort, setSort, refetch: fetch }
}

export function useGroup(groupId: string) {
  const [group, setGroup]     = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!groupId) return
    setLoading(true)
    getGroup(groupId)
      .then(setGroup)
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false))
  }, [groupId])

  return { group, loading, error }
}

// ─── MEMBERSHIP ───────────────────────────────────────────────────────────────

export function useMembership(groupId: string, userId: string | null, initialMemberCount = 0) {
  const [joined, setJoined]           = useState(false)
  const [memberCount, setMemberCount] = useState(initialMemberCount)
  const [joining, setJoining]         = useState(false)
  const [error, setError]             = useState<string | null>(null)

  useEffect(() => {
    if (!groupId || !userId) return
    isMember(groupId, userId).then(setJoined)
  }, [groupId, userId])

  useEffect(() => {
    if (!groupId) return
    const unsub = subscribeToMembers(groupId, (payload: any) => {
      if (payload.eventType === 'INSERT') setMemberCount(c => c + 1)
      if (payload.eventType === 'DELETE') setMemberCount(c => Math.max(0, c - 1))
    })
    return () => { unsub() }
  }, [groupId])

  const join = useCallback(async () => {
    setJoining(true)
    setError(null)
    try {
      await joinGroup(groupId)
      setJoined(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setJoining(false)
    }
  }, [groupId])

  const leave = useCallback(async () => {
    setJoining(true)
    setError(null)
    try {
      await leaveGroup(groupId)
      setJoined(false)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setJoining(false)
    }
  }, [groupId])

  return { joined, memberCount, joining, error, join, leave }
}

export function useGroupMembers(groupId: string) {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!groupId) return
    getGroupMembers(groupId).then(setMembers).finally(() => setLoading(false))
    const unsub = subscribeToMembers(groupId, () => {
      getGroupMembers(groupId).then(setMembers)
    })
    return () => { unsub() }
  }, [groupId])
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────────

export function useMessages(groupId: string) {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [sending, setSending]   = useState(false)

  useEffect(() => {
    if (!groupId) return
    setLoading(true)
    getMessages(groupId).then(setMessages).finally(() => setLoading(false))
    const unsub = subscribeToMessages(groupId, (msg: any) => {
      setMessages(prev => [...prev, msg])
    })
    return () => { unsub() }
  }, [groupId])

  const send = useCallback(async (content: string) => {
    if (!content.trim()) return
    setSending(true)
    try {
      await sendMessage(groupId, content)
    } finally {
      setSending(false)
    }
  }, [groupId])

  return { messages, loading, send, sending }
}

// ─── CREATE GROUP ─────────────────────────────────────────────────────────────

export function useCreateGroup(onSuccess?: (group: any) => void) {
  const [creating, setCreating] = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const create = useCallback(async (formData: any) => {
    setCreating(true)
    setError(null)
    try {
      const group = await createGroup(formData)
      onSuccess?.(group)
      return group
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setCreating(false)
    }
  }, [onSuccess])

  return { create, creating, error }
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

export function useProfile(userId: string) {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getProfile(userId).then(setProfile).finally(() => setLoading(false))
  }, [userId])

  const update = useCallback(async (updates: Record<string, any>) => {
    const updated = await updateProfile(userId, updates)
    setProfile(updated)
    return updated
  }, [userId])

  return { profile, loading, update }
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export function useAllSkills(category: string | null = null) {
  const [skills, setSkills]   = useState<any[]>([])
  const [grouped, setGrouped] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllSkills(category), getSkillsByCategory()])
      .then(([flat, byCategory]) => {
        setSkills(flat)
        setGrouped(byCategory)
      })
      .finally(() => setLoading(false))
  }, [category])

  return { skills, grouped, loading }
}

export function useUserSkills(userId: string) {
  const [learn, setLearn]     = useState<any[]>([])
  const [teach, setTeach]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    try {
      const data = await getUserSkills(userId)
      setLearn(data.learn)
      setTeach(data.teach)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => { fetch() }, [fetch])

  const addLearn = useCallback(async (skillId: string) => {
    setError(null)
    try {
      const row = await addUserSkill(skillId, 'learn')
      setLearn(prev => [...prev, row])
      return row
    } catch (e: any) { setError(e.message) }
  }, [])

  const addTeach = useCallback(async (skillId: string, level = 'intermediate') => {
    setError(null)
    try {
      const row = await addUserSkill(skillId, 'teach', level)
      setTeach(prev => [...prev, row])
      return row
    } catch (e: any) { setError(e.message) }
  }, [])

  const remove = useCallback(async (userSkillId: string, type: string) => {
    setError(null)
    try {
      await removeUserSkill(userSkillId)
      if (type === 'learn') setLearn(prev => prev.filter(s => s.id !== userSkillId))
      else                  setTeach(prev => prev.filter(s => s.id !== userSkillId))
    } catch (e: any) { setError(e.message) }
  }, [])

  const updateLevel = useCallback(async (userSkillId: string, level: string) => {
    setError(null)
    try {
      const updated = await updateSkillLevel(userSkillId, level)
      setTeach(prev => prev.map(s => s.id === userSkillId ? updated : s))
    } catch (e: any) { setError(e.message) }
  }, [])

  return { learn, teach, loading, error, addLearn, addTeach, remove, updateLevel, refetch: fetch }
}

export function usePeerMatches(userId: string) {
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getMyMatches(userId).then(setMatches).finally(() => setLoading(false))
  }, [userId])

  const bySkill = matches.reduce((acc: Record<string, any[]>, m: any) => {
    if (!acc[m.skill_name]) acc[m.skill_name] = []
    acc[m.skill_name].push(m)
    return acc
  }, {})

  return { matches, bySkill, loading }
}

export function useTeachersForSkill(skillId: string) {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!skillId) return
    findTeachersForSkill(skillId).then(setTeachers).finally(() => setLoading(false))
  }, [skillId])

  return { teachers, loading }
}

export function useGroupSkills(groupId: string) {
  const [skills, setSkills]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!groupId) return
    getGroupSkills(groupId).then(setSkills).finally(() => setLoading(false))
  }, [groupId])

  const add = useCallback(async (skillId: string) => {
    try {
      const row = await addGroupSkill(groupId, skillId)
      setSkills(prev => [...prev, row])
    } catch (e: any) { setError(e.message) }
  }, [groupId])

  const remove = useCallback(async (groupSkillId: string) => {
    try {
      await removeGroupSkill(groupSkillId)
      setSkills(prev => prev.filter(s => s.id !== groupSkillId))
    } catch (e: any) { setError(e.message) }
  }, [])

  return { skills, loading, error, add, remove }
}

export function useRecommendedGroups(userId: string) {
  const [groups, setGroups]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getRecommendedGroups(userId).then(setGroups).finally(() => setLoading(false))
  }, [userId])

  return { groups, loading }
}
