import type React from 'react';
import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

import type { z } from 'zod';

export interface BaseFormFieldProps {
  readonly name: string;
  readonly label: string;
  readonly required?: boolean;
  readonly className?: string;
}

export interface TextFormFieldProps extends BaseFormFieldProps {
  readonly type: 'text' | 'email' | 'password';
  readonly placeholder?: string;
  readonly inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  readonly defaultValue?: string;
  readonly disabled?: boolean;
}

export interface TextAreaFormFieldProps extends BaseFormFieldProps {
  readonly type: 'textarea';
  readonly placeholder?: string;
  readonly inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface SelectFormFieldProps extends BaseFormFieldProps {
  readonly type: 'select';
  readonly placeholder?: string;
  readonly options: readonly { label: string; value: string }[];
  readonly selectProps?: {
    readonly disabled?: boolean;
    readonly [key: string]: unknown;
  };
  readonly defaultValue?: string;
  readonly disabled?: boolean;
}

export interface NumberFormFieldProps extends BaseFormFieldProps {
  readonly type: 'number';
  readonly placeholder?: string;
  readonly prefix?: string;
  readonly disabled?: boolean;
  readonly inputNumberProps?: React.InputHTMLAttributes<HTMLInputElement>;
  readonly style?: React.CSSProperties;
}

export interface DateFormFieldProps extends BaseFormFieldProps {
  readonly type: 'date';
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly datePickerProps?: {
    readonly disabled?: boolean;
    readonly [key: string]: unknown;
  };
  readonly format?: string;
  readonly style?: React.CSSProperties;
}

export interface CheckboxFormFieldProps extends BaseFormFieldProps {
  readonly type: 'checkbox';
  readonly options: readonly { label: string; value: string }[];
  readonly layout?: 'vertical' | 'horizontal';
  readonly disabled?: boolean;
}

export interface RadioFormFieldProps extends BaseFormFieldProps {
  readonly type: 'radio';
  readonly options: readonly { label: string; value: string }[];
  readonly layout?: 'vertical' | 'horizontal';
  readonly disabled?: boolean;
}

export interface SwitchFormFieldProps extends BaseFormFieldProps {
  readonly type: 'switch';
  readonly disabled?: boolean;
  readonly defaultValue?: boolean;
}

export interface DateRangeFormFieldProps extends BaseFormFieldProps {
  readonly type: 'date-range';
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly dateRangePickerProps?: {
    readonly disabled?: boolean;
    readonly [key: string]: unknown;
  };
  readonly format?: string;
  readonly style?: React.CSSProperties;
}

export type FormFieldProps =
  | TextFormFieldProps
  | TextAreaFormFieldProps
  | SelectFormFieldProps
  | NumberFormFieldProps
  | DateFormFieldProps
  | DateRangeFormFieldProps
  | CheckboxFormFieldProps
  | RadioFormFieldProps
  | SwitchFormFieldProps;

export interface FormProps<T extends FieldValues = FieldValues> extends Omit<
  UseFormProps<T>,
  'resolver' | 'defaultValues'
> {
  readonly schema: z.ZodSchema<T>;
  readonly onSubmit: (data: T) => void | Promise<void>;
  readonly children: React.ReactNode;
  readonly defaultValues?: Partial<T>;
  readonly className?: string;
  readonly layout?: 'vertical' | 'horizontal' | 'inline';
  readonly form: UseFormReturn<T>;
}
