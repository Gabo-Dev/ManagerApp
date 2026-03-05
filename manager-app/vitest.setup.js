import { vi } from 'vitest'

// Mock del objeto 'db' expuesto por el preload script
// Esto evita que los tests intenten llamar al IPC real.
const mockDb = {
  createClient: vi.fn(),
  getAllClients: vi.fn(),
  updateClient: vi.fn(),
  deleteClient: vi.fn(),
  createRevision: vi.fn(),
  getAllRevisions: vi.fn(),
  updateRevision: vi.fn(),
  deleteRevision: vi.fn()
}

// Simulamos el window.db
global.window = {
  ...global.window,
  db: mockDb
}
