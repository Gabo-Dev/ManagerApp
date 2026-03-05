import { useState, type JSX, type FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient, updateClient } from '@renderer/data/client.data'
import { type Client, type NewClient } from '@/repositories/clients.repository'
import { Button } from '@renderer/components/Button'

interface ClientFormProps {
  initialData?: Client
  onSuccess?: () => void
  onCancel?: () => void
}

export function ClientForm({ initialData, onSuccess, onCancel }: ClientFormProps): JSX.Element {
  const [formData, setFormData] = useState<Omit<NewClient, 'id' | 'createdAt' | 'updatedAt'>>({
    nombre: initialData?.nombre || '',
    email: initialData?.email || '',
    notas: initialData?.notas || ''
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (initialData) {
        return updateClient(initialData.id, data)
      }
      return createClient(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      onSuccess?.()
    }
  })

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
          Nombre Completo
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          value={formData.nombre}
          onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email</label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
          Notas (Opcional)
        </label>
        <textarea
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
          rows={3}
          value={formData.notas || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, notas: e.target.value }))}
        />
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={mutation.isPending}>
          {mutation.isPending ? 'Guardando...' : initialData ? 'Guardar Cambios' : 'Crear Cliente'}
        </Button>
      </div>
    </form>
  )
}
