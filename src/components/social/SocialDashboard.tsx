'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { socialGameSystem, Friend, StudyGroup, SocialChallenge, SocialStats } from '@/lib/social/socialGameSystem'
import { Users, Trophy, UserPlus, Crown, Zap, Calendar, Target, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialDashboardProps {
  studentId: string
  className?: string
}

export function SocialDashboard({ studentId, className = '' }: SocialDashboardProps) {
  const [activeTab, setActiveTab] = useState<'friends' | 'groups' | 'challenges'>('friends')
  const [friends, setFriends] = useState<Friend[]>([])
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([])
  const [socialChallenges, setSocialChallenges] = useState<SocialChallenge[]>([])
  const [socialStats, setSocialStats] = useState<SocialStats | null>(null)
  const [friendCode, setFriendCode] = useState('')
  const [newFriendCode, setNewFriendCode] = useState('')
  const [isAddingFriend, setIsAddingFriend] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadSocialData()
  }, [studentId])

  const loadSocialData = async () => {
    try {
      const [friendsData, groupsData, challengesData, statsData, code] = await Promise.all([
        socialGameSystem.getFriends(studentId),
        socialGameSystem.getStudyGroups(),
        socialGameSystem.getSocialChallenges(),
        socialGameSystem.getSocialStats(studentId),
        socialGameSystem.getFriendCode(studentId)
      ])

      setFriends(friendsData)
      setStudyGroups(groupsData)
      setSocialChallenges(challengesData)
      setSocialStats(statsData)
      setFriendCode(code)
    } catch (error) {
      console.error('Erro ao carregar dados sociais:', error)
    }
  }

  const handleAddFriend = async () => {
    if (!newFriendCode.trim()) return

    setIsAddingFriend(true)
    try {
      const newFriend = await socialGameSystem.addFriend(studentId, newFriendCode)
      if (newFriend) {
        setFriends(prev => [...prev, newFriend])
        setNewFriendCode('')
        alert(`✅ ${newFriend.name} foi adicionado aos seus amigos!`)
      } else {
        alert('❌ Código de amigo não encontrado.')
      }
    } catch (error) {
      alert('❌ Erro ao adicionar amigo.')
    } finally {
      setIsAddingFriend(false)
    }
  }

  const copyFriendCode = () => {
    navigator.clipboard.writeText(friendCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const joinGroup = async (groupId: string) => {
    const success = await socialGameSystem.joinStudyGroup(studentId, groupId)
    if (success) {
      alert('✅ Você entrou no grupo de estudos!')
      loadSocialData()
    } else {
      alert('❌ Não foi possível entrar no grupo.')
    }
  }

  const joinChallenge = async (challengeId: string) => {
    const success = await socialGameSystem.joinSocialChallenge(studentId, challengeId)
    if (success) {
      alert('🎯 Você entrou no desafio!')
      loadSocialData()
    } else {
      alert('❌ Não foi possível entrar no desafio.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'coding': return 'bg-blue-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'coding': return 'Codificando'
      case 'offline': return 'Offline'
      default: return 'Offline'
    }
  }

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return 'Agora há pouco'
    if (diffHours < 24) return `${diffHours}h atrás`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d atrás`
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header com Stats */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Social</h3>
              <p className="text-xs text-muted-foreground">
                Conecte-se e aprenda junto
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Rank Global</p>
              <p className="font-bold text-foreground">#{socialStats?.rank}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{friends.length}</p>
            <p className="text-xs text-muted-foreground">Amigos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">{socialStats?.weeklyXP}</p>
            <p className="text-xs text-muted-foreground">XP Semanal</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-500">{studyGroups.length}</p>
            <p className="text-xs text-muted-foreground">Grupos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">{socialChallenges.length}</p>
            <p className="text-xs text-muted-foreground">Desafios</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'friends', label: 'Amigos', icon: <Users className="h-4 w-4" /> },
          { id: 'groups', label: 'Grupos', icon: <Crown className="h-4 w-4" /> },
          { id: 'challenges', label: 'Desafios', icon: <Trophy className="h-4 w-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-4">
          {/* Friend Code */}
          <div className="glass-card rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Seu Código de Amigo</h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-muted rounded-lg p-3 font-mono text-center text-lg font-bold tracking-wider">
                {friendCode}
              </div>
              <Button
                onClick={copyFriendCode}
                variant="outline"
                size="sm"
                className="glass-card premium-hover"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Compartilhe este código para que outros possam te adicionar
            </p>
          </div>

          {/* Add Friend */}
          <div className="glass-card rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Adicionar Amigo</h4>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Código do amigo (ex: ABC123)"
                value={newFriendCode}
                onChange={(e) => setNewFriendCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                maxLength={6}
              />
              <Button
                onClick={handleAddFriend}
                disabled={isAddingFriend || !newFriendCode.trim()}
                className="btn-primary-gradient premium-hover"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Friends List */}
          <div className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="glass-card rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {friend.name.charAt(0)}
                      </div>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                        getStatusColor(friend.status)
                      )} />
                    </div>

                    <div>
                      <p className="font-medium text-foreground">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getStatusLabel(friend.status)} • {formatLastSeen(friend.lastSeen)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      Nv.{friend.level} • {friend.total_xp} XP
                    </p>
                    <p className="text-xs text-muted-foreground">
                      🔥 {friend.streak_days} dias • Desafio {friend.current_challenge}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {friends.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">👥</div>
                <p className="text-muted-foreground">
                  Você ainda não tem amigos. Use o código acima para adicionar!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          {studyGroups.map((group) => (
            <div key={group.id} className="glass-card rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{group.name}</h4>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                {group.isPublic && (
                  <Button
                    onClick={() => joinGroup(group.id)}
                    size="sm"
                    className="btn-primary-gradient premium-hover"
                  >
                    Entrar
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">
                    👥 {group.member_count} membros
                  </span>
                  <span className="text-muted-foreground">
                    📊 Nível médio: {group.average_level}
                  </span>
                </div>

                <div className="text-foreground font-medium">
                  {group.total_xp} XP total
                </div>
              </div>

              {group.challenge && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-foreground">
                    🎯 Desafio Ativo: {group.challenge.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {group.challenge.participants} participantes • Prazo: {new Date(group.challenge.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {socialChallenges.map((challenge) => (
            <div key={challenge.id} className="glass-card rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{challenge.title}</h4>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      challenge.type === 'individual' ? "bg-blue-500/20 text-blue-500" :
                      challenge.type === 'group' ? "bg-green-500/20 text-green-500" :
                      "bg-purple-500/20 text-purple-500"
                    )}>
                      {challenge.type === 'individual' ? 'Individual' :
                       challenge.type === 'group' ? 'Grupo' : 'Global'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>

                <Button
                  onClick={() => joinChallenge(challenge.id)}
                  size="sm"
                  className="btn-primary-gradient premium-hover"
                >
                  Participar
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    📅 {new Date(challenge.start_date).toLocaleDateString()} - {new Date(challenge.end_date).toLocaleDateString()}
                  </span>
                  <span className="text-foreground font-medium">
                    {challenge.participants_count} participantes
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {challenge.prizes.map((prize, index) => (
                    <span key={index} className="bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full">
                      🏆 {prize}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}