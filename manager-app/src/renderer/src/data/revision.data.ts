import { type NewRevision, type Revision } from '@/repositories/revisions.repository'

export async function fetchClientRevisions(clientId: string): Promise<Revision[]> {
  if (!clientId) return []
  return window.db.getAllRevisions(clientId)
}

export async function createRevision(
  data: Omit<NewRevision, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Revision> {
  return window.db.createRevision(data)
}

export async function updateRevision(
  id: string,
  data: Partial<Omit<NewRevision, 'id' | 'createdAt'>>
): Promise<Revision> {
  return window.db.updateRevision(id, data)
}

export async function deleteRevision(id: string): Promise<boolean> {
  return window.db.deleteRevision(id)
}
