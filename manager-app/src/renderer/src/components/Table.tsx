import { type JSX, type ReactNode } from 'react'

interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => ReactNode)
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
}

export function Table<T extends { id: string }>({
  columns,
  data,
  onRowClick
}: TableProps<T>): JSX.Element {
  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}
              >
                {columns.map((col, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : (item[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-slate-400 italic"
              >
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
