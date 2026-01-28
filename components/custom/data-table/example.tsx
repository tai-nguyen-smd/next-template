/**
 * Example usage of DataTable component
 * This file demonstrates how to use the generic DataTable component
 */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVerticalIcon } from 'lucide-react';
import { DataTable } from './data-table';

// Example data type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

// Example data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
  },
];

// Example columns definition
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },
];

// Example row actions
const renderRowActions = (row: User) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="size-8" size="icon">
        <MoreVerticalIcon />
        <span className="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>View Details</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Example usage
export function ExampleDataTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      enableRowSelection
      enablePagination
      pageSize={10}
      showCustomizeColumns
      showAddButton
      addButtonLabel="Add User"
      onAddClick={() => console.log('Add user clicked')}
      rowActions={renderRowActions}
      getRowId={row => row.id}
      onRowSelectionChange={selectedRows => {
        console.log('Selected rows:', selectedRows);
      }}
    />
  );
}

// Example with tabs
export function ExampleDataTableWithTabs() {
  return (
    <DataTable
      data={users}
      columns={columns}
      enableRowSelection
      enablePagination
      tabs={[
        { value: 'all', label: 'All Users', badge: users.length },
        {
          value: 'active',
          label: 'Active',
          badge: users.filter(u => u.status === 'active').length,
        },
        {
          value: 'inactive',
          label: 'Inactive',
          badge: users.filter(u => u.status === 'inactive').length,
        },
      ]}
      defaultTab="all"
      showCustomizeColumns
      showAddButton
      addButtonLabel="Add User"
      rowActions={renderRowActions}
      getRowId={row => row.id}
    />
  );
}

// Example minimal usage
export function ExampleMinimalDataTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      enablePagination={false}
      enableRowSelection={false}
      showCustomizeColumns={false}
      showAddButton={false}
      getRowId={row => row.id}
    />
  );
}
