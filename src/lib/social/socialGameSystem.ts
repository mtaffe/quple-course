import { supabase } from '@/lib/supabase/client'

interface Friend {
  id: string
  name: string
  avatar?: string
  level: number
  total_xp: number
  streak_days: number
  last_seen: string
  status: 'online' | 'offline' | 'coding'
  current_challenge?: number
  badges: string[]
}

interface StudyGroup {
  id: string
  name: string
  description: string
  owner_id: string
  is_public: boolean
  member_count: number
  max_members: number
  average_level: number
  total_xp: number
  current_challenge?: {
    id: number
    name: string
    deadline: string
    participants: number
  }
  created_at: string
  updated_at: string
  members?: Friend[]
}

interface SocialChallenge {
  id: string
  title: string
  description: string
  type: 'individual' | 'group' | 'global'
  start_date: string
  end_date: string
  participants_count: number
  prizes: string[]
  current_leader_id?: string
  requirements: {
    challengesCompleted?: number
    xpGained?: number
    streakDays?: number
    timeSpent?: number
  }
  is_active: boolean
}

interface SocialStats {
  rank: number
  totalUsers: number
  friendsAhead: number
  friendsBehind: number
  weeklyXP: number
  weeklyRank: number
  achievements: {
    name: string
    unlockedAt: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
  }[]
}

class SocialGameSystem {
  // Sistema de Amigos
  async getFriends(userId: string): Promise<Friend[]> {
    try {
      // Buscar amizades onde o usuário é requester ou addressee
      const { data: friendships, error } = await supabase
        .from('friendships')
        .select(`
          requester_id,
          addressee_id,
          status,
          requester:students!requester_id(id, name, total_xp, streak_days, current_challenge, badges, created_at),
          addressee:students!addressee_id(id, name, total_xp, streak_days, current_challenge, badges, created_at)
        `)
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq('status', 'accepted')

      if (error) {
        console.error('Erro ao buscar amigos:', error)
        return []
      }

      // Processar amigos
      const friends: Friend[] = []
      friendships?.forEach((rawFriendship: unknown) => {
        const friendship = rawFriendship as { requester_id: string; addressee: { id: string; name: string; total_xp: number; streak_days: number; created_at: string; current_challenge: number; badges: string[] }; requester: { id: string; name: string; total_xp: number; streak_days: number; created_at: string; current_challenge: number; badges: string[] } }
        const friend = friendship.requester_id === userId
          ? friendship.addressee
          : friendship.requester

        if (friend) {
          friends.push({
            id: friend.id,
            name: friend.name,
            level: this.calculateLevel(friend.total_xp),
            total_xp: friend.total_xp,
            streak_days: friend.streak_days,
            last_seen: friend.created_at,
            status: this.getOnlineStatus(friend.created_at),
            current_challenge: friend.current_challenge,
            badges: friend.badges || []
          })
        }
      })

      return friends
    } catch (error) {
      console.error('Erro ao carregar amigos:', error)
      return []
    }
  }

