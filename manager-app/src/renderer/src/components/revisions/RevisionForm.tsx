import { useState, type JSX, type FormEvent, useEffect } from 'react'
import { type NewRevision, type Revision } from '@/repositories/revisions.repository'
import { BodyMetricsService } from '@renderer/core/services/bodyMetrics.service'
import { Button } from '../Button'
import { 
  Calendar, Activity, Ruler, Layers, AlertTriangle, Save, X,
  ChevronUp, ChevronDown, History, Target, TrendingUp, User
} from 'lucide-react'

// --- COMPONENTES AUXILIARES ---

const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
    <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 border-b border-slate-50 pb-3">
      <Icon size={14} className="text-blue-500" />
      {title}
    </h5>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5">
      {children}
    </div>
  </div>
)

const CustomInput = ({ 
  label, value, onChange, prevValue, isPrimary, required, type = 'number', step = 0.1, readOnly = false 
}: { 
  label: string, value: string, onChange: (val: string) => void, prevValue?: string | number,
  isPrimary?: boolean, required?: boolean, type?: string, step?: number, readOnly?: boolean
}) => {
  const handleIncrement = () => {
    if (readOnly) return
    const current = parseFloat(value) || 0
    onChange((current + step).toFixed(type === 'number' && step < 1 ? 1 : 0))
  }

  const handleDecrement = () => {
    if (readOnly) return
    const current = parseFloat(value) || 0
    const next = current - step
    onChange(Math.max(0, next).toFixed(type === 'number' && step < 1 ? 1 : 0))
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 truncate">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          readOnly={readOnly}
          className={`w-full pl-3 pr-10 py-2.5 border transition-all text-sm font-semibold rounded-xl focus:outline-none
            ${readOnly ? 'bg-blue-50/50 border-blue-100 text-blue-700 select-none' : 
              isPrimary ? 'bg-amber-50/40 border-amber-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 text-slate-700' :
              'bg-slate-50 border-slate-100 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 text-slate-700'} 
          `}
          value={value}
          onChange={e => {
            const val = e.target.value
            if (type === 'number') {
              if (val === '') { onChange(''); return; }
              if (parseFloat(val) < 0) return
              onChange(val)
            } else { onChange(val) }
          }}
        />
        {type === 'number' && !readOnly && (
          <div className="absolute right-1 top-1 bottom-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={handleIncrement} className="flex-1 px-1.5 hover:bg-white rounded hover:text-blue-600 transition-colors"><ChevronUp size={12}/></button>
            <button type="button" onClick={handleDecrement} className="flex-1 px-1.5 hover:bg-white rounded hover:text-blue-600 transition-colors"><ChevronDown size={12}/></button>
          </div>
        )}
      </div>
      {prevValue !== undefined && (
        <div className="flex items-center gap-1 mt-0.5 ml-1 text-[9px] font-medium text-slate-400 italic">
          <History size={10} className="text-slate-300" />
          <span>Previo: <span className={isPrimary ? "text-amber-600 font-bold" : "text-slate-500 font-bold"}>{prevValue || '-'}</span></span>
        </div>
      )}
    </div>
  )
}

interface RevisionFormProps {
  clientId: string
  initialData?: Revision
  previousRevision?: Revision
  onSuccess: (data: any) => void
  onCancel: () => void
}

