import { type JSX, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchClientRevisions, deleteRevision, createRevision, updateRevision } from '../data/revision.data'
import { fetchAllClients } from '../data/client.data'
import { type Revision } from '@/repositories/revisions.repository'
import { type Client } from '@/repositories/clients.repository'
import { 
  ClipboardList, 
  Activity, 
  ArrowLeft, 
  ChevronRight, 
  Search,
  Plus
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/Button'
import { Table } from '@renderer/components/Table'
import { RevisionItem } from '@renderer/components/revisions/RevisionItem'
import { Modal } from '@renderer/components/Modal'
import { RevisionForm } from '@renderer/components/revisions/RevisionForm'
import { ConfirmDialog } from '@renderer/components/ConfirmDialog'

export function RevisionsPage(): JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const location = useLocation()
  
  const state = location.state as { clientId?: string } | null
  const [selectedClientId, setSelectedClientId] = useState<string | null>(state?.clientId || null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRevision, setEditingRevision] = useState<Revision | undefined>(undefined)
  
  // Estado para diálogos de confirmación
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: 'danger' | 'warning';
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} })

  const { data: clients = [], isLoading: loadingClients } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: fetchAllClients
  })

  const { data: revisions = [], isLoading: loadingRevisions } = useQuery<Revision[]>({
    queryKey: ['revisions', selectedClientId],
    queryFn: () => fetchClientRevisions(selectedClientId!),
    enabled: !!selectedClientId
  })

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingRevision) return updateRevision(editingRevision.id, data)
      return createRevision(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revisions', selectedClientId] })
      setIsModalOpen(false)
      setEditingRevision(undefined)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRevision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revisions', selectedClientId] })
    }
  })

  const selectedClient = clients.find(c => c.id === selectedClientId)
  const previousRevision = revisions[0] // La más reciente para comparar

  const filteredClients = clients.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openConfirm = (title: string, message: string, onConfirm: () => void, variant: 'danger' | 'warning' = 'warning') => {
    setConfirmConfig({ isOpen: true, title, message, onConfirm, variant })
  }

  const clientColumns = [
    { 
      header: 'Cliente', 
      accessor: (client: Client) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm uppercase">
            {client.nombre.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight mb-0.5">{client.nombre}</p>
            <p className="text-xs text-slate-400 font-medium">{client.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: '', 
      accessor: () => (
        <div className="flex justify-end pr-4 text-slate-300">
          <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <ChevronRight size={20} />
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {selectedClientId ? (
            <Button variant="ghost" onClick={() => setSelectedClientId(null)} className="rounded-full w-10 h-10 p-0 hover:bg-slate-50 text-slate-400 hover:text-blue-600 border border-slate-50">
              <ArrowLeft size={20} />
            </Button>
          ) : (
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <ClipboardList size={24} />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {selectedClientId ? `Revisiones: ${selectedClient?.nombre}` : 'Directorio de Revisiones'}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {selectedClientId ? 'Gestión del historial médico y antropométrico' : 'Busca y selecciona un cliente para ver su evolución'}
            </p>
          </div>
        </div>

        {selectedClientId && (
          <Button onClick={() => { setEditingRevision(undefined); setIsModalOpen(true); }} className="gap-2 shadow-lg shadow-blue-100">
            <Plus size={18} />
            Nueva Revisión
          </Button>
        )}
      </header>

      <main className="min-h-[500px]">
        {!selectedClientId ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o correo electrónico..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            {loadingClients ? (
              <div className="p-20 text-center text-slate-400 animate-pulse font-bold">Iniciando directorio...</div>
            ) : (
              <Table 
                columns={clientColumns} 
                data={filteredClients} 
                onRowClick={(client) => setSelectedClientId(client.id)}
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {loadingRevisions ? (
              <div className="bg-white p-20 rounded-2xl border border-slate-100 text-center text-slate-400 animate-pulse font-medium">
                Sincronizando historial médico...
              </div>
            ) : revisions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {revisions.map((rev, idx) => (
                  <RevisionItem 
                    key={rev.id} 
                    revision={rev} 
                    isLatest={idx === 0} 
                    onEdit={(r) => { setEditingRevision(r); setIsModalOpen(true); }}
                    onDelete={(id) => openConfirm(
                      'Eliminar Revisión',
                      '¿Estás seguro de que deseas eliminar permanentemente este registro? Esta acción no se puede deshacer.',
                      () => {
                        deleteMutation.mutate(id)
                        setConfirmConfig(prev => ({ ...prev, isOpen: false }))
                      },
                      'danger'
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-16 rounded-2xl border border-slate-100 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <Activity size={32} />
                </div>
                <div className="max-w-xs mx-auto">
                  <p className="text-slate-800 font-bold">Sin revisiones</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Este cliente aún no tiene registros antropométricos. Pulsa en "Nueva Revisión" para comenzar.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => openConfirm(
          'Descartar cambios',
          '¿Estás seguro de cerrar el formulario? Se perderán todos los datos que no hayas guardado.',
          () => {
            setIsModalOpen(false)
            setConfirmConfig(prev => ({ ...prev, isOpen: false }))
          }
        )} 
        title={editingRevision ? 'Actualizar Registro' : 'Nuevo Registro Antropométrico'}
        size="2xl"
      >
        <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          <RevisionForm 
            clientId={selectedClientId!} 
            clientEmail={selectedClient?.email || ''}
            initialData={editingRevision}
            previousRevision={previousRevision}
            onSuccess={(data) => saveMutation.mutate(data)}
            onCancel={() => openConfirm(
              'Descartar cambios',
              '¿Estás seguro de cancelar? Los datos introducidos se perderán.',
              () => {
                setIsModalOpen(false)
                setConfirmConfig(prev => ({ ...prev, isOpen: false }))
              }
            )}
          />
        </div>
      </Modal>

      <ConfirmDialog 
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
        variant={confirmConfig.variant}
      />
    </div>
  )
}
