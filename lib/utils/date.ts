import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'd MMMM yyyy', { locale: fr })
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), 'd MMM yyyy', { locale: fr })
}

export function formatRelativeDate(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })
}
