'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import AuthCard from '@/components/features/auth/auth-card';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log('Reset password data:', data);
    // Handle reset password logic here
  };

  return (
    <AuthCard title="Reset Password" description="Enter your new password below">
      <Form form={form} schema={resetPasswordSchema} onSubmit={onSubmit}>
        <FieldGroup>
          <FormField
            name="password"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            required
          />
          <FormField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            required
          />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          <Field>
            <Button type="submit">Reset Password</Button>
          </Field>
          <FieldDescription className="text-center">
            <Link href="/auth/login">Back to Sign in</Link>
          </FieldDescription>
        </FieldGroup>
      </Form>
    </AuthCard>
  );
}
