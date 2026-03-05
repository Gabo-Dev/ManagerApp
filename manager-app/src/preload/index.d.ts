import { type IpcRenderer } from 'electron'
import { type dbApi } from './preload'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer,
    db: typeof dbApi
  }
}
