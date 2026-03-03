import { useState, type JSX, useEffect } from 'react'

type Client = {
  id: string
  nombre: string
  email: string
}

export const ClientsList = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const fetchClients = async (): Promise<void> => {
      try {
        const allClients = await window.db.getAllClients()
        setClients(allClients)
      } catch (error) {
        console.error('Error al obtener clientes:', error)
      }
    }
    fetchClients()
  }, [])

  return (
    <ul className="p-5 border border-gray-300 rounded-lg bg-white shadow">
      <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b">Lista de Clientes</h2>
      {clients.length > 0 ? (
        clients.map((client) => (
          <li
            key={client.id}
            className="border-b border-gray-200
            last:border-0 py-2 flex
            justify-between"
          >
            <span>{client.nombre}</span>
            <span className="text-gray-500">{client.email}</span>
          </li>
        ))
      ) : (
        <p className="text-gray-500 py-2">No hay clientes para mostrar.</p>
      )}
    </ul>
  )
}
