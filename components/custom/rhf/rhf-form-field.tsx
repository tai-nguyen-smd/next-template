'use client';

import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';

import type {
  CheckboxFormFieldProps,
  DateFormFieldProps,
  FormFieldProps,
  NumberFormFieldProps,
  RadioFormFieldProps,
  SelectFormFieldProps,
} from '@/components/custom/rhf/types';

/**
 * DatePicker component with calendar popup
 */
function DatePickerField({
  value,
  onChange,
  onBlur,
  placeholder,
  format: dateFormat,
  disabled,
  error,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  error?: boolean;
}): React.ReactElement {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateFormatStr = dateFormat || 'yyyy-MM-dd';
  const dateValue = value ? new Date(value as string) : undefined;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCalendarOpen && !target.closest('.date-picker-container')) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCalendarOpen]);

  return (
    <div className="date-picker-container relative w-full">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        disabled={disabled}
        onBlur={onBlur}
        className={cn(
          'w-full justify-start text-left font-normal',
          !dateValue && 'text-muted-foreground'
        )}
        aria-invalid={error ? 'true' : 'false'}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {dateValue ? (
          format(dateValue, dateFormatStr)
        ) : (
          <span>{placeholder || 'Pick a date'}</span>
        )}
      </Button>
      {isCalendarOpen && (
        <div className="bg-popover absolute z-50 mt-1 rounded-md border shadow-md">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={date => {
              onChange(date ? format(date, dateFormatStr) : null);
              setIsCalendarOpen(false);
            }}
            disabled={disabled}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

/**
 * Reusable form field component with consistent styling and validation
 * Uses React Hook Form Controller to integrate with shadcn components
 */
export function FormField(props: FormFieldProps): React.ReactElement {
  const {
    name,
    label,
    required = false,
    className = 'w-full md:w-[calc(50%-0.5rem)]',
  } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  const renderInput = (fieldProps: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  }): React.ReactElement => {
    if (
      props.type === 'text' ||
      props.type === 'email' ||
      props.type === 'password'
    ) {
      return (
        <Input
          value={fieldProps.value as string}
          onChange={e => fieldProps.onChange(e.target.value)}
          onBlur={fieldProps.onBlur}
          placeholder={props.placeholder}
          disabled={props.disabled}
          type={props.type}
          aria-invalid={error ? 'true' : 'false'}
          {...(props.inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      );
    }
    if (props.type === 'textarea') {
      return (
        <Textarea
          value={fieldProps.value as string}
          onChange={e => fieldProps.onChange(e.target.value)}
          onBlur={fieldProps.onBlur}
          placeholder={props.placeholder}
          rows={4}
          aria-invalid={error ? 'true' : 'false'}
          {...(props.inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      );
    }
    if (props.type === 'select') {
      const selectProps = props as SelectFormFieldProps;
      return (
        <Select
          value={fieldProps.value as string | undefined}
          onValueChange={fieldProps.onChange}
          disabled={selectProps.disabled}
        >
          <SelectTrigger className="w-full" aria-invalid={error ? 'true' : 'false'}>
            <SelectValue
              placeholder={
                selectProps.placeholder || `Select ${label.toLowerCase()}`
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectProps.options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    if (props.type === 'number') {
      const numberProps = props as NumberFormFieldProps;
      return (
        <div className="relative w-full">
          {numberProps.prefix && (
            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              {numberProps.prefix}
            </span>
          )}
          <Input
            type="number"
            value={fieldProps.value as number | undefined}
            onChange={e =>
              fieldProps.onChange(e.target.value ? Number(e.target.value) : null)
            }
            onBlur={fieldProps.onBlur}
            placeholder={numberProps.placeholder}
            disabled={numberProps.disabled}
            className={numberProps.prefix ? 'pl-8' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            {...(numberProps.inputNumberProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        </div>
      );
    }
    if (props.type === 'date') {
      const dateProps = props as DateFormFieldProps;
      return (
        <DatePickerField
          value={fieldProps.value}
          onChange={fieldProps.onChange}
          onBlur={fieldProps.onBlur}
          placeholder={dateProps.placeholder}
          format={dateProps.format}
          disabled={dateProps.disabled}
          error={!!error}
        />
      );
    }
    if (props.type === 'checkbox') {
      const checkboxProps = props as CheckboxFormFieldProps;
      const currentValue = Array.isArray(fieldProps.value) ? fieldProps.value : [];

      return (
        <div
          className={cn(
            'flex gap-2',
            checkboxProps.layout === 'vertical' ? 'flex-col' : 'flex-row'
          )}
        >
          {checkboxProps.options.map(option => {
            const isChecked = currentValue.includes(option.value);
            return (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${name}-${option.value}`}
                  checked={isChecked}
                  onCheckedChange={checked => {
                    if (checked) {
                      fieldProps.onChange([...currentValue, option.value]);
                    } else {
                      fieldProps.onChange(
                        currentValue.filter((v: string) => v !== option.value)
                      );
                    }
                  }}
                  disabled={checkboxProps.disabled}
                  aria-invalid={error ? 'true' : 'false'}
                />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {option.label}
                </Label>
              </div>
            );
          })}
        </div>
      );
    }
    // props.type === 'radio'
    const radioProps = props as RadioFormFieldProps;
    return (
      <RadioGroup
        value={fieldProps.value as string | undefined}
        onValueChange={fieldProps.onChange}
        disabled={radioProps.disabled}
        className={cn(radioProps.layout === 'horizontal' && 'flex-row')}
        aria-invalid={error ? 'true' : 'false'}
      >
        {radioProps.options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="cursor-pointer text-sm font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const getDefaultValue = (): unknown => {
    if (props.type === 'select') return undefined;
    if (props.type === 'number') return undefined;
    if (props.type === 'date') return undefined;
    if (props.type === 'checkbox') return [];
    if (props.type === 'radio') return undefined;
    return '';
  };

  return (
    <Field
      orientation="responsive"
      data-invalid={error ? 'true' : 'false'}
      className={cn(className)}
      style={
        props.type === 'number' || props.type === 'date'
          ? (props as NumberFormFieldProps | DateFormFieldProps).style
          : undefined
      }
    >
      <FieldLabel>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </FieldLabel>
      <FieldContent>
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            renderInput({
              value: field.value ?? getDefaultValue(),
              onChange: field.onChange,
              onBlur: field.onBlur,
            })
          }
        />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </FieldContent>
    </Field>
  );
}
