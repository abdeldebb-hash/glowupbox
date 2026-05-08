import { cn } from '@/lib/utils'

export function SectionBadge({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.15em] uppercase mb-3.5',
      light ? 'text-[#FF6B9D]' : 'text-[#E91E8C]',
      className
    )}>
      <span className={cn('w-5 h-[1.5px] block flex-shrink-0', light ? 'bg-[#FF6B9D]' : 'bg-gradient-to-r from-[#E91E8C] to-[#FFB347]')} />
      {children}
    </div>
  )
}