export function RevisionForm({ clientId, initialData, previousRevision, onSuccess, onCancel }: RevisionFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    clienteId: clientId,
    fecha: initialData?.fecha || new Date().toISOString().split('T')[0],
    semanaRevision: initialData?.semanaRevision?.toString() || '',
    sexo: initialData?.sexo || previousRevision?.sexo || 'H',
    edad: initialData?.edad?.toString() || previousRevision?.edad?.toString() || '',
    estaturaM: initialData?.estaturaM?.toString() || previousRevision?.estaturaM?.toString() || '',
    etapaActual: initialData?.etapaActual || previousRevision?.etapaActual || 'Definición',
    tipoActividad: 'suave',
    
    pesoAyunasKg: initialData?.pesoAyunasKg?.toString() || '',
    pesoObjetivoKg: initialData?.pesoObjetivoKg?.toString() || previousRevision?.pesoObjetivoKg?.toString() || '',
    
    cuelloCm: initialData?.cuelloCm?.toString() || '',
    cinturaCm: initialData?.cinturaCm?.toString() || '',
    caderaCm: initialData?.caderaCm?.toString() || '',
    pechoCm: initialData?.pechoCm?.toString() || '',
    espaldaCm: initialData?.espaldaCm?.toString() || '',
    
    bicepsIzqCm: initialData?.bicepsIzqCm?.toString() || '',
    bicepsDerCm: initialData?.bicepsDerCm?.toString() || '',
    cuadricepsIzqCm: initialData?.cuadricepsIzqCm?.toString() || '',
    cuadricepsDerCm: initialData?.cuadricepsDerCm?.toString() || '',
    gemeloIzqCm: initialData?.gemeloIzqCm?.toString() || '',
    gemeloDerCm: initialData?.gemeloDerCm?.toString() || '',
    
    tricipitalMm: initialData?.tricipitalMm?.toString() || '',
    escapularMm: initialData?.escapularMm?.toString() || '',
    abdominalMm: initialData?.abdominalMm?.toString() || '',
    cIliacaMm: initialData?.cIliacaMm?.toString() || '',
    
    imc: initialData?.imc?.toString() || '',
    porcentajeGrasa: initialData?.porcentajeGrasa?.toString() || '',
    porcentajeGrasaObjetivo: initialData?.porcentajeGrasaObjetivo?.toString() || previousRevision?.porcentajeGrasaObjetivo?.toString() || '',
    pesoGrasoKg: initialData?.pesoGrasoKg?.toString() || '',
    mlgKg: initialData?.mlgKg?.toString() || '',
    porcentajeMme: initialData?.porcentajeMme?.toString() || '',
    porcentajeOtros: initialData?.porcentajeOtros?.toString() || '',
    
    circunferenciaBrazoCm: initialData?.circunferenciaBrazoCm?.toString() || '',
    circunferenciaMusloCm: initialData?.circunferenciaMusloCm?.toString() || '',
    circunferenciaPantorrillaCm: initialData?.circunferenciaPantorrillaCm?.toString() || '',
    
    cicloFemenino: initialData?.cicloFemenino || '',
    observaciones: initialData?.observaciones || ''
  })

  useEffect(() => {
    const results = BodyMetricsService.calculate({
      pesoAyunasKg: parseFloat(formData.pesoAyunasKg) || 0,
      estaturaM: parseFloat(formData.estaturaM) || 0,
      edad: parseInt(formData.edad) || 0,
      sexo: formData.sexo as 'H' | 'M',
      tipoActividad: formData.tipoActividad as 'suave' | 'alto',
      tricipitalMm: parseFloat(formData.tricipitalMm) || 0,
      escapularMm: parseFloat(formData.escapularMm) || 0,
      abdominalMm: parseFloat(formData.abdominalMm) || 0,
      cIliacaMm: parseFloat(formData.cIliacaMm) || 0,
      circunferenciaBrazoCm: parseFloat(formData.circunferenciaBrazoCm) || 0,
      circunferenciaMusloCm: parseFloat(formData.circunferenciaMusloCm) || 0,
      circunferenciaPantorrillaCm: parseFloat(formData.circunferenciaPantorrillaCm) || 0,
    })

    setFormData(prev => ({
      ...prev,
      imc: results.imc.toString(),
      porcentajeGrasa: results.porcentajeGrasa.toString(),
      pesoGrasoKg: results.pesoGrasoKg.toString(),
      mlgKg: results.mlgKg.toString(),
      porcentajeMme: results.porcentajeMme.toString(),
      porcentajeOtros: results.porcentajeOtros.toString()
    }))
  }, [
    formData.pesoAyunasKg, formData.estaturaM, formData.edad, formData.sexo, formData.tipoActividad,
    formData.tricipitalMm, formData.escapularMm, formData.abdominalMm, formData.cIliacaMm,
    formData.circunferenciaBrazoCm, formData.circunferenciaMusloCm, formData.circunferenciaPantorrillaCm
  ])

  const requiredFields = [
    'semanaRevision', 'edad', 'estaturaM', 'etapaActual', 'pesoAyunasKg', 'pesoObjetivoKg',
    'cuelloCm', 'cinturaCm', 'caderaCm', 'pechoCm', 'espaldaCm',
    'bicepsIzqCm', 'bicepsDerCm', 'cuadricepsIzqCm', 'cuadricepsDerCm', 'gemeloIzqCm', 'gemeloDerCm',
    'tricipitalMm', 'escapularMm', 'abdominalMm', 'cIliacaMm',
    'porcentajeGrasaObjetivo', 'circunferenciaBrazoCm', 'circunferenciaMusloCm', 'circunferenciaPantorrillaCm'
  ]

  const missingFields = requiredFields.filter(f => formData[f] === '')
  const isFormComplete = formData.fecha && missingFields.length === 0

  const updateField = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (!isFormComplete) return
    
    const { tipoActividad, ...cleanedData } = formData
    const dataToSave = Object.fromEntries(
      Object.entries(cleanedData).map(([key, value]) => [
        key, 
        (typeof value === 'string' && !isNaN(parseFloat(value)) && key !== 'fecha' && key !== 'sexo' && key !== 'etapaActual' && key !== 'cicloFemenino' && key !== 'observaciones') 
          ? parseFloat(value) 
          : value
      ])
    )
    onSuccess(dataToSave)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <Section title="Sesión" icon={Calendar}>
        <CustomInput label="Fecha" type="date" value={formData.fecha} onChange={v => updateField('fecha', v)} required />
        <CustomInput label="Semana" step={1} value={formData.semanaRevision} onChange={v => updateField('semanaRevision', v)} required prevValue={previousRevision?.semanaRevision} />
        <CustomInput label="Edad" step={1} value={formData.edad} onChange={v => updateField('edad', v)} required prevValue={previousRevision?.edad} isPrimary />
        <CustomInput label="Estatura (m)" step={0.01} value={formData.estaturaM} onChange={v => updateField('estaturaM', v)} required prevValue={previousRevision?.estaturaM} isPrimary />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Sexo</label>
          <select className="w-full px-3 py-2.5 bg-amber-50/40 border border-amber-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-sm font-semibold text-slate-700" value={formData.sexo} onChange={e => updateField('sexo', e.target.value)}>
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Actividad</label>
          <select className="w-full px-3 py-2.5 bg-amber-50/40 border border-amber-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-sm font-semibold text-slate-700" value={formData.tipoActividad} onChange={e => updateField('tipoActividad', e.target.value)}>
            <option value="suave">Suave</option>
            <option value="alto">Alto</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Etapa Actual</label>
          <input className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-sm font-semibold text-slate-700" value={formData.etapaActual} onChange={e => updateField('etapaActual', e.target.value)} />
        </div>
      </Section>

      <Section title="Objetivos" icon={Target}>
        <CustomInput label="Peso Ayunas (kg)" value={formData.pesoAyunasKg} onChange={v => updateField('pesoAyunasKg', v)} required prevValue={previousRevision?.pesoAyunasKg} isPrimary />
        <CustomInput label="Peso Objetivo (kg)" value={formData.pesoObjetivoKg} onChange={v => updateField('pesoObjetivoKg', v)} required prevValue={previousRevision?.pesoObjetivoKg} />
        <CustomInput label="% Grasa Objetivo" value={formData.porcentajeGrasaObjetivo} onChange={v => updateField('porcentajeGrasaObjetivo', v)} required prevValue={previousRevision?.porcentajeGrasaObjetivo} />
      </Section>

      <Section title="Tronco" icon={Ruler}>
        <CustomInput label="Cuello (cm)" value={formData.cuelloCm} onChange={v => updateField('cuelloCm', v)} required prevValue={previousRevision?.cuelloCm} />
        <CustomInput label="Cintura (cm)" value={formData.cinturaCm} onChange={v => updateField('cinturaCm', v)} required prevValue={previousRevision?.cinturaCm} />
        <CustomInput label="Cadera (cm)" value={formData.caderaCm} onChange={v => updateField('caderaCm', v)} required prevValue={previousRevision?.caderaCm} />
        <CustomInput label="Pecho (cm)" value={formData.pechoCm} onChange={v => updateField('pechoCm', v)} required prevValue={previousRevision?.pechoCm} />
        <CustomInput label="Espalda (cm)" value={formData.espaldaCm} onChange={v => updateField('espaldaCm', v)} required prevValue={previousRevision?.espaldaCm} />
      </Section>

      <Section title="Extremidades" icon={User}>
        <CustomInput label="Bíceps Izq" value={formData.bicepsIzqCm} onChange={v => updateField('bicepsIzqCm', v)} required prevValue={previousRevision?.bicepsIzqCm} />
        <CustomInput label="Bíceps Der" value={formData.bicepsDerCm} onChange={v => updateField('bicepsDerCm', v)} required prevValue={previousRevision?.bicepsDerCm} />
        <CustomInput label="Cuádriceps Izq" value={formData.cuadricepsIzqCm} onChange={v => updateField('cuadricepsIzqCm', v)} required prevValue={previousRevision?.cuadricepsIzqCm} />
        <CustomInput label="Cuádriceps Der" value={formData.cuadricepsDerCm} onChange={v => updateField('cuadricepsDerCm', v)} required prevValue={previousRevision?.cuadricepsDerCm} />
        <CustomInput label="Gemelo Izq" value={formData.gemeloIzqCm} onChange={v => updateField('gemeloIzqCm', v)} required prevValue={previousRevision?.gemeloIzqCm} />
        <CustomInput label="Gemelo Der" value={formData.gemeloDerCm} onChange={v => updateField('gemeloDerCm', v)} required prevValue={previousRevision?.gemeloDerCm} />
      </Section>

      <Section title="Motor Antropométrico" icon={Layers}>
        <CustomInput label="Tricipital (mm)" value={formData.tricipitalMm} onChange={v => updateField('tricipitalMm', v)} required prevValue={previousRevision?.tricipitalMm} isPrimary />
        <CustomInput label="Escapular (mm)" value={formData.escapularMm} onChange={v => updateField('escapularMm', v)} required prevValue={previousRevision?.escapularMm} isPrimary />
        <CustomInput label="Abdominal (mm)" value={formData.abdominalMm} onChange={v => updateField('abdominalMm', v)} required prevValue={previousRevision?.abdominalMm} isPrimary />
        <CustomInput label="Iliaco (mm)" value={formData.cIliacaMm} onChange={v => updateField('cIliacaMm', v)} required prevValue={previousRevision?.cIliacaMm} isPrimary />
        <CustomInput label="Brazo (cm)" value={formData.circunferenciaBrazoCm} onChange={v => updateField('circunferenciaBrazoCm', v)} required prevValue={previousRevision?.circunferenciaBrazoCm} isPrimary />
        <CustomInput label="Muslo (cm)" value={formData.circunferenciaMusloCm} onChange={v => updateField('circunferenciaMusloCm', v)} required prevValue={previousRevision?.circunferenciaMusloCm} isPrimary />
        <CustomInput label="Pantorrilla (cm)" value={formData.circunferenciaPantorrillaCm} onChange={v => updateField('circunferenciaPantorrillaCm', v)} required prevValue={previousRevision?.circunferenciaPantorrillaCm} isPrimary />
      </Section>

      <Section title="Resultados Automáticos" icon={TrendingUp}>
        <CustomInput label="IMC" value={formData.imc} onChange={() => {}} readOnly prevValue={previousRevision?.imc} />
        <CustomInput label="% Grasa" value={formData.porcentajeGrasa} onChange={() => {}} readOnly prevValue={previousRevision?.porcentajeGrasa} />
        <CustomInput label="Peso Graso" value={formData.pesoGrasoKg} onChange={() => {}} readOnly prevValue={previousRevision?.pesoGrasoKg} />
        <CustomInput label="MLG" value={formData.mlgKg} onChange={() => {}} readOnly prevValue={previousRevision?.mlgKg} />
        <CustomInput label="% Masa Muscular" value={formData.porcentajeMme} onChange={() => {}} readOnly prevValue={previousRevision?.porcentajeMme} />
        <CustomInput label="% Otros" value={formData.porcentajeOtros} onChange={() => {}} readOnly prevValue={previousRevision?.porcentajeOtros} />
      </Section>

      {formData.sexo === 'M' && (
        <div className="bg-pink-50/30 p-5 rounded-2xl border border-pink-100/50 space-y-2">
          <label className="text-[10px] font-bold text-pink-600 uppercase tracking-widest ml-1">Ciclo Femenino</label>
          <input className="w-full px-4 py-2.5 bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all text-sm font-semibold text-slate-700" placeholder="Fase del ciclo..." value={formData.cicloFemenino} onChange={e => updateField('cicloFemenino', e.target.value)} />
        </div>
      )}

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-slate-400" /> Observaciones
        </label>
        <textarea className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none text-slate-700 font-medium" rows={3} value={formData.observaciones} onChange={e => updateField('observaciones', e.target.value)} />
      </div>

      <div className="flex gap-3 fixed bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl z-50 max-w-2xl mx-auto items-center">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>Cancelar</Button>
        <div className="flex-1 relative group">
          <Button type="submit" className="w-full shadow-lg shadow-blue-200 disabled:opacity-30 disabled:grayscale transition-all font-bold" disabled={!isFormComplete}>
            <Save size={18} className="mr-2" /> Guardar Registro
          </Button>
          {!isFormComplete && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-3 bg-slate-900 text-white text-[10px] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-64 leading-relaxed">
              <p className="font-black text-amber-400 mb-1 uppercase tracking-widest">Campos pendientes:</p>
              <div className="flex flex-wrap gap-1">
                {missingFields.map(f => (
                  <span key={f} className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
