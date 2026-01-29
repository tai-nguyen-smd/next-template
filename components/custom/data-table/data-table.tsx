'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LayoutGridIcon,
  PlusIcon,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];

  // Search
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  // Row selection
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;

  // Pagination
  enablePagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];

  // Features
  enableSorting?: boolean;
  enableColumnVisibility?: boolean;

  // Toolbar actions
  actions?: React.ReactNode;
  showCustomizeColumns?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;

  // Row actions
  rowActions?: (row: TData) => React.ReactNode;

  // Misc
  emptyMessage?: string;
  className?: string;
  getRowId?: (row: TData, index: number) => string;
}

export function DataTable<TData>({
  data,
  columns,
  searchValue,
  searchPlaceholder = 'Search...',
  onSearchChange,
  enableRowSelection = false,
  onRowSelectionChange,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  enableSorting = true,
  enableColumnVisibility = true,
  actions,
  showCustomizeColumns = true,
  showAddButton = false,
  addButtonLabel = 'Add',
  onAddClick,
  rowActions,
  emptyMessage = 'No results.',
  className,
  getRowId,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    {}
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState(searchValue ?? '');
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  React.useEffect(() => {
    if (searchValue !== undefined) {
      setGlobalFilter(searchValue);
    }
  }, [searchValue]);

  const tableColumns = React.useMemo<ColumnDef<TData>[]>(() => {
    if (!enableRowSelection) return columns;

    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={v => row.toggleSelected(!!v)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columns,
    ];
  }, [columns, enableRowSelection]);

  const finalColumns = React.useMemo<ColumnDef<TData>[]>(() => {
    if (!rowActions) return tableColumns;

    return [
      ...tableColumns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => rowActions(row.original),
      },
    ];
  }, [tableColumns, rowActions]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnVisibility: enableColumnVisibility ? columnVisibility : undefined,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      globalFilter,
      pagination: enablePagination ? pagination : undefined,
    },
    getRowId: getRowId ?? ((_, i) => String(i)),
    enableRowSelection,
    onRowSelectionChange: updater => {
      const next = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(next);

      if (onRowSelectionChange) {
        const selected = table
          .getRowModel()
          .rows.filter(r => r.getIsSelected())
          .map(r => r.original);
        onRowSelectionChange(selected);
      }
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    onPaginationChange: enablePagination ? setPagination : undefined,
    onGlobalFilterChange: value => {
      setGlobalFilter(String(value));
      onSearchChange?.(String(value));
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
  });

  return (
    <div className={cn('flex w-full flex-col gap-4 px-4', className)}>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        {onSearchChange && (
          <div className="relative w-full lg:max-w-sm">
            <Search className="text-muted-foreground absolute top-2.5 left-2 size-4" />
            <Input
              value={globalFilter}
              onChange={e => table.setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-8"
            />
          </div>
        )}

        {/* Actions */}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {enableColumnVisibility && showCustomizeColumns && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <LayoutGridIcon />
                  <span className="hidden lg:inline">Columns</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(c => typeof c.accessorFn !== 'undefined' && c.getCanHide())
                  .map(column => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={v => column.toggleVisibility(!!v)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {actions}

          {showAddButton && (
            <Button size="sm" onClick={onAddClick}>
              <PlusIcon />
              <span className="hidden lg:inline">{addButtonLabel}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(group => (
              <TableRow key={group.id}>
                {group.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex flex-col gap-3 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="text-muted-foreground hidden text-sm lg:block">
            {enableRowSelection &&
              `${table.getFilteredSelectedRowModel().rows.length} of ${
                table.getFilteredRowModel().rows.length
              } selected`}
          </div>

          <div className="flex items-center gap-4">
            <Label className="hidden lg:block">Rows per page</Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={v => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="w-20" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map(size => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>

            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
