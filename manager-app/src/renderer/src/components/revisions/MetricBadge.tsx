import { type JSX } from 'react'

interface MetricBadgeProps {
  label: string
  value: number | string
  unit?: string
  color?: 'blue' | 'indigo' | 'emerald' | 'rose'
}

export function MetricBadge({ label, value, unit = '', color = 'blue' }: MetricBadgeProps): JSX.Element {
  const themes = {
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    rose: 'text-rose-600'
  }

  return (
    <div className="flex flex-col items-center gap-0.5 px-4">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className={`text-base font-black ${themes[color]} tabular-nums`}>
        {value || '-'} <span className="text-[10px] font-medium text-slate-400 uppercase">{unit}</span>
      </p>
    </div>
  )
}
