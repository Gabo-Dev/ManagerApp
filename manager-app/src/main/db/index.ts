import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import { is } from '@electron-toolkit/utils'
import * as schema from './schema'

const dbPath = is.dev
  ? path.join(process.cwd(), 'local.db')
  : path.join(app.getPath('userData'), 'database.db')

const sqlite = new Database(dbPath)

export const db = drizzle(sqlite, { schema })

export const initDB = async (): Promise<void> => {
  try {
    const migrationsPath = is.dev
      ? path.join(process.cwd(), 'drizzle')
      : path.join(process.resourcesPath, 'drizzle')

    migrate(db, { migrationsFolder: migrationsPath })
  } catch (error) {
    // TODO: Considerar un manejo de error más robusto para la inicialización de la DB.
    console.error('❌ Error al inicializar la base de datos:', error) // Mantener para depuración.
    throw error
  }
}

