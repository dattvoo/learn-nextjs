import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AccountType } from "@/schemaValidations/account.schema"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { AccountItem } from "./account-table"
import { useContext, createContext } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export const AccountTableContext = createContext<{
    setEmployeeIdEdit: (value: number) => void
    employeeIdEdit: number | undefined
    employeeDelete: AccountItem | null
    setEmployeeDelete: (value: AccountItem | null) => void
}>({
    setEmployeeIdEdit: (value: number | undefined) => { },
    employeeIdEdit: undefined,
    employeeDelete: null,
    setEmployeeDelete: (value: AccountItem | null) => { }
})


export const columns: ColumnDef<AccountType>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'avatar',
        header: 'Avatar',
        cell: ({ row }) => (
            <div>
                <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                    <AvatarImage src={row.getValue('avatar')} />
                    <AvatarFallback className='rounded-none'>{row.original.name}</AvatarFallback>
                </Avatar>
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: 'Tên',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <CaretSortIcon className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: function Actions({ row }) {
            const { setEmployeeIdEdit, setEmployeeDelete } = useContext(AccountTableContext)
            const openEditEmployee = () => {
                setEmployeeIdEdit(row.original.id)
            }

            const openDeleteEmployee = () => {
                setEmployeeDelete(row.original)
            }
            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <DotsHorizontalIcon className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={openEditEmployee}>Sửa</DropdownMenuItem>
                        <DropdownMenuItem onClick={openDeleteEmployee}>Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
