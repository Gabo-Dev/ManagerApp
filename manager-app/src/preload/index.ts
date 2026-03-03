import { contextBridge, ipcRenderer } from 'electron'
import { clientRepository } from '@/repositories/clients.repository'

// Inferimos los tipos para no reescribirlos.
type ClientRepository = typeof clientRepository
type CreateClientParams = Parameters<ClientRepository['create']>[0]

// La API que vamos a exponer al mundo de React.
const dbApi = {
  createClient: (data: CreateClientParams) => ipcRenderer.invoke('db:createClient', data),
  getAllClients: () => ipcRenderer.invoke('db:getAllClients')
}

// Exponemos nuestra `dbApi` en el objeto `window` del renderer,
// pero de forma segura bajo la propiedad `db`.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('db', dbApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // Esto es para entornos viejos sin `contextIsolation`, no deberías caer acá.
  // @ts-ignore - Ignoramos el error de TypeScript porque sabemos que `window` existe en este contexto.
  window.db = dbApi
}

// Definimos el tipo global para que TypeScript no se queje en React
declare global {
  interface Window {
    db: typeof dbApi
  }
}
