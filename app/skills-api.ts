// app/skills-api.ts
// ─────────────────────────────────────────────────────────────────────────────
// SKILLEX — Skills API
// ─────────────────────────────────────────────────────────────────────────────
import { supabase } from './api'   // ← fixed: was './supabase'

// ─── SKILLS MASTER LIST ───────────────────────────────────────────────────────

export async function getAllSkills(category: string | null = null) {
  let query = supabase.from('skills').select('*').order('category').order('name')
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getSkillsByCategory() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category')
    .order('name')
  if (error) throw error

  return data.reduce((acc: Record<string, any[]>, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})
}

export async function createSkill(name: string, category: string) {
  const { data, error } = await supabase
    .from('skills')
    .insert({ name: name.trim(), category: category.toUpperCase() })
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── USER SKILLS ──────────────────────────────────────────────────────────────

export async function getUserSkills(userId: string) {
  const { data, error } = await supabase
    .from('user_skills')
    .select('*, skills(id, name, category)')
    .eq('user_id', userId)
    .order('created_at')
  if (error) throw error

  return {
    learn: data.filter((s: any) => s.type === 'learn'),
    teach: data.filter((s: any) => s.type === 'teach'),
  }
}

export async function addUserSkill(
  skillId: string,
  type: 'learn' | 'teach',
  level: string | null = null
) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in')

  const { data, error } = await supabase
    .from('user_skills')
    .insert({ user_id: user.id, skill_id: skillId, type, level })
    .select('*, skills(id, name, category)')
    .single()
  if (error) {
    if (error.code === '23505') throw new Error('You already have this skill added')
    throw error
  }
  return data
}

export async function removeUserSkill(userSkillId: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in')

  const { error } = await supabase
    .from('user_skills')
    .delete()
    .eq('id', userSkillId)
    .eq('user_id', user.id)
  if (error) throw error
}

export async function updateSkillLevel(userSkillId: string, level: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be logged in')

  const { data, error } = await supabase
    .from('user_skills')
    .update({ level })
    .eq('id', userSkillId)
    .eq('user_id', user.id)
    .select('*, skills(id, name, category)')
    .single()
  if (error) throw error
  return data
}

// ─── PEER MATCHING ────────────────────────────────────────────────────────────

export async function getMyMatches(userId: string) {
  const { data, error } = await supabase
    .from('user_skill_matches')
    .select('*')
    .eq('learner_id', userId)
  if (error) throw error
  return data
}

export async function getWhoICanTeach(userId: string) {
  const { data, error } = await supabase
    .from('user_skill_matches')
    .select('*')
    .eq('teacher_id', userId)
  if (error) throw error
  return data
}

export async function findTeachersForSkill(skillId: string) {
  const { data, error } = await supabase
    .from('user_skills')
    .select('*, profiles(id, full_name, avatar_url, username)')
    .eq('skill_id', skillId)
    .eq('type', 'teach')
    .order('level')
  if (error) throw error
  return data
}

// ─── GROUP SKILLS ─────────────────────────────────────────────────────────────

export async function getGroupSkills(groupId: string) {
  const { data, error } = await supabase
    .from('group_skills')
    .select('*, skills(id, name, category)')
    .eq('group_id', groupId)
  if (error) throw error
  return data
}

export async function addGroupSkill(groupId: string, skillId: string) {
  const { data, error } = await supabase
    .from('group_skills')
    .insert({ group_id: groupId, skill_id: skillId })
    .select('*, skills(id, name, category)')
    .single()
  if (error) throw error
  return data
}

export async function removeGroupSkill(groupSkillId: string) {
  const { error } = await supabase
    .from('group_skills')
    .delete()
    .eq('id', groupSkillId)
  if (error) throw error
}

export async function getRecommendedGroups(userId: string) {
  const { data: learnSkills, error: e1 } = await supabase
    .from('user_skills')
    .select('skill_id')
    .eq('user_id', userId)
    .eq('type', 'learn')
  if (e1) throw e1
  if (!learnSkills.length) return []

  const skillIds = learnSkills.map((s: any) => s.skill_id)

  const { data, error: e2 } = await supabase
    .from('group_skills')
    .select('group_id, skills(name), study_groups(id, code, tag, title, description, status, capacity)')
    .in('skill_id', skillIds)
  if (e2) throw e2

  const grouped = data.reduce((acc: Record<string, any>, row: any) => {
    const gid = row.group_id
    if (!acc[gid]) {
      acc[gid] = { ...row.study_groups, matched_skills: [], match_count: 0 }
    }
    acc[gid].matched_skills.push(row.skills.name)
    acc[gid].match_count++
    return acc
  }, {})

  return Object.values(grouped).sort((a: any, b: any) => b.match_count - a.match_count)
}
