'use client'

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'


import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AccountListResType, } from '@/schemaValidations/account.schema'
import AddEmployee from '@/app/manage/accounts/add-employee'
import EditEmployee from '@/app/manage/accounts/edit-employee'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AutoPagination from '@/components/auto-pagination'
import AlertDialogDeleteAccount from '@/components/ui/alert-dialog-delete-account'
import { AccountTableContext, columns } from './columns'

export type AccountItem = AccountListResType['data'][0]




// Số lượng item trên 1 trang
const PAGE_SIZE = 10
export default function AccountTable() {
    const searchParam = useSearchParams()
    const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
    const pageIndex = page - 1
    // const params = Object.fromEntries(searchParam.entries())
    const [employeeIdEdit, setEmployeeIdEdit] = useState<number | undefined>()
    const [employeeDelete, setEmployeeDelete] = useState<AccountItem | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = []
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({
        pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
        pageSize: PAGE_SIZE //default page size
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        }
    })

    useEffect(() => {
        table.setPagination({
            pageIndex,
            pageSize: PAGE_SIZE
        })
    }, [table, pageIndex])

    return (
        <AccountTableContext.Provider value={{ employeeIdEdit, setEmployeeIdEdit, employeeDelete, setEmployeeDelete }}>
            <div className='w-full'>
                <EditEmployee id={employeeIdEdit} setId={setEmployeeIdEdit} onSubmitSuccess={() => { }} />
                <AlertDialogDeleteAccount employeeDelete={employeeDelete} setEmployeeDelete={setEmployeeDelete} />
                <div className='flex items-center py-4'>
                    <Input
                        placeholder='Filter emails...'
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                        className='max-w-sm'
                    />
                    <div className='ml-auto flex items-center gap-2'>
                        <AddEmployee />
                    </div>
                </div>
                <div className='rounded-md border'>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className='flex items-center justify-end space-x-2 py-4'>
                    <div className='text-xs text-muted-foreground py-4 flex-1 '>
                        Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong> trong <strong>{data.length}</strong>{' '}
                        kết quả
                    </div>
                    <div>
                        <AutoPagination
                            page={table.getState().pagination.pageIndex + 1}
                            pageSize={table.getPageCount()}
                            pathname='/manage/accounts'
                        />
                    </div>
                </div>
            </div>
        </AccountTableContext.Provider>
    )
}