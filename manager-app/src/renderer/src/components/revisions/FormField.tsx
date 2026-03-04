import { type JSX } from 'react'
import { ChevronUp, ChevronDown, History } from 'lucide-react'

interface FormFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  prevValue?: string | number
  isPrimary?: boolean
  isCalculated?: boolean
  required?: boolean
  type?: string
  step?: number
}

export function FormField({
  label,
  value,
  onChange,
  prevValue,
  isPrimary,
  isCalculated,
  required,
  type = 'number',
  step = 0.1
}: FormFieldProps): JSX.Element {
  const handleIncrement = (): void => {
    if (isCalculated) return
    const current = parseFloat(value) || 0
    onChange((current + (step || 0.1)).toFixed(type === 'number' && (step || 0.1) < 1 ? 1 : 0))
  }

  const handleDecrement = (): void => {
    if (isCalculated) return
    const current = parseFloat(value) || 0
    onChange(
      Math.max(0, current - (step || 0.1)).toFixed(type === 'number' && (step || 0.1) < 1 ? 1 : 0)
    )
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 truncate">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative group">
        <input
          type={type}
          readOnly={isCalculated}
          className={`w-full pl-3 pr-10 py-2.5 border transition-all text-sm font-semibold rounded-xl focus:outline-none
            ${
              isCalculated
                ? 'bg-blue-50/50 border-blue-100 text-blue-700 select-none'
                : isPrimary
                  ? 'bg-amber-50/40 border-amber-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 text-slate-700'
                  : 'bg-slate-50 border-slate-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 text-slate-700'
            }
          `}
          value={value}
          onChange={(e) => {
            if (isCalculated) return
            const val = e.target.value
            if (type === 'number' && val !== '' && parseFloat(val) < 0) return
            onChange(val)
          }}
        />
        {type === 'number' && !isCalculated && (
          <div className="absolute right-1 top-1 bottom-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleIncrement}
              className="flex-1 px-1.5 hover:bg-white rounded hover:text-blue-600 transition-colors"
            >
              <ChevronUp size={12} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="flex-1 px-1.5 hover:bg-white rounded hover:text-blue-600 transition-colors"
            >
              <ChevronDown size={12} />
            </button>
          </div>
        )}
      </div>

      {prevValue !== undefined && (
        <div className="flex items-center gap-1 mt-0.5 ml-1 text-[9px] font-medium text-slate-400 italic">
          <History size={10} className="text-slate-300" />
          <span>
            Previo:{' '}
            <span className={isPrimary ? 'text-amber-600 font-bold' : 'text-slate-500 font-bold'}>
              {prevValue || '-'}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
