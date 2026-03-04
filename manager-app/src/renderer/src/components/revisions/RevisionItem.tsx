import { useState, type JSX } from 'react'
import { type Revision } from '@/repositories/revisions.repository'
import { Button } from '../Button'
import { 
  ChevronDown, ChevronUp, Calendar, Activity, Trash2, Edit2, Info,
  Scale, Ruler, Layers, User, Target, TrendingUp, Heart
} from 'lucide-react'

interface RevisionItemProps {
  revision: Revision
  isLatest?: boolean
  onEdit: (revision: Revision) => void
  onDelete: (id: string) => void
}

export function RevisionItem({ revision, isLatest, onEdit, onDelete }: RevisionItemProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)

  const Metric = ({ label, value, unit, color = 'blue' }: { label: string, value: number | string, unit: string, color?: string }) => (
    <div className="space-y-0.5">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
      <p className={`text-sm font-bold text-${color}-600`}>{value || '-'} <span className="text-[10px] font-medium text-slate-400 uppercase">{unit}</span></p>
    </div>
  )

  const DetailField = ({ label, value, unit, isHighlight = false }: { label: string, value: any, unit?: string, isHighlight?: boolean }) => (
    <div className={`p-2 rounded-lg border ${isHighlight ? 'bg-blue-50 border-blue-100' : 'bg-slate-50/50 border-slate-50'}`}>
      <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">{label}</p>
      <p className={`text-xs font-bold ${isHighlight ? 'text-blue-700' : 'text-slate-700'}`}>{value ?? '-'} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p>
    </div>
  )

  return (
    <div className={`group bg-white border ${isLatest ? 'border-blue-200 ring-4 ring-blue-50' : 'border-slate-100'} rounded-2xl transition-all duration-300 hover:shadow-md overflow-hidden`}>
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-4">
          <div className={`p-2.5 ${isLatest ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'} rounded-xl transition-colors`}>
            <Calendar size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-slate-800">{new Date(revision.fecha).toLocaleDateString()}</p>
              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">Semana {revision.semanaRevision}</span>
              {isLatest && <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-widest">Última</span>}
            </div>
            <p className="text-xs text-slate-400 font-medium">{revision.etapaActual}</p>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-8 px-8 border-x border-slate-50">
          <Metric label="Peso" value={revision.pesoAyunasKg} unit="kg" />
          <Metric label="IMC" value={revision.imc} unit="" color="indigo" />
          <Metric label="% Grasa" value={revision.porcentajeGrasa} unit="%" color="emerald" />
          <Metric label="MME" value={revision.porcentajeMme} unit="%" color="blue" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(revision); }}><Edit2 size={16} className="text-slate-400" /></Button>
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(revision.id); }}><Trash2 size={16} className="text-red-400" /></Button>
          </div>
          <div className={`p-1.5 rounded-full ${isExpanded ? 'bg-blue-50 text-blue-600' : 'text-slate-300'}`}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-8 animate-in slide-in-from-top-2 duration-300 border-t border-slate-50 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-4">
              <h6 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><Target size={14} /> Control & Peso</h6>
              <div className="grid grid-cols-2 gap-2">
                <DetailField label="Peso Actual" value={revision.pesoAyunasKg} unit="kg" isHighlight />
                <DetailField label="Peso Obj." value={revision.pesoObjetivoKg} unit="kg" />
                <DetailField label="Estatura" value={revision.estaturaM} unit="m" />
                <DetailField label="Etapa" value={revision.etapaActual} />
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2"><Ruler size={14} /> Perímetros (cm)</h6>
              <div className="grid grid-cols-2 gap-2">
                <DetailField label="Cuello" value={revision.cuelloCm} />
                <DetailField label="Cintura" value={revision.cinturaCm} />
                <DetailField label="Cadera" value={revision.caderaCm} />
                <DetailField label="Pecho" value={revision.pechoCm} />
                <DetailField label="Espalda" value={revision.espaldaCm} />
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2"><User size={14} /> Extremidades (cm)</h6>
              <div className="grid grid-cols-2 gap-2">
                <DetailField label="Bíceps I/D" value={`${revision.bicepsIzqCm} / ${revision.bicepsDerCm}`} />
                <DetailField label="Cuádr. I/D" value={`${revision.cuadricepsIzqCm} / ${revision.cuadricepsDerCm}`} />
                <DetailField label="Gemelo I/D" value={`${revision.gemeloIzqCm} / ${revision.gemeloDerCm}`} />
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2"><Layers size={14} /> Pliegues (mm)</h6>
              <div className="grid grid-cols-2 gap-2">
                <DetailField label="Tricipital" value={revision.tricipitalMm} />
                <DetailField label="Escapular" value={revision.escapularMm} />
                <DetailField label="Abdominal" value={revision.abdominalMm} />
                <DetailField label="Iliaco" value={revision.cIliacaMm} />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 pt-8 border-t border-slate-50">
            <div className="lg:col-span-3 space-y-4">
              <h6 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><TrendingUp size={14} /> Composición Corporal</h6>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <DetailField label="IMC" value={revision.imc} isHighlight />
                <DetailField label="% Grasa" value={revision.porcentajeGrasa} unit="%" isHighlight />
                <DetailField label="P. Graso" value={revision.pesoGrasoKg} unit="kg" />
                <DetailField label="MLG" value={revision.mlgKg} unit="kg" />
                <DetailField label="% MME" value={revision.porcentajeMme} unit="%" />
                <DetailField label="% Otros" value={revision.porcentajeOtros} unit="%" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Info size={14} /> Observaciones</h6>
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50 min-h-[60px]">
                <p className="text-[11px] text-amber-900 leading-relaxed italic">{revision.observaciones || 'Sin notas.'}</p>
              </div>
              {revision.cicloFemenino && (
                <div className="flex items-center gap-2 text-pink-600 bg-pink-50 p-2 rounded-lg border border-pink-100">
                  <Heart size={12} />
                  <span className="text-[10px] font-bold uppercase">Ciclo: {revision.cicloFemenino}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
