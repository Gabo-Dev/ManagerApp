# ManagerApp 📈 | Gestión de Clientes y Métricas Corporales para Profesionales

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Electron](https://img.shields.io/badge/Built_with-Electron-404040.svg?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

ManagerApp es una potente aplicación de escritorio, centrada en la privacidad, diseñada para que los profesionales gestionen eficientemente la información de sus clientes y realicen un seguimiento de métricas corporales esenciales. Construida con una pila tecnológica moderna que incluye Electron, React y TypeScript, enfatiza un enfoque de "local-first" para el manejo de datos, garantizando la privacidad del usuario y el control de sus datos. Su arquitectura limpia y escalable la convierte en una herramienta fiable para una gestión de clientes enfocada, sin depender de servicios en la nube.

## ✨ Características Clave

*   **Arquitectura Frontend Escalable:**
    *   📄 Diseños persistentes y sistema de Páginas para una interfaz de usuario consistente.
    *   ➡️ Navegación interna gestionada por **React Router**, asegurando una lógica de interfaz de usuario y enrutamiento desacoplada.
    *   📁 Estructura de carpetas clara (`layouts`, `pages`, `components`) para facilitar el mantenimiento.
*   **Comunicación Segura entre Proceso Principal y de Renderizado:**
    *   📡 Comunicación Robusta entre Procesos (IPC) utilizando `ipcMain.handle`/`ipcRenderer.invoke` para comunicación asíncrona.
    *   🔒 **Script de precarga (Preload Script)** con `contextBridge` para exponer APIs de forma segura al proceso de renderizado, evitando la fuga de APIs de Node.js.
*   **Patrón de Repositorio para Acceso a Datos:**
    *   🗄️ Toda la lógica de la base de datos de clientes encapsulada dentro de un `clientRepository`.
    *   ➕📖 Métodos implementados para **Crear** y **Leer** clientes, adhiriéndose a los principios de responsabilidad única.
*   💾 **Almacenamiento de Datos "Local-first":** Haciendo hincapié en la privacidad y el control del usuario, todos los datos se almacenan localmente.
*   👥 **Gestión de Clientes:** Herramientas eficientes para añadir, ver y gestionar perfiles de clientes.
*   💪 **Seguimiento de Métricas Corporales:** Sistema completo para registrar y analizar las métricas corporales de los clientes a lo largo del tiempo.

## 🛠️ Tecnologías Utilizadas

*   **Framework de Escritorio**: [Electron](https://www.electronjs.org/)
*   **Herramientas Frontend**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS
*   **Base de Datos**: SQLite con [Drizzle ORM](https://orm.drizzle.team/)
*   **Enrutamiento**: React Router DOM
*   **Gestión de Estado Global**: Zustand
*   **Validación de Esquemas**: Zod

## 🚀 Comenzando

Sigue estos pasos para configurar y ejecutar ManagerApp localmente:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Gabo-Dev/ManagerApp.git
    cd ManagerApp
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o si usas pnpm
    # pnpm install
    ```

3.  **Ejecuta la aplicación en modo desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Compila la aplicación para producción:**
    ```bash
    npm run build
    ```
    Los artefactos de construcción se encontrarán en el directorio `dist`.

## 🤝 Contribuciones

¡Las contribuciones son siempre bienvenidas! Si deseas contribuir a ManagerApp, por favor sigue estos pasos:

1.  Haz un **fork** del repositorio en GitHub.
2.  **Clona** tu repositorio bifurcado a tu máquina local.
3.  **Crea una nueva rama** para tu característica o corrección de errores.
4.  **Realiza tus cambios** y asegúrate de que se adhieren a los estándares de codificación del proyecto.
5.  **Confirma tus cambios** con un mensaje de commit claro y descriptivo siguiendo las directrices de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
6.  **Sube tu rama** a tu repositorio bifurcado.
7.  **Abre un Pull Request** a la rama `main` del repositorio original de ManagerApp, describiendo tus cambios en detalle.

¡Tus contribuciones ayudan a mejorar ManagerApp para todos!

## 📧 Contacto

Si tienes alguna pregunta, sugerencia o simplemente quieres conectar, ¡no dudes en contactarme!

*   **GitHub**: [@Gabo-Dev](https://github.com/Gabo-Dev)

## 💡 Reflexiones y Viaje del Desarrollador

ManagerApp nació del deseo de combinar varios objetivos de aprendizaje y experiencias personales. Mi viaje en la construcción de esta aplicación fue motivado principalmente por:

*   **Explorar Alternativas a Supabase Admin:** Habiendo trabajado extensamente con Supabase, quería entender las complejidades de replicar funcionalidades administrativas similares en un entorno de escritorio "local-first". Este proyecto sirvió como un excelente campo de pruebas para esa exploración.
*   **Profundizar en el Conjunto de Habilidades en Desarrollo de Escritorio Moderno:** Mi objetivo era profundizar en Electron, React y TypeScript, llevando al límite lo que podía lograr con estas tecnologías en el contexto de una aplicación de escritorio. Esto incluyó explorar patrones IPC robustos y la gestión local de datos.
*   **Construir una Herramienta Práctica:** Más allá del aspecto de aprendizaje, había un interés genuino en crear una herramienta funcional y centrada en la privacidad para gestionar clientes y sus métricas, abordando una necesidad común para los profesionales.

---

### Superando los Retos de Tipado con TypeScript

Uno de los desafíos más significativos y las experiencias de aprendizaje más gratificantes durante el desarrollo de ManagerApp giró en torno al **tipado estricto de TypeScript**. Aunque TypeScript ofrece inmensos beneficios en términos de calidad y mantenibilidad del código, garantizar la coherencia de tipos en las diferentes capas de la aplicación –especialmente entre el proceso `main` de Electron y el proceso `renderer`, y con la persistencia de datos usando Drizzle ORM– requirió una planificación cuidadosa y un esfuerzo persistente.

El objetivo era mantener la seguridad de tipos de extremo a extremo, desde los esquemas de la base de datos hasta las interacciones de la API y los componentes de la interfaz de usuario, previniendo errores comunes en tiempo de ejecución y mejorando la experiencia del desarrollador. Este impulso por la coherencia realmente destacó el poder y, a veces, la complejidad de gestionar una base de código fuertemente tipada.

---

### Mi Característica Favorita: El Formulario de Revisión de Clientes

Entre los muchos componentes y funcionalidades dentro de ManagerApp, el **Formulario de Revisión de Clientes** se destaca como mi característica favorita. Su desarrollo presentó una combinación única de diseño de UI/UX, manejo complejo de datos y una intrincada gestión de estado.

*   **Complejidad**: Este formulario no es solo un simple punto de entrada de datos. Se adapta dinámicamente en función de varias métricas del cliente, implica cálculos en tiempo real y requiere una validación robusta para garantizar la integridad de los datos.
*   **Métricas y Dependencias**: El formulario interactúa con múltiples puntos de datos, incluyendo datos históricos del cliente, mediciones actuales y entradas del usuario. Depende en gran medida del `clientRepository` para la persistencia de datos, la gestión de estado global (Zustand) para el estado del formulario y Zod para la validación de esquemas. La interacción entre estas diferentes capas, desde la UI hasta la base de datos, hizo que su implementación fuera particularmente desafiante y satisfactoria.
*   **Experiencia de Usuario**: Diseñar una experiencia intuitiva y eficiente para que los profesionales registren y revisen el progreso del cliente fue un enfoque clave, convirtiéndolo en una parte central e impactante de la aplicación.

---

### Aprendizajes Clave y Crecimiento

Este proyecto ha sido una tremenda experiencia de aprendizaje, contribuyendo significativamente a mi crecimiento como desarrollador. Algunas de las principales conclusiones incluyen:

*   **Dominio Avanzado de TypeScript**: Obtuve una comprensión más profunda y experiencia práctica con características avanzadas de TypeScript, particularmente en torno a operaciones asíncronas (`async/await`) y la definición de tipos para métodos que principalmente realizan acciones (`void`).
*   **Mejora en el Manejo de Pruebas**: Mejoré mi capacidad para escribir pruebas exhaustivas y efectivas, comprendiendo cómo simular dependencias y aislar unidades de código para pruebas fiables.
*   **Dominio del Flujo de Trabajo con Neovim**: Refiné aún más mi flujo de trabajo de desarrollo utilizando Neovim, aprovechando su poder para la edición de código eficiente, la navegación y la gestión de proyectos.
*   **Gestión de Compilaciones Multiplataforma**: Navegué y superé con éxito varias dificultades de compilación e inconsistencias ambientales al compilar la aplicación Electron en diferentes sistemas operativos, obteniendo una valiosa experiencia en los desafíos del desarrollo multiplataforma.