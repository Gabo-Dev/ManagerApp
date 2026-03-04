import { useState, type JSX } from 'react'
import { type Revision } from '@/repositories/revisions.repository'
import { Button } from '../Button'
import { 
  ChevronDown, Calendar, Trash2, Edit2, Info,
  Heart
} from 'lucide-react'
import { REVISION_SECTIONS } from './fields.config'
import { MetricBadge } from './MetricBadge'
import { DataChip } from './DataChip'

interface RevisionItemProps {
  revision: Revision
  isLatest?: boolean
  onEdit: (revision: Revision) => void
  onDelete: (id: string) => void
}

export function RevisionItem({ revision, isLatest, onEdit, onDelete }: RevisionItemProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`
      group bg-white border transition-all duration-500 rounded-[2.5rem]
      ${isLatest ? 'border-blue-200 ring-8 ring-blue-50/50 shadow-2xl shadow-blue-200/20' : 'border-slate-100 shadow-xl shadow-slate-200/30'}
      hover:shadow-2xl hover:border-blue-100
    `}>
      <div 
        className="p-6 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-6">
          <div className={`p-4 ${isLatest ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-slate-50 text-slate-400'} rounded-3xl transition-all duration-500 group-hover:rotate-3`}>
            <Calendar size={24} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="text-xl font-black text-slate-800 tracking-tighter">{new Date(revision.fecha).toLocaleDateString()}</p>
              {isLatest && <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-200">Última</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">Semana {revision.semanaRevision}</span>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{revision.etapaActual}</span>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex items-center px-10 border-x border-slate-100 divide-x divide-slate-100">
          <MetricBadge label="Peso" value={revision.pesoAyunasKg} unit="kg" />
          <MetricBadge label="IMC" value={revision.imc} color="indigo" />
          <MetricBadge label="% Grasa" value={revision.porcentajeGrasa} unit="%" color="emerald" />
          <MetricBadge label="Masa Muscular" value={revision.porcentajeMme} unit="%" color="rose" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 gap-2">
            <Button variant="ghost" className="w-11 h-11 rounded-2xl hover:bg-blue-50 text-slate-400 hover:text-blue-600" onClick={(e) => { e.stopPropagation(); onEdit(revision); }}>
              <Edit2 size={20} />
            </Button>
            <Button variant="ghost" className="w-11 h-11 rounded-2xl hover:bg-red-50 text-slate-400 hover:text-red-600" onClick={(e) => { e.stopPropagation(); onDelete(revision.id); }}>
              <Trash2 size={20} />
            </Button>
          </div>
          <div className={`p-3 rounded-2xl transition-all duration-500 ${isExpanded ? 'bg-slate-900 text-white rotate-180 shadow-xl' : 'bg-slate-50 text-slate-300'}`}>
            <ChevronDown size={24} strokeWidth={3} />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-8 pb-12 animate-in slide-in-from-top-8 fade-in duration-700 border-t border-slate-50 pt-10 bg-slate-50/20">
          <div className="space-y-12">
            {REVISION_SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                  <section.icon size={14} strokeWidth={3} /> {section.title}
                </h6>
                <div className="flex flex-wrap gap-4">
                  {section.fields.map(field => (
                    <DataChip
                      key={field.name}
                      label={field.label}
                      value={revision[field.name as keyof Revision] as string | number}
                      unit={
                        field.name.includes('Kg') ? 'kg' : 
                        field.name.includes('Cm') ? 'cm' : 
                        field.name.includes('Mm') ? 'mm' : 
                        field.name.includes('porcentaje') ? '%' : ''
                      }
                      variant="slate"
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="space-y-4">
              <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                <Info size={14} strokeWidth={3} /> Adicional
              </h6>
              <div className="flex flex-wrap gap-4">
                {revision.observaciones && <DataChip label="Observaciones" value={revision.observaciones} variant="amber" />}
                {revision.cicloFemenino && <DataChip label="Ciclo Femenino" value={revision.cicloFemenino} variant="rose" icon={<Heart size={14} />} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
