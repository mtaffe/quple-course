import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }
  return `${secs}s`
}

export function calculateLevel(xp: number): { level: number; xpToNext: number } {
  const xpPerLevel = 1000
  const level = Math.floor(xp / xpPerLevel) + 1
  const xpToNext = xpPerLevel - (xp % xpPerLevel)
  return { level, xpToNext }
}

export function getXpForLevel(level: number): number {
  return (level - 1) * 1000
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}