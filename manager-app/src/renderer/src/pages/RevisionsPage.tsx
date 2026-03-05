import { type JSX } from 'react'
import { ClipboardList, Activity, ArrowLeft, ChevronRight, Search, Plus } from 'lucide-react'
import { Button } from '@renderer/components/Button'
import { Table } from '@renderer/components/Table'
import { RevisionItem } from '@renderer/components/revisions/RevisionItem'
import { Modal } from '@renderer/components/Modal'
import { RevisionForm } from '@renderer/components/revisions/RevisionForm'
import { ConfirmDialog } from '@renderer/components/ConfirmDialog'
import { useRevisionsPage } from './useRevisionsPage'
import { type Client } from '@/repositories/clients.repository'

export function RevisionsPage(): JSX.Element {
  const {
    selectedClientId,
    setSelectedClientId,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    editingRevision,
    setEditingRevision,
    confirmConfig,
    loadingClients,
    loadingRevisions,
    revisions,
    selectedClient,
    previousRevision,
    filteredClients,
    saveMutation,
    deleteMutation,
    openConfirm,
    closeConfirm
  } = useRevisionsPage()

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
          <div className="p-2 rounded-full transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
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
            <Button 
              variant="secondary" 
              onClick={() => setSelectedClientId(null)} 
              className="rounded-xl w-12 h-12 p-0 hover:bg-blue-600 hover:text-white border-none shadow-sm transition-all duration-300 group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <ClipboardList size={24} />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {selectedClientId
                ? `Revisiones: ${selectedClient?.nombre}`
                : 'Directorio de Revisiones'}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {selectedClientId
                ? 'Gestión del historial médico y antropométrico'
                : 'Busca y selecciona un cliente para ver su evolución'}
            </p>
          </div>
        </div>

        {selectedClientId && (
          <Button
            onClick={() => {
              setEditingRevision(undefined)
              setIsModalOpen(true)
            }}
            className="gap-2 shadow-lg shadow-blue-100"
          >
            <Plus size={18} />
            Nueva Revisión
          </Button>
        )}
      </header>

      <main className="min-h-[500px]">
        {!selectedClientId ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar por nombre o correo electrónico..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loadingClients ? (
              <div className="p-20 text-center text-slate-400 animate-pulse font-bold">
                Iniciando directorio...
              </div>
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
                    onEdit={(r) => {
                      setEditingRevision(r)
                      setIsModalOpen(true)
                    }}
                    onDelete={(id) =>
                      openConfirm(
                        'Eliminar Revisión',
                        '¿Estás seguro de que deseas eliminar permanentemente este registro?',
                        () => {
                          deleteMutation.mutate(id)
                          closeConfirm()
                        },
                        'danger'
                      )
                    }
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
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Este cliente aún no tiene registros antropométricos.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() =>
          openConfirm('Descartar cambios', '¿Estás seguro de cerrar el formulario?', () => {
            setIsModalOpen(false)
            closeConfirm()
          })
        }
        title={editingRevision ? 'Actualizar Registro' : 'Nuevo Registro Antropométrico'}
        size="2xl"
      >
        <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          <RevisionForm 
            clientId={selectedClientId!} 
            initialData={editingRevision}
            previousRevision={previousRevision}
            onSuccess={(data) => saveMutation.mutate(data)}
            onCancel={() => openConfirm(
              'Descartar cambios',
              '¿Estás seguro de cancelar?',
              () => {
                setIsModalOpen(false)
                closeConfirm()
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
        onCancel={closeConfirm}
        variant={confirmConfig.variant}
      />
    </div>
  )
}
