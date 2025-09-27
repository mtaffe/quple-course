'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Target, CheckCircle, Clock, Plus, Edit2, Trash2, Calendar, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'

interface DailyGoal {
  id: string
  title: string
  description: string
  type: 'time' | 'challenge' | 'concept' | 'custom'
  target_value: number
  current_value: number
  unit: string
  completed: boolean
  created_at: string
  due_date: string
}

interface DailyGoalsProps {
  studentId: string
  onGoalComplete?: (goal: DailyGoal) => void
}

// Templates de metas pré-definidas
const goalTemplates = [
  {
    title: 'Tempo de Estudo',
    description: 'Dedicar tempo aos estudos hoje',
    type: 'time' as const,
    target_value: 30,
    unit: 'min',
    icon: <Clock className="h-4 w-4" />
  },
  {
    title: 'Concluir Desafio',
    description: 'Finalizar pelo menos um desafio',
    type: 'challenge' as const,
    target_value: 1,
    unit: 'desafio',
    icon: <Target className="h-4 w-4" />
  },
  {
    title: 'Aprender Conceito',
    description: 'Estudar um novo conceito',
    type: 'concept' as const,
    target_value: 1,
    unit: 'conceito',
    icon: <Star className="h-4 w-4" />
  }
]

export function DailyGoals({ studentId, onGoalComplete }: DailyGoalsProps) {
  const [goals, setGoals] = useState<DailyGoal[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'time' as const,
    target_value: 30,
    unit: 'min'
  })

  // Carregar metas do Supabase
  useEffect(() => {
    loadGoals()
  }, [studentId])

  const loadGoals = async () => {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    const { data, error } = await supabase
      .from('daily_goals')
      .select('*')
      .eq('student_id', studentId)
      .eq('due_date', today)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao carregar metas:', error)
      return
    }

    setGoals(data || [])
  }

  // Salvar metas no Supabase
  const saveGoal = async (goal: Partial<DailyGoal>) => {
    if (goal.id) {
      // Atualizar meta existente
      const { error } = await supabase
        .from('daily_goals')
        .update(goal)
        .eq('id', goal.id)

      if (error) {
        console.error('Erro ao atualizar meta:', error)
        return false
      }
    } else {
      // Criar nova meta
      const { error } = await supabase
        .from('daily_goals')
        .insert([goal])

      if (error) {
        console.error('Erro ao criar meta:', error)
        return false
      }
    }

    // Recarregar metas
    await loadGoals()
    return true
  }

  // Criar uma nova meta
  const createGoal = async (template?: typeof goalTemplates[0]) => {
    const goalData = template || newGoal
    const goal = {
      student_id: studentId,
      title: goalData.title,
      description: goalData.description,
      type: goalData.type,
      target_value: goalData.target_value,
      current_value: 0,
      unit: goalData.unit,
      completed: false,
      due_date: new Date().toISOString().split('T')[0]
    }

    const success = await saveGoal(goal)
    if (success) {
      setIsCreating(false)
      setNewGoal({ title: '', description: '', type: 'time', target_value: 30, unit: 'min' })
    }
  }

  // Atualizar progresso de uma meta
  const updateGoalProgress = async (goalId: string, increment: number = 1) => {
    const goal = goals.find(g => g.id === goalId)
    if (!goal) return

    const newValue = Math.min(goal.current_value + increment, goal.target_value)
    const isCompleted = newValue >= goal.target_value

    const success = await saveGoal({
      id: goalId,
      current_value: newValue,
      completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null
    })

    if (success && isCompleted && !goal.completed && onGoalComplete) {
      onGoalComplete({ ...goal, current_value: newValue, completed: isCompleted })
    }
  }

  // Marcar meta como concluída
  const completeGoal = async (goalId: string) => {
    const goal = goals.find(g => g.id === goalId)
    if (!goal) return

    const success = await saveGoal({
      id: goalId,
      current_value: goal.target_value,
      completed: true,
      completed_at: new Date().toISOString()
    })

    if (success && onGoalComplete) {
      onGoalComplete({ ...goal, current_value: goal.target_value, completed: true })
    }
  }

  // Remover meta
  const deleteGoal = async (goalId: string) => {
    const { error } = await supabase
      .from('daily_goals')
      .delete()
      .eq('id', goalId)

    if (error) {
      console.error('Erro ao deletar meta:', error)
      return
    }

    await loadGoals()
  }

  const completedGoals = goals.filter(goal => goal.completed).length
  const totalGoals = goals.length
  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'time': return <Clock className="h-4 w-4" />
      case 'challenge': return <Target className="h-4 w-4" />
      case 'concept': return <Star className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getGoalColor = (type: string) => {
    switch (type) {
      case 'time': return 'text-blue-500 bg-blue-500/20'
      case 'challenge': return 'text-green-500 bg-green-500/20'
      case 'concept': return 'text-purple-500 bg-purple-500/20'
      default: return 'text-gray-500 bg-gray-500/20'
    }
  }

  return (
    <div className="glass-card rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Metas de Hoje</h3>
            <p className="text-xs text-muted-foreground">
              {completedGoals} de {totalGoals} concluídas ({progressPercentage}%)
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsCreating(true)}
          size="sm"
          variant="outline"
          className="glass-card premium-hover"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      {totalGoals > 0 && (
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-3">
        {goals.length === 0 && !isCreating && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎯</div>
            <p className="text-muted-foreground mb-4">
              Defina suas metas para hoje e mantenha-se focado!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {goalTemplates.map((template, index) => (
                <Button
                  key={index}
                  onClick={() => createGoal(template)}
                  variant="outline"
                  className="glass-card text-left p-3 h-auto flex-col items-start premium-hover"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {template.icon}
                    <span className="text-sm font-medium">{template.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {template.target_value} {template.unit}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {goals.map((goal) => (
          <div
            key={goal.id}
            className={cn(
              "p-4 rounded-lg border transition-all",
              goal.completed
                ? "bg-green-500/10 border-green-500/30"
                : "bg-card border-border hover:border-border/70"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className={cn("p-2 rounded-lg", getGoalColor(goal.type))}>
                  {getGoalIcon(goal.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className={cn(
                      "font-medium truncate",
                      goal.completed ? "text-green-400" : "text-foreground"
                    )}>
                      {goal.title}
                    </h4>
                    {goal.completed && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {goal.description}
                    </p>
                    <span className="text-xs font-medium text-foreground">
                      {goal.current_value}/{goal.target_value} {goal.unit}
                    </span>
                  </div>

                  {/* Progress bar for individual goal */}
                  <div className="w-full bg-muted rounded-full h-1 mt-2">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        goal.completed
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-blue-500 to-purple-500"
                      )}
                      style={{ width: `${Math.min((goal.current_value / goal.target_value) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                {!goal.completed && (
                  <>
                    <Button
                      onClick={() => updateGoalProgress(goal.id)}
                      size="sm"
                      variant="outline"
                      className="glass-card premium-hover"
                      title="Incrementar progresso"
                    >
                      +1
                    </Button>
                    <Button
                      onClick={() => completeGoal(goal.id)}
                      size="sm"
                      className="btn-primary-gradient premium-hover"
                      title="Marcar como concluída"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}

                <Button
                  onClick={() => deleteGoal(goal.id)}
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  title="Remover meta"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Goal Form */}
      {isCreating && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-3">Nova Meta</h4>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Título da meta"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full p-2 bg-background border border-border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="Descrição"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full p-2 bg-background border border-border rounded-lg text-sm"
            />

            <div className="flex space-x-3">
              <select
                value={newGoal.type}
                onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as any })}
                className="flex-1 p-2 bg-background border border-border rounded-lg text-sm"
              >
                <option value="time">Tempo</option>
                <option value="challenge">Desafio</option>
                <option value="concept">Conceito</option>
                <option value="custom">Personalizada</option>
              </select>

              <input
                type="number"
                value={newGoal.target_value}
                onChange={(e) => setNewGoal({ ...newGoal, target_value: parseInt(e.target.value) || 0 })}
                className="w-20 p-2 bg-background border border-border rounded-lg text-sm"
                min="1"
              />

              <input
                type="text"
                placeholder="unidade"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="w-20 p-2 bg-background border border-border rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <Button
              onClick={() => createGoal()}
              disabled={!newGoal.title.trim()}
              size="sm"
              className="btn-primary-gradient premium-hover"
            >
              Criar Meta
            </Button>
            <Button
              onClick={() => setIsCreating(false)}
              size="sm"
              variant="outline"
              className="glass-card premium-hover"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}