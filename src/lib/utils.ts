import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatTime(time: string) {
  // "10:00:00" or "10:00" -> "10:00 AM"
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function generateWhatsAppLink(phone: string, message: string) {
  const cleaned = phone.replace(/\D/g, '')
  const fullPhone = cleaned.startsWith('91') ? cleaned : `91${cleaned}`
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`
}
