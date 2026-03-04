import { type JSX } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { AlertCircle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning'
}

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, variant = 'warning' }: ConfirmDialogProps): JSX.Element | null {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="md">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className={`p-2 rounded-lg ${variant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
            <AlertCircle size={24} />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onCancel}>Cancelar</Button>
          <Button variant={variant === 'danger' ? 'danger' : 'primary'} className="flex-1" onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </Modal>
  )
}
