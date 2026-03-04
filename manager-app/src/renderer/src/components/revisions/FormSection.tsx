import { type JSX, type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'

interface FormSectionProps {
  title: string
  icon: LucideIcon
  children: ReactNode
  className?: string
}

export function FormSection({ title, icon: Icon, children, className = "" }: FormSectionProps): JSX.Element {
  return (
    <div className={`bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 ${className}`}>
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-5">
        <div className="p-2 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
          <Icon size={18} />
        </div>
        <h5 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          {title}
        </h5>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {children}
      </div>
    </div>
  )
}
