import { JSX } from 'react'
import { NavLink } from 'react-router-dom'

export function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 flex flex-col bg-gray-900 text-white">
      <div className="p-4 text-center border-b border-gray-700">
        <h1 className="text-xl font-bold">ManagerApp</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block w-full  text-left  px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
