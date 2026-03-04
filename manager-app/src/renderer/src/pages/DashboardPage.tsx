import { type JSX, useState } from 'react'
import { ClientsList } from '@renderer/components/ClientsList'
import { ClientForm } from '@renderer/components/ClientForm'
import { Modal } from '@renderer/components/Modal'
import { Button } from '@renderer/components/Button'
import { UserPlus, LayoutGrid } from 'lucide-react'
import { type Client } from '@/repositories/clients.repository'

export function DashboardPage(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | undefined>(undefined)

  const handleOpenCreate = () => {
    setEditingClient(undefined)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingClient(undefined)
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Panel de Control</h1>
            <p className="text-sm text-slate-500">Gestiona tus clientes y sus métricas corporales</p>
          </div>
        </div>
        
        <Button onClick={handleOpenCreate} className="gap-2">
          <UserPlus size={18} />
          Nuevo Cliente
        </Button>
      </header>

      <main className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <ClientsList onEdit={handleOpenEdit} />
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleClose} 
        title={editingClient ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
        size="lg"
      >
        <ClientForm 
          key={editingClient?.id || 'new'}
          initialData={editingClient} 
          onSuccess={handleClose} 
          onCancel={() => {
            if (confirm('¿Cerrar el formulario? Se perderán los datos no guardados.')) handleClose()
          }} 
        />
      </Modal>
    </div>
  )
}
