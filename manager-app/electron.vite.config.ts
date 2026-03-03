import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

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
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('shared'),
        '@core': resolve('src/renderer/src/core'),
        '@presentation': resolve('src/renderer/src/presentation')
      }
    },
    plugins: [react()]
  }
})
