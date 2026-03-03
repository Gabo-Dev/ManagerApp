import type { JSX } from 'react'
import { CreateClientForm } from './components/CreateClientForm'
import { ClientsList } from './components/ClientsList'

function App(): JSX.Element {
  return (
    <div className="container mx-auto p-8 font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Gestor de Clientes</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <CreateClientForm />
        </section>
        <section>
          <ClientsList />
        </section>
      </main>
    </div>
  )
}
export default App
