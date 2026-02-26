# ManagerApp 📊

**ManagerApp** es una solución de escritorio profesional para la gestión de clientes y seguimiento de métricas corporales. Construida con Electron, React, TypeScript y SQLite, está enfocada en la privacidad (Local-first) y el alto rendimiento.

## Características Principales
* **Gestión de Clientes**: Registro y administración de perfiles individuales.
* **Seguimiento Antropométrico**: Control de medidas (cuello, cintura, cadera, etc.) y pliegues (tricipital, abdominal, etc.).
* **Cálculos Automáticos**: Generación de IMC, Peso Graso, Masa Libre de Grasa (MLG) y porcentajes de grasa/MME.
* **Privacidad Local-first**: Todos los datos se almacenan localmente en el dispositivo del usuario (`%APPDATA%`) sin envíos a servidores externos.
* **Sistema de Backups**: Herramientas integradas para respaldos manuales y automáticos con rotación.

## 🛠️ Stack Tecnológico
* **Framework**: [Electron](https://www.electronjs.org/) + [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
* **Lenguaje**: TypeScript
* **Estilos**: Tailwind CSS
* **Base de Datos**: SQLite (vía [Drizzle ORM](https://orm.drizzle.team/))
* **Validación**: Zod
* **Estado**: Zustand
* **Testing**: Vitest

## 🏗️ Arquitectura y Estructura
El proyecto sigue los principios de **Clean Architecture** y **Clean Code**, organizando el código de la siguiente manera:

```
src/
├── main/                  # Proceso principal de Electron (Node.js)
│   ├── db/                # Esquemas de Drizzle y migraciones de SQLite
│   └── services/          # Lógica de servidor y controladores de datos
├── renderer/              # Interfaz de usuario (React)
│   ├── src/
│   │   ├── core/          # Dominio: Entidades, Reglas de Negocio y Casos de Uso
│   │   ├── data/          # Adaptadores: Comunicación IPC con el proceso Main
│   │   ├── presentation/  # UI: Componentes, Hooks de Estado (Zustand) y Vistas
│   │   └── shared/        # Utilidades, esquemas de Zod y constantes
├── types/                 # Tipados globales compartidos
└── tests/                 # Pruebas unitarias y de integración
```
