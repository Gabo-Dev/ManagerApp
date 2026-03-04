import { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText } from 'lucide-react'

export function Sidebar(): JSX.Element {
  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/revisions', label: 'Revisiones', icon: <FileText size={20} /> }
  ]
  return (
    <aside className="w-64 flex flex-col bg-gray-900 text-white">
      <div className="p-4 text-center border-b border-gray-700">
        <h1 className="text-xl font-bold">ManagerApp</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {navLinks.map((link) => (
            <li key={link.path} className="mb-2">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
