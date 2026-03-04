import type { JSX } from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { DashboardPage } from '@renderer/pages/DashboardPage'
import { RevisionsPage } from '@renderer/pages/RevisionsPage'

function App(): JSX.Element {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />
        <Route
          path="/revisions"
          element={
            <MainLayout>
              <RevisionsPage />
            </MainLayout>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}
export default App
