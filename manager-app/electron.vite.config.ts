import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      externalizeDeps: true
    },
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@shared': resolve('shared')
      }
    }
  },
  preload: {
    build: {
      externalizeDeps: true
    },
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@shared': resolve('shared')
      }
    }
  },
  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('shared')
      }
    }
  }
})
