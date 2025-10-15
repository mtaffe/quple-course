/**
 * React Forms - Complete Topic
 *
 * React Forms: Controlled, Uncontrolled, Validation
 * Target audience: Students who completed React Hooks
 */

import { Topic } from '../../types'

export const reactForms: Topic = {
  id: 'react-forms',
  title: 'Formulários em React',
  description: 'Domine formulários controlled, uncontrolled e validação com React Hook Form',
  category: 'react',
  difficulty: 'intermediate',
  totalTime: 120, // 2 hours
  icon: '📝',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Controlled vs Uncontrolled Components',
      description: 'Entenda os dois padrões de formulários em React',
      estimatedTime: 60,
      sections: [
        {
          id: 'controlled-components',
          title: 'Controlled Components',
          type: 'theory' as const,
          content: 'Controlled components têm valor gerenciado por React state. Input value é sempre controlado por state, onChange atualiza state. Todo caractere digitado dispara re-render. É o padrão recomendado React. Use para: validação em tempo real, máscaras de input, formulários complexos. State é single source of truth.',
          codeExample: `import { useState } from 'react'

function GoalForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    isPublic: true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', formData)
    // Enviar para API
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título do objetivo"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
        />
        Público
      </label>

      <button type="submit">Criar Objetivo</button>
    </form>
  )
}`
        },
        {
          id: 'uncontrolled-components',
          title: 'Uncontrolled Components',
          type: 'example' as const,
          content: 'Uncontrolled components armazenam valor no DOM, não em state. Use useRef para acessar valor. Menos código, mas menos controle. Útil para: formulários simples, file inputs, integração com libs não-React. Não recomendado para formulários complexos ou validação em tempo real.',
          codeExample: `import { useRef } from 'react'

function GoalForm() {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const priorityRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      priority: priorityRef.current.value
    }

    console.log('Form data:', formData)

    // Limpar form
    titleRef.current.value = ''
    descriptionRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={titleRef}
        type="text"
        placeholder="Título"
        defaultValue=""
      />

      <textarea
        ref={descriptionRef}
        placeholder="Descrição"
        defaultValue=""
      />

      <select ref={priorityRef} defaultValue="medium">
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <button type="submit">Criar</button>
    </form>
  )
}

// File input (sempre uncontrolled)
function ImageUpload() {
  const fileRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = fileRef.current.files[0]
    console.log('File:', file)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} />
      <button type="submit">Upload</button>
    </form>
  )
}`
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Validação e React Hook Form',
      description: 'Valide formulários e use React Hook Form',
      estimatedTime: 60,
      sections: [
        {
          id: 'validation',
          title: 'Validação Manual',
          type: 'theory' as const,
          content: 'Validação pode ser: no submit (valida tudo de uma vez), onChange (em tempo real), onBlur (ao sair do campo). Armazene erros em state. Mostre mensagens de erro condicionalmente. Desabilite submit se houver erros. Use regex para validações complexas. Valide no frontend E backend (segurança).',
          codeExample: `import { useState } from 'react'

function GoalForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!formData.title) {
      newErrors.title = 'Título é obrigatório'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Título deve ter no mínimo 3 caracteres'
    }

    if (!formData.description) {
      newErrors.description = 'Descrição é obrigatória'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Descrição deve ter no mínimo 10 caracteres'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validação em tempo real (após primeiro toque)
    if (touched[name]) {
      const newErrors = validate()
      setErrors(newErrors)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    // Valida ao sair do campo
    const newErrors = validate()
    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Form válido:', formData)
      // Enviar para API
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && (
          <span className="error-message">{errors.title}</span>
        )}
      </div>

      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={Object.keys(errors).length > 0}
      >
        Criar Objetivo
      </button>
    </form>
  )
}`
        },
        {
          id: 'react-hook-form',
          title: 'React Hook Form',
          type: 'example' as const,
          content: 'React Hook Form é biblioteca popular para formulários. Performance excelente (menos re-renders). Validação built-in. Integração com Zod/Yup. API simples com hooks. useForm retorna register, handleSubmit, errors. register conecta inputs ao form. Muito menos código que validação manual.',
          codeExample: `// npm install react-hook-form
import { useForm } from 'react-hook-form'

function GoalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium'
    }
  })

  const onSubmit = async (data) => {
    try {
      console.log('Form data:', data)
      // await fetch('/api/goals', { method: 'POST', body: JSON.stringify(data) })
      reset() // Limpa form após sucesso
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('title', {
            required: 'Título é obrigatório',
            minLength: {
              value: 3,
              message: 'Mínimo 3 caracteres'
            }
          })}
          placeholder="Título"
        />
        {errors.title && (
          <span className="error">{errors.title.message}</span>
        )}
      </div>

      <div>
        <textarea
          {...register('description', {
            required: 'Descrição é obrigatória',
            minLength: {
              value: 10,
              message: 'Mínimo 10 caracteres'
            }
          })}
          placeholder="Descrição"
        />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}
      </div>

      <div>
        <select {...register('priority')}>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Criar Objetivo'}
      </button>
    </form>
  )
}

// Validação customizada
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email obrigatório',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Senha obrigatória',
          minLength: {
            value: 8,
            message: 'Mínimo 8 caracteres'
          }
        })}
        placeholder="Senha"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Entrar</button>
    </form>
  )
}`
        }
      ]
    }
  ]
}
