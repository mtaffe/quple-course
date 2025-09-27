import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function calculateLevel(xp: number): { level: number; xpForNext: number; xpInLevel: number } {
  // Sistema de níveis: 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500...
  const levels = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500]

  let level = 1
  let xpInLevel = xp

  for (let i = 1; i < levels.length; i++) {
    if (xp >= levels[i]) {
      level = i + 1
      xpInLevel = xp - levels[i]
    } else {
      break
    }
  }

  // Calcular XP necessário para o próximo nível
  let xpForNext = 100 // padrão para níveis altos
  if (level < levels.length) {
    xpForNext = levels[level] - xp
  } else {
    // Para níveis muito altos, usar progressão aritmética
    const baseNext = levels[levels.length - 1] + (level - levels.length + 1) * 1000
    xpForNext = baseNext - xp
  }

  return { level, xpForNext, xpInLevel }
}