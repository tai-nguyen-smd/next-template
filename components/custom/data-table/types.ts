import type { ColumnDefBase } from '@tanstack/react-table';

export interface DataTableColumn<TData> extends ColumnDefBase<TData> {
  id: string;
}

export interface DataTableTab {
  value: string;
  label: string;
  badge?: number | string;
  content?: React.ReactNode;
}

export interface DataTableAction<TData> {
  label: string;
  onClick: (row: TData) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}