  async addFriend(userId: string, friendCode: string): Promise<Friend | null> {
    try {
      // Buscar usuário pelo código de amigo
      const { data: friendCodeData, error: codeError } = await supabase
        .from('friend_codes')
        .select('student_id, students(id, name, total_xp, streak_days, current_challenge, badges, updated_at)')
        .eq('code', friendCode.toUpperCase())
        .single()

      if (codeError || !friendCodeData) {
        console.error('Código de amigo não encontrado:', codeError)
        return null
      }

      const friendData = (friendCodeData.students as unknown as { id: string; name: string; total_xp: number; streak_days: number; updated_at: string; current_challenge: number; badges: string[] })
      const friendId = friendCodeData.student_id

      // Verificar se já são amigos
      const { data: existingFriendship } = await supabase
        .from('friendships')
        .select('id')
        .or(`and(requester_id.eq.${userId},addressee_id.eq.${friendId}),and(requester_id.eq.${friendId},addressee_id.eq.${userId})`)
        .single()

      if (existingFriendship) {
        throw new Error('Vocês já são amigos!')
      }

      // Criar amizade
      const { error: friendshipError } = await supabase
        .from('friendships')
        .insert([{
          requester_id: userId,
          addressee_id: friendId,
          status: 'accepted' // Por simplicidade, aceitar automaticamente
        }])

      if (friendshipError) {
        console.error('Erro ao criar amizade:', friendshipError)
        return null
      }

      return {
        id: friendData.id,
        name: friendData.name,
        level: this.calculateLevel(friendData.total_xp),
        total_xp: friendData.total_xp,
        streak_days: friendData.streak_days,
        last_seen: friendData.updated_at,
        status: this.getOnlineStatus(friendData.updated_at),
        current_challenge: friendData.current_challenge,
        badges: friendData.badges || []
      }
    } catch (error) {
      console.error('Erro ao adicionar amigo:', error)
      return null
    }
  }

  async getFriendComparison(userId: string, friendId: string) {
    try {
      // Buscar dados do usuário
      const { data: userData, error: userError } = await supabase
        .from('students')
        .select('total_xp, streak_days, current_challenge')
        .eq('id', userId)
        .single()

      // Buscar dados do amigo
      const { data: friendData, error: friendError } = await supabase
        .from('students')
        .select('total_xp, streak_days, current_challenge')
        .eq('id', friendId)
        .single()

      if (userError || friendError || !userData || !friendData) {
        console.error('Erro ao buscar dados para comparação:', userError, friendError)
        return null
      }

      const userLevel = this.calculateLevel(userData.total_xp)
      const friendLevel = this.calculateLevel(friendData.total_xp)

      return {
        user: {
          level: userLevel,
          totalXP: userData.total_xp,
          streakDays: userData.streak_days,
          challengesCompleted: userData.current_challenge - 1
        },
        friend: {
          level: friendLevel,
          totalXP: friendData.total_xp,
          streakDays: friendData.streak_days,
          challengesCompleted: friendData.current_challenge - 1
        },
        comparison: {
          levelDiff: userLevel - friendLevel,
          xpDiff: userData.total_xp - friendData.total_xp,
          streakDiff: userData.streak_days - friendData.streak_days,
          challengesDiff: (userData.current_challenge - 1) - (friendData.current_challenge - 1)
        }
      }
    } catch (error) {
      console.error('Erro na comparação:', error)
      return null
    }
  }

