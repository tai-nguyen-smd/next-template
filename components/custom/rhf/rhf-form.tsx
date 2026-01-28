'use client';

import React from 'react';
import type { FieldValues } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormProps } from '@/components/custom/rhf/types';

/**
 * Form wrapper component that integrates React Hook Form with shadcn components
 * Uses Zod schema for validation
 */
export function Form<T extends FieldValues = FieldValues>({
  onSubmit,
  children,
  className,
  layout = 'vertical',
  form,
}: Readonly<FormProps<T>>): React.ReactElement {
  const handleSubmit = form.handleSubmit(async (data: FieldValues) => {
    await onSubmit(data as T);
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <FormProvider {...(form as any)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex flex-col gap-6',
          layout === 'horizontal' && 'flex-row items-start',
          layout === 'inline' && 'inline-flex',
          className
        )}
      >
        {children}
      </form>
    </FormProvider>
  );
}
