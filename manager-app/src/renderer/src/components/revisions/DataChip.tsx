import { type JSX, type ReactNode } from 'react'

interface DataChipProps {
  label: string
  value: number | string
  unit?: string
  icon?: ReactNode
  variant?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'slate' | 'rose'
}

export function DataChip({
  label,
  value,
  unit = '',
  icon,
  variant = 'slate'
}: DataChipProps): JSX.Element {
  const themes = {
    blue: 'border-blue-100 bg-blue-50/50 text-blue-700 shadow-blue-100/50',
    emerald: 'border-emerald-100 bg-emerald-50/50 text-emerald-700 shadow-emerald-100/50',
    amber: 'border-amber-100 bg-amber-50/50 text-amber-700 shadow-amber-100/50',
    indigo: 'border-indigo-100 bg-indigo-50/50 text-indigo-700 shadow-indigo-100/50',
    slate: 'border-slate-100 bg-slate-50/50 text-slate-700 shadow-slate-100/50',
    rose: 'border-rose-100 bg-rose-50/50 text-rose-700 shadow-rose-100/50'
  }

  return (
    <div
      className={`
      flex items-center gap-3 px-4 py-2.5
      border rounded-2xl shadow-sm
      transition-all duration-300 hover:shadow-md hover:scale-[1.02]
      w-fit min-w-[120px]
      ${themes[variant]}
    `}
    >
      {icon && <div className="opacity-80">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">
          {label}
        </span>
        <span className="text-sm font-black tracking-tight tabular-nums">
          {value || '-'} <span className="text-[10px] font-medium opacity-70">{unit}</span>
        </span>
      </div>
    </div>
  )
}
