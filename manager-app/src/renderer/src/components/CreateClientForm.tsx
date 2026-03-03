import { useState, type JSX } from 'react'

export function CreateClientForm(): JSX.element {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!nombre || !email) {
      setError('El nombre y el email son obligatorios.')
      return
    }

    try {
      const newClient = await window.db.createClient({ nombre, email, notas: '' })

      console.log('Cliente creado con éxito en el Main Process:', newClient)
      setSuccess(`¡Cliente "${newClient.nombre}" creado con ID: ${newClient.id}!`)
      setNombre('')
      setEmail('')
    } catch (err) {
      console.error('Error desde el Main Process:', err)
      setError('No se pudo crear el cliente. ¿Quizás el email ya existe?')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-5 border border-gray-300 rounded-lg bg-white shadow"
    >
      <h2 className="text-xl font-semibold text-gray-800">Crear Nuevo Cliente</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Guardar Cliente
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
    </form>
  )
}