  // Sistema de Grupos de Estudo
  async getStudyGroups(): Promise<StudyGroup[]> {
    try {
      const { data: groups, error } = await supabase
        .from('study_groups')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar grupos:', error)
        return []
      }

      return groups || []
    } catch (error) {
      console.error('Erro ao carregar grupos:', error)
      return []
    }
  }

  async joinStudyGroup(userId: string, groupId: string): Promise<boolean> {
    try {
      // Verificar se já é membro
      const { data: existingMember } = await supabase
        .from('study_group_members')
        .select('id')
        .eq('group_id', groupId)
        .eq('student_id', userId)
        .single()

      if (existingMember) {
        throw new Error('Você já é membro deste grupo!')
      }

      // Verificar se o grupo tem vagas
      const { data: group } = await supabase
        .from('study_groups')
        .select('member_count, max_members')
        .eq('id', groupId)
        .single()

      if (group && group.member_count >= group.max_members) {
        throw new Error('Grupo lotado!')
      }

      // Adicionar membro
      const { error } = await supabase
        .from('study_group_members')
        .insert([{
          group_id: groupId,
          student_id: userId,
          role: 'member'
        }])

      if (error) {
        console.error('Erro ao entrar no grupo:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Erro ao entrar no grupo:', error)
      return false
    }
  }

  async createStudyGroup(
    userId: string,
    name: string,
    description: string,
    isPublic: boolean
  ): Promise<StudyGroup | null> {
    try {
      // Criar grupo
      const { data: group, error: groupError } = await supabase
        .from('study_groups')
        .insert([{
          name,
          description,
          owner_id: userId,
          is_public: isPublic,
          member_count: 1,
          max_members: 20,
          average_level: 1,
          total_xp: 0
        }])
        .select()
        .single()

      if (groupError || !group) {
        console.error('Erro ao criar grupo:', groupError)
        return null
      }

      // Adicionar criador como membro
      const { error: memberError } = await supabase
        .from('study_group_members')
        .insert([{
          group_id: group.id,
          student_id: userId,
          role: 'owner'
        }])

      if (memberError) {
        console.error('Erro ao adicionar criador ao grupo:', memberError)
        return null
      }

      return group
    } catch (error) {
      console.error('Erro ao criar grupo:', error)
      return null
    }
  }

  async getGroupLeaderboard(groupId: string) {
    try {
      const { data: members, error } = await supabase
        .from('study_group_members')
        .select(`
          student_id,
          role,
          joined_at,
          students(id, name, total_xp, current_challenge, streak_days)
        `)
        .eq('group_id', groupId)

      if (error) {
        console.error('Erro ao buscar leaderboard do grupo:', error)
        return []
      }

      // Processar e ordenar por XP
      return members
        ?.map((rawMember: unknown) => {
          const member = rawMember as {
            student_id: string;
            role: string;
            joined_at: string;
            students: {
              id: string;
              name: string;
              total_xp: number;
              current_challenge: number;
              streak_days: number
            }
          }
          return {
            id: member.students.id,
            name: member.students.name,
            totalXP: member.students.total_xp,
            level: this.calculateLevel(member.students.total_xp),
            currentChallenge: member.students.current_challenge,
            streakDays: member.students.streak_days,
            role: member.role,
            joinedAt: member.joined_at,
            rank: 0, // Será calculado após ordenação
            weeklyXP: Math.floor(member.students.total_xp * 0.2), // Simular XP semanal
            progress: member.students.current_challenge - 1
          }
        })
        ?.sort((a, b) => b.totalXP - a.totalXP)
        ?.map((member, index) => ({ ...member, rank: index + 1 })) || []
    } catch (error) {
      console.error('Erro ao carregar leaderboard:', error)
      return []
    }
  }

  // Desafios Sociais
  async getSocialChallenges(): Promise<SocialChallenge[]> {
    try {
      const { data: challenges, error } = await supabase
        .from('social_challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar desafios sociais:', error)
        return []
      }

      return challenges || []
    } catch (error) {
      console.error('Erro ao carregar desafios sociais:', error)
      return []
    }
  }

  async joinSocialChallenge(userId: string, challengeId: string): Promise<boolean> {
    try {
      // Verificar se já participa
      const { data: existing } = await supabase
        .from('social_challenge_participants')
        .select('id')
        .eq('challenge_id', challengeId)
        .eq('student_id', userId)
        .single()

      if (existing) {
        throw new Error('Você já participa deste desafio!')
      }

      // Adicionar participante
      const { error } = await supabase
        .from('social_challenge_participants')
        .insert([{
          challenge_id: challengeId,
          student_id: userId,
          progress: {},
          completed: false
        }])

      if (error) {
        console.error('Erro ao entrar no desafio:', error)
        return false
      }

      // Incrementar contador de participantes - Note: this should be handled by database triggers in production
      const { data: currentChallenge } = await supabase
        .from('social_challenges')
        .select('participants_count')
        .eq('id', challengeId)
        .single()

      if (currentChallenge) {
        const { error: updateError } = await supabase
          .from('social_challenges')
          .update({
            participants_count: (currentChallenge.participants_count || 0) + 1
          })
          .eq('id', challengeId)

        if (updateError) {
          console.error('Erro ao atualizar contador:', updateError)
        }
      }

      return true
    } catch (error) {
      console.error('Erro ao participar do desafio:', error)
      return false
    }
  }

  // Estatísticas Sociais
  async getSocialStats(userId: string): Promise<SocialStats> {
    try {
      // Buscar posição no ranking global
      const { data: userData } = await supabase
        .from('students')
        .select('total_xp')
        .eq('id', userId)
        .single()

      if (!userData) {
        return this.getDefaultSocialStats()
      }

      // Contar usuários com XP maior (para determinar ranking)
      const { count: usersAhead } = await supabase
        .from('students')
        .select('id', { count: 'exact' })
        .gt('total_xp', userData.total_xp)

      // Contar total de usuários
      const { count: totalUsers } = await supabase
        .from('students')
        .select('id', { count: 'exact' })

      // Contar amigos
      const { count: friendsCount } = await supabase
        .from('friendships')
        .select('id', { count: 'exact' })
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq('status', 'accepted')

      const rank = (usersAhead || 0) + 1
      const friendsAhead = Math.floor((friendsCount || 0) * 0.3)
      const friendsBehind = (friendsCount || 0) - friendsAhead

      return {
        rank,
        totalUsers: totalUsers || 1,
        friendsAhead,
        friendsBehind,
        weeklyXP: Math.floor(userData.total_xp * 0.2), // Simular XP semanal
        weeklyRank: Math.max(1, rank - Math.floor(Math.random() * 10)),
        achievements: [
          {
            name: 'Primeira Vitória',
            unlockedAt: new Date().toISOString(),
            rarity: 'common'
          }
        ]
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas sociais:', error)
      return this.getDefaultSocialStats()
    }
  }

  // Sistema de Códigos de Amigo
  async generateFriendCode(userId: string): Promise<string> {
    try {
      // Verificar se já tem código
      const { data: existing } = await supabase
        .from('friend_codes')
        .select('code')
        .eq('student_id', userId)
        .single()

      if (existing) {
        return existing.code
      }

      // Gerar novo código usando a função do banco
      const { data: newCode, error } = await supabase
        .rpc('generate_friend_code')

      if (error || !newCode) {
        console.error('Erro ao gerar código:', error)
        return 'ERROR1'
      }

      // Salvar código
      const { error: insertError } = await supabase
        .from('friend_codes')
        .insert([{
          student_id: userId,
          code: newCode
        }])

      if (insertError) {
        console.error('Erro ao salvar código:', insertError)
        return 'ERROR2'
      }

      return newCode
    } catch (error) {
      console.error('Erro ao gerar código de amigo:', error)
      return 'ERROR3'
    }
  }

  async getFriendCode(userId: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('friend_codes')
        .select('code')
        .eq('student_id', userId)
        .single()

      if (error || !data) {
        return await this.generateFriendCode(userId)
      }

      return data.code
    } catch (error) {
      console.error('Erro ao buscar código de amigo:', error)
      return await this.generateFriendCode(userId)
    }
  }

  // Funções auxiliares
  private calculateLevel(totalXP: number): number {
    if (totalXP < 100) return 1
    if (totalXP < 300) return 2
    if (totalXP < 600) return 3
    if (totalXP < 1000) return 4
    if (totalXP < 1500) return 5
    return Math.min(10, Math.floor(totalXP / 300) + 1)
  }

  private getOnlineStatus(lastSeen: string): 'online' | 'offline' | 'coding' {
    const lastSeenDate = new Date(lastSeen)
    const now = new Date()
    const diffMinutes = (now.getTime() - lastSeenDate.getTime()) / (1000 * 60)

    if (diffMinutes < 5) return 'online'
    if (diffMinutes < 30) return 'coding'
    return 'offline'
  }

  private getDefaultSocialStats(): SocialStats {
    return {
      rank: 1,
      totalUsers: 1,
      friendsAhead: 0,
      friendsBehind: 0,
      weeklyXP: 0,
      weeklyRank: 1,
      achievements: []
    }
  }
}

export const socialGameSystem = new SocialGameSystem()
export type { Friend, StudyGroup, SocialChallenge, SocialStats }