import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initDB } from '@/db/index'
import { clientRepository } from '@/repositories/clients.repository'
import { revisionRepository } from '@/repositories/revisions.repository'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (is.dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  try {
    await initDB()
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  /*--- IPC HANDLERS ---*/
  
  // Clients
  ipcMain.handle('db:createClient', async (_, data) => clientRepository.create(data))
  ipcMain.handle('db:getAllClients', async () => clientRepository.getAll())
  ipcMain.handle('db:updateClient', async (_, id, data) => clientRepository.update(id, data))
  ipcMain.handle('db:deleteClient', async (_, id) => clientRepository.delete(id))

  // Revisions
  ipcMain.handle('db:createRevision', async (_, data) => revisionRepository.create(data))
  ipcMain.handle('db:getAllRevisions', async (_, clientId) => revisionRepository.getAll(clientId))
  ipcMain.handle('db:updateRevision', async (_, id, data) => revisionRepository.update(id, data))
  ipcMain.handle('db:deleteRevision', async (_, id) => revisionRepository.delete(id))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
