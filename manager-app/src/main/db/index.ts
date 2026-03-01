import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import { is } from '@electron-toolkit/utils';
import * as schema from './schema';

const dbPath = is.dev
? path.join(process.cwd(), 'local.db')
: path.join(app.getPath('userData'), 'database.db');

const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, {schema});

/**
 * Función para ejecutar migraciones al inicio.
 */
export const initDB = async () => {
  try {
    const migrationsPath = is.dev
      ? path.join(process.cwd(), 'drizzle')
      : path.join(process.resourcesPath, 'drizzle');

    console.log(`🚀 Iniciando base de datos en: ${dbPath}`);
    
    migrate(db, { migrationsFolder: migrationsPath });
    
    console.log('✅ Migraciones aplicadas con éxito');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    throw error;
  }
};