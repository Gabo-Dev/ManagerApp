import { type JSX } from 'react'
import { type Revision } from '@/repositories/revisions.repository'
import { type RevisionFormData } from '@shared/schemas/revision.schema'
import { Button } from '../Button'
import { AlertTriangle, Save } from 'lucide-react'
import { REVISION_SECTIONS } from './fields.config'
import { FormField } from './FormField'
import { FormSection } from './FormSection'
import { useRevisionForm } from './useRevisionForm'

export function RevisionForm({
  clientId,
  clientEmail,
  initialData,
  previousRevision,
  onSuccess,
  onCancel
}: RevisionFormProps): JSX.Element {
  const { formData, calculatedResults, missingFields, isFormComplete, updateField, handleSubmit } =
    useRevisionForm({ clientId, clientEmail, initialData, previousRevision, onSuccess })

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      {REVISION_SECTIONS.map((section, idx) => (
        <FormSection key={idx} title={section.title} icon={section.icon}>
          {section.fields.map((field) => {
            if (field.type === 'select') {
              return (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    {field.label}
                  </label>
                  <select
                    className="w-full px-3 py-2.5 bg-amber-50/40 border border-amber-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 text-sm font-semibold text-slate-700"
                    value={formData[field.name]}
                    onChange={(e) => updateField(field.name, e.target.value)}
                  >
                    {field.name === 'sexo' ? (
                      <>
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                      </>
                    ) : (
                      <>
                        <option value="suave">Suave</option>
                        <option value="alto">Alto</option>
                      </>
                    )}
                  </select>
                </div>
              )
            }

            const displayValue = field.isCalculated
              ? (calculatedResults[field.name as keyof typeof calculatedResults] || '').toString()
              : formData[field.name]

            return (
              <FormField
                key={field.name}
                label={field.label}
                type={field.type}
                step={field.step}
                value={displayValue}
                onChange={(val) => updateField(field.name, val)}
                prevValue={previousRevision?.[field.name as keyof Revision] as string | number}
                isPrimary={field.isPrimary}
                isCalculated={field.isCalculated}
                required={field.required}
              />
            )
          })}
        </FormSection>
      ))}

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-slate-400" /> Observaciones
        </label>
        <textarea
          className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none text-slate-700 font-medium"
          rows={3}
          value={formData.observaciones}
          onChange={(e) => updateField('observaciones', e.target.value)}
        />
      </div>

      <div className="flex gap-3 fixed bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl z-50 max-w-2xl mx-auto items-center">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          Cancelar
        </Button>
        <div className="flex-1 relative group">
          <Button
            type="submit"
            className="w-full shadow-lg shadow-blue-200 disabled:opacity-30 disabled:grayscale transition-all font-bold"
            disabled={!isFormComplete}
          >
            <Save size={18} className="mr-2" /> Guardar Registro
          </Button>
          {!isFormComplete && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-3 bg-slate-900 text-white text-[10px] rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none w-64 leading-relaxed">
              <p className="font-black text-amber-400 mb-1 uppercase tracking-widest text-center">
                Faltan {missingFields.length} campos
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

interface RevisionFormProps {
  clientId: string
  clientEmail: string
  initialData?: Revision
  previousRevision?: Revision
  onSuccess: (data: RevisionFormData) => void
  onCancel: () => void
}
