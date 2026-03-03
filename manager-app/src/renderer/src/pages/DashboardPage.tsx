import type { JSX } from 'react'
import { CreateClientForm } from '@renderer/components/CreateClientForm'
import { ClientsList } from '@renderer/components/ClientsList'
export function DashboardPage(): JSX.Element {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <CreateClientForm />
        </section>
        <section>
          <ClientsList />
        </section>
      </div>
    </div>
  )
}
