import { type IpcRenderer } from 'electron'
import { type dbApi } from '../../preload/index' // Importamos el tipo real desde el preload

declare global {
  interface Window {
    ipcRenderer: IpcRenderer,
    db: typeof dbApi // Declaramos el tipo de `db`
  }
}
