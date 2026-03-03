# ManagerApp 📊

**ManagerApp** es una solución de escritorio profesional para la gestión de clientes y seguimiento de métricas corporales. Construida con un stack moderno sobre Electron, está enfocada en la privacidad (Local-first) y una arquitectura limpia y escalable.

## ✨ Características Implementadas

*   **Arquitectura de Frontend Escalable:**
    *   Implementación de un sistema de **Layouts Persistentes** y **Páginas**.
    *   Navegación interna gestionada por **React Router**, desacoplando la UI de la lógica de enrutamiento.
    *   Estructura de carpetas clara (`layouts`, `pages`, `components`).
*   **Comunicación Segura Main-Renderer:**
    *   Patrón de IPC robusto usando `ipcMain.handle`/`ipcRenderer.invoke` para comunicación asíncrona.
    *   Uso de un **Preload Script** con `contextBridge` para exponer APIs al `renderer` de forma segura, previniendo la fuga de APIs de Node.js.
*   **Acceso a Datos con Repository Pattern:**
    *   Toda la lógica de base de datos para los clientes está encapsulada en un `clientRepository`.
    *   Implementados métodos para **Crear** y **Leer** clientes, siguiendo principios de responsabilidad única.

## 🛠️ Stack Tecnológico Principal

*   **Framework de Escritorio**: [Electron](https://www.electronjs.org/)
*   **Tooling de Frontend**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS
*   **Base de Datos**: SQLite con [Drizzle ORM](https://orm.drizzle.team/)
*   **Routing**: React Router DOM
*   **Estado Global**: Zustand
*   **Validación de Esquemas**: Zod

## 🏗️ Estructura del Proyecto

El proyecto sigue una arquitectura limpia, separando el `main` y `renderer` process. La estructura del `renderer` está inspirada en Atomic Design y Vertical Slices.

```
src/
├── main/                  # Proceso principal de Electron (Node.js)
│   ├── db/                # Drizzle: Esquemas, cliente y migraciones.
│   └── repositories/      # Repository Pattern: Abstracción del acceso a datos.
│
├── renderer/              # Proceso de UI (React)
│   ├── src/
│   │   ├── components/    # Componentes de UI reusables y "tontos" (Botones, Inputs...).
│   │   ├── layouts/       # Layouts de la aplicación (Ej: MainLayout con Sidebar).
│   │   ├── pages/         # Componentes de página que orquestan la UI y la lógica.
│   │   └── assets/        # Archivos estáticos como CSS e imágenes.
│
└── preload/               # Puente seguro entre el main y el renderer.
```
