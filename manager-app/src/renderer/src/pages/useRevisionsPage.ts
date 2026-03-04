import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { fetchAllClients } from '@renderer/data/client.data'
import { fetchClientRevisions, deleteRevision, createRevision, updateRevision } from '@renderer/data/revision.data'
import { type Client } from '@/repositories/clients.repository'
import { type Revision } from '@/repositories/revisions.repository'
import { type RevisionFormData } from '@shared/schemas/revision.schema'

interface ConfirmConfig {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  variant?: 'danger' | 'warning'
}

export function useRevisionsPage() {
  const queryClient = useQueryClient()
  const location = useLocation()
  
  const state = location.state as { clientId?: string } | null
  const [selectedClientId, setSelectedClientId] = useState<string | null>(state?.clientId || null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRevision, setEditingRevision] = useState<Revision | undefined>(undefined)
  
  const [confirmConfig, setConfirmConfig] = useState<ConfirmConfig>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  // 1. Query de Clientes
  const { data: clients = [], isLoading: loadingClients } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: fetchAllClients
  })

  // 2. Query de Revisiones (Raw)
  const { data: rawRevisions = [], isLoading: loadingRevisions } = useQuery<Revision[]>({
    queryKey: ['revisions', selectedClientId],
    queryFn: () => fetchClientRevisions(selectedClientId!),
    enabled: !!selectedClientId
  })

  // 3. Revisiones Ordenadas (La más nueva primero según creación)
  const revisions = useMemo(() => {
    return [...rawRevisions].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [rawRevisions])

  const previousRevision = revisions[0]

  // 4. Mutaciones
  const saveMutation = useMutation({
    mutationFn: async (data: RevisionFormData) => {
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

  // 5. Estado Derivado
  const selectedClient = useMemo(() => clients.find(c => c.id === selectedClientId), [clients, selectedClientId])

  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [clients, searchTerm])

  // 6. Handlers
  const openConfirm = (title: string, message: string, onConfirm: () => void, variant: 'danger' | 'warning' = 'warning'): void => {
    setConfirmConfig({ isOpen: true, title, message, onConfirm, variant })
  }

  const closeConfirm = (): void => {
    setConfirmConfig(prev => ({ ...prev, isOpen: false }))
  }

  return {
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
  }
}
