# ManagerApp 📈 | Client & Body Metrics Management for Professionals

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Electron](https://img.shields.io/badge/Built_with-Electron-404040.svg?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

ManagerApp is a powerful and privacy-focused desktop application designed for professionals to efficiently manage client information and track essential body metrics. Built with a modern technology stack including Electron, React, and TypeScript, it emphasizes a local-first approach to data handling, ensuring user privacy and data control. Its clean and scalable architecture makes it a reliable tool for focused client management without relying on cloud services.

## ✨ Key Features

*   **Scalable Frontend Architecture:**
    *   Persistent Layouts and Page system for consistent UI.
    *   Internal navigation managed by **React Router**, ensuring decoupled UI and routing logic.
    *   Clear folder structure (`layouts`, `pages`, `components`) for maintainability.
*   **Secure Main-Renderer Communication:**
    *   Robust Inter-Process Communication (IPC) using `ipcMain.handle`/`ipcRenderer.invoke` for asynchronous communication.
    *   **Preload Script** with `contextBridge` to securely expose APIs to the renderer, preventing Node.js API leakage.
*   **Repository Pattern for Data Access:**
    *   All client database logic encapsulated within a `clientRepository`.
    *   Implemented methods for **Creating** and **Reading** clients, adhering to single responsibility principles.
*   **Local-first Data Storage:** Emphasizing privacy and user control, all data is stored locally.
*   **Client Management:** Efficient tools for adding, viewing, and managing client profiles.
*   **Body Metrics Tracking:** Comprehensive system for recording and analyzing client body metrics over time.

## 🛠️ Technologies Used

*   **Desktop Framework**: [Electron](https://www.electronjs.org/)
*   **Frontend Tooling**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Database**: SQLite with [Drizzle ORM](https://orm.drizzle.team/)
*   **Routing**: React Router DOM
*   **Global State Management**: Zustand
*   **Schema Validation**: Zod

## 🚀 Getting Started

Follow these steps to set up and run ManagerApp locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gabo-Dev/ManagerApp.git
    cd ManagerApp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use pnpm
    # pnpm install
    ```

3.  **Run the application in development mode:**
    ```bash
    npm run dev
    ```

4.  **Build the application for production:**
    ```bash
    npm run build
    ```
    The build artifacts will be located in the `dist` directory.

## 🤝 Contributing

Contributions are always welcome! If you'd like to contribute to ManagerApp, please follow these steps:

1.  **Fork** the repository on GitHub.
2.  **Clone** your forked repository to your local machine.
3.  **Create a new branch** for your feature or bug fix.
4.  **Make your changes** and ensure they adhere to the project's coding standards.
5.  **Commit your changes** with a clear and descriptive commit message following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.
6.  **Push your branch** to your forked repository.
7.  **Open a Pull Request** to the `main` branch of the original ManagerApp repository, describing your changes in detail.

Your contributions help make ManagerApp better for everyone!

## 📧 Contact

If you have any questions, suggestions, or just want to connect, feel free to reach out!

*   **GitHub**: [@Gabo-Dev](https://github.com/Gabo-Dev)

## 💡 Developer Insights & Journey

ManagerApp was born from a desire to combine several learning objectives and personal experiences. My journey into building this application was primarily motivated by:

*   **Exploring Alternatives to Supabase Admin:** Having worked extensively with Supabase, I wanted to understand the intricacies of replicating similar administrative functionalities in a local-first desktop environment. This project served as an excellent playground for that exploration.
*   **Deepening Skillset in Modern Desktop Development:** I aimed to dive deeper into Electron, React, and TypeScript, pushing the boundaries of what I could achieve with these technologies in a desktop application context. This included exploring robust IPC patterns and local data management.
*   **Building a Practical Tool:** Beyond the learning aspect, there was a genuine interest in creating a functional, privacy-focused tool for managing clients and their metrics, addressing a common need for professionals.

---

### Overcoming Typing Challenges with TypeScript

One of the most significant challenges and rewarding learning experiences during ManagerApp's development revolved around **TypeScript's strong typing**. While TypeScript offers immense benefits in terms of code quality and maintainability, ensuring type coherence across different layers of the application – especially between the Electron `main` process and the `renderer` process, and with data persistence using Drizzle ORM – required careful planning and persistent effort.

The goal was to maintain end-to-end type safety, from database schemas to API interactions and UI components, preventing common runtime errors and improving developer experience. This push for coherence truly highlighted the power and sometimes the complexity of managing a strongly typed codebase.

---

### My Favorite Feature: The Client Review Form

Among the many components and functionalities within ManagerApp, the **Client Review Form** stands out as my favorite feature. Its development presented a unique blend of UI/UX design, complex data handling, and intricate state management.

*   **Complexity**: This form isn't just a simple data entry point. It dynamically adapts based on various client metrics, involves real-time calculations, and requires robust validation to ensure data integrity.
*   **Metrics & Dependencies**: The form interacts with multiple data points, including historical client data, current measurements, and user inputs. It relies heavily on the `clientRepository` for data persistence, global state management (Zustand) for form state, and Zod for schema validation. The interplay between these different layers, from the UI to the database, made its implementation particularly challenging and satisfying.
*   **User Experience**: Crafting an intuitive and efficient experience for professionals to record and review client progress was a key focus, making it a central and impactful part of the application.

---

### Key Learnings & Growth

This project has been a tremendous learning experience, contributing significantly to my growth as a developer. Some of the key takeaways include:

*   **Advanced TypeScript Proficiency**: Gained deeper understanding and practical experience with advanced TypeScript features, particularly around asynchronous operations (`async/await`) and defining types for methods that primarily perform actions (`void`).
*   **Improved Test Handling**: Enhanced my ability to write comprehensive and effective tests, understanding how to mock dependencies and isolate units of code for reliable testing.
*   **Neovim Workflow Mastery**: Further refined my development workflow using Neovim, leveraging its power for efficient code editing, navigation, and project management.
*   **Cross-OS Build Management**: Navigated and successfully overcame various build difficulties and environmental inconsistencies when compiling the Electron application across different operating systems, gaining valuable experience in cross-platform development challenges.
