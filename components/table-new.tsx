'use client';

import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Divisi, Role, Status } from '@/constants/data';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey: string;
    pageNo: number;
    totalData: number;
    pageSizeOptions?: number[];
    pageCount: number;
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
    roles?: Role[];
    divisions?: Divisi[];
    status?: Status[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageNo,
    searchKey,
    totalData,
    pageCount,
    pageSizeOptions = [10, 20, 30, 40, 50],
    roles,
    divisions,
    status
}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
    const [selectedDivision, setSelectedDivision] = React.useState<string | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
    const [selectedGroupStatus, setSelectedGroupStatus] = React.useState<string | null>(null);

    const title = pathname.includes('user-mgmt') ? 
        'user' : pathname.includes('izin') || pathname.includes('presensi') ? 
        'karyawan' : pathname.includes('divisi') ? 
        'divisi' : pathname.includes('role') ?
        'role' : pathname.includes('status') ?
        'status' : pathname.includes('titik') ? 
        'titik' : "";

    // Search params
    const page = searchParams?.get('page') ?? '1';
    const pageAsNumber = Number(page);
    const fallbackPage = isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
    const per_page = searchParams?.get('limit') ?? '10';
    const perPageAsNumber = Number(per_page);
    const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

    // Create query string
    const createQueryString = React.useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams?.toString());

            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            }

            return newSearchParams.toString();
        },
        [searchParams]
    );

    // Handle server-side pagination
    const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
        pageIndex: fallbackPage - 1,
        pageSize: fallbackPerPage
    });

    React.useEffect(() => {
        router.push(
            `${pathname}?${createQueryString({
                page: pageIndex + 1,
                limit: pageSize,
                role: selectedRole,
                division: selectedDivision,
                date: selectedDate,
                status: selectedStatus,
                group: selectedGroupStatus
            })}`,
            {
                scroll: false
            }
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, selectedRole, selectedDivision, selectedDate, selectedStatus, selectedGroupStatus]);

    const table = useReactTable({
        data,
        columns,
        pageCount: pageCount ?? -1,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination: { pageIndex, pageSize }
        },
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualFiltering: true
    });

    const searchValue = table.getColumn(searchKey)?.getFilterValue() as string;

    React.useEffect(() => {
        if (searchValue?.length > 0) {
            router.push(
                `${pathname}?${createQueryString({
                    page: null,
                    limit: null,
                    search: searchValue,
                    role: selectedRole,
                    division: selectedDivision,
                    date: selectedDate,
                    status: selectedStatus,
                    group: selectedGroupStatus
                })}`,
                {
                    scroll: false
                }
            );
        }
        if (searchValue?.length === 0 || searchValue === undefined) {
            router.push(
                `${pathname}?${createQueryString({
                    page: null,
                    limit: null,
                    search: null,
                    role: selectedRole,
                    division: selectedDivision,
                    date: selectedDate,
                    status: selectedStatus,
                    group: selectedGroupStatus
                })}`,
                {
                    scroll: false
                }
            );
        }

        setPagination((prev) => ({ ...prev, pageIndex: 0 }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    return (
        <>
            <div className="flex space-x-2">
                <Input
                    placeholder={`Cari ${searchKey} ${title}...`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="w-full md:max-w-sm"
                />
                {pathname.includes('user-mgmt') && (
                <>
                    <Select
                        value={selectedRole ?? ''}
                        onValueChange={(value) => setSelectedRole(value === '' ? null : value)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by Role" />
                        </SelectTrigger>
                        <SelectContent>

                            {roles?.map((role: any) => (
                                <SelectItem key={role.id} value={role.id}>
                                    {role.nama_role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </>
                )}
                {pathname.includes('user-mgmt') || pathname.includes('admin/data-izin') || pathname.includes('admin/data-presensi') ? (
                        <Select
                            value={selectedDivision ?? ''}
                            onValueChange={(value) => setSelectedDivision(value === '' ? null : value)}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Filter by Division" />
                            </SelectTrigger>
                            <SelectContent>

                                {divisions?.map((division: any) => (
                                    <SelectItem key={division.id} value={division.id}>
                                        {division.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                ) : (<> </>)}
                {pathname.includes('izin') || pathname.includes('presensi') ? (
                  <>
                    <Input
                        type="date"
                        value={selectedDate ?? ''}
                        onChange={(event) => setSelectedDate(event.target.value || null)}
                        className="w-40"
                    />
                    <Select
                          value={selectedStatus ?? ''}
                          onValueChange={(value) => setSelectedStatus(value === '' ? null : value)}
                      >
                          <SelectTrigger className="w-40">
                              <SelectValue placeholder="Filter by Status" />
                          </SelectTrigger>
                          <SelectContent>
                              {status?.map((status: any) => (
                                  <SelectItem key={status.id} value={status.id}>
                                      {status.nama}
                                  </SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                  </>
                ) : (<> </>)}
                {pathname.includes('master-status') && (
                    <Select
                        value={selectedGroupStatus ?? ''}
                        onValueChange={(value) => setSelectedGroupStatus(value === '' ? '' : value)}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by Group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Presensi">Presensi</SelectItem>
                            <SelectItem value="Izin">Izin</SelectItem>
                        </SelectContent>
                    </Select>
                )}

            </div>
            <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
                <Table className="relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-center" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="text-center items-center justify-center" key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
                <div className="flex w-full items-center justify-between">
                    {/* <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div> */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                        <div className="flex items-center space-x-2">
                            <p className="whitespace-nowrap text-sm font-medium">
                                Rows per page
                            </p>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue
                                        placeholder={table.getState().pagination.pageSize}
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {pageSizeOptions.map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            aria-label="Go to first page"
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                            aria-label="Go to previous page"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                            aria-label="Go to next page"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                            aria-label="Go to last page"
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
