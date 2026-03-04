import { contextBridge, ipcRenderer } from 'electron'

const dbApi = {
  // Clients
  createClient: (data: any) => ipcRenderer.invoke('db:createClient', data),
  getAllClients: () => ipcRenderer.invoke('db:getAllClients'),
  updateClient: (id: string, data: any) => ipcRenderer.invoke('db:updateClient', id, data),
  deleteClient: (id: string) => ipcRenderer.invoke('db:deleteClient', id),

  // Revisions
  createRevision: (data: any) => ipcRenderer.invoke('db:createRevision', data),
  getAllRevisions: (clientId: string) => ipcRenderer.invoke('db:getAllRevisions', clientId),
  updateRevision: (id: string, data: any) => ipcRenderer.invoke('db:updateRevision', id, data),
  deleteRevision: (id: string) => ipcRenderer.invoke('db:deleteRevision', id)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', dbApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.db = dbApi
}

declare global {
  interface Window {
    db: typeof dbApi
  }
}
