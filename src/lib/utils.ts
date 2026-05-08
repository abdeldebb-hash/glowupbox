import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function waUrl(message: string) {
  const num = process.env.NEXT_PUBLIC_WA_NUMBER ?? '212600000000'
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}
