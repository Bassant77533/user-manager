import { ColumnDef } from '@tanstack/react-table'
import { User } from './data'
import { Icon } from '../../atoms/Icons/Icon'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'age',
        header: 'Age',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const value = getValue() as string
            return (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {value}
            </span>
            )
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <div className="flex space-x-2">
            <button className="p-1 hover:bg-slate-100 rounded"><Icon name="eye" /></button>
            <button className="p-1 hover:bg-slate-100 rounded"><Icon name="edit" /></button>
            <button className="p-1 hover:bg-red-50 text-red-600 rounded"><Icon name="trash" /></button>
            </div>
        ),
    },
]
