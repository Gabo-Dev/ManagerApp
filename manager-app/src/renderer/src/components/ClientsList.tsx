import { type JSX } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAllClients, deleteClient } from '@renderer/data/client.data'
import { Table } from '@renderer/components/Table'
import { Button } from '@renderer/components/Button'
import { Edit2, Trash2, Eye, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { type Client } from '@/repositories/clients.repository'

interface ClientsListProps {
  onEdit: (client: Client) => void
}

export function ClientsList({ onEdit }: ClientsListProps): JSX.Element {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchAllClients
  })

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  const columns = [
    {
      header: 'Cliente',
      accessor: (client: Client) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <User size={16} />
          </div>
          <span className="font-medium text-slate-900">{client.nombre}</span>
        </div>
      )
    },
    { header: 'Email', accessor: 'email' as const },
    {
      header: 'Acciones',
      accessor: (client: Client) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/revisions', { state: { clientId: client.id } })}
          >
            <Eye size={16} className="text-blue-600" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(client)}>
            <Edit2 size={16} className="text-slate-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm('¿Estás seguro de eliminar este cliente?')) {
                deleteMutation.mutate(client.id)
              }
            }}
          >
            <Trash2 size={16} className="text-red-400" />
          </Button>
        </div>
      )
    }
  ]

  if (isLoading)
    return <div className="p-10 text-center text-slate-400 animate-pulse">Cargando clientes...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          Clientes
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {clients.length}
          </span>
        </h2>
      </div>
      <Table columns={columns} data={clients} />
    </div>
  )
}
