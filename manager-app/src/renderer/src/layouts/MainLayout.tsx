import type { ReactNode, JSX } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'

export function MainLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}
