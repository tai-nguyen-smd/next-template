'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import { PasswordRequirements } from '@/components/features/auth/password-requirement';
import AuthCard from '@/components/features/auth/auth-card';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(12, 'Password must be at least 12 characters')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const newPassword = useWatch({
    control: form.control,
    name: 'newPassword',
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    console.log('Change password data:', data);
    // Handle change password logic here
  };

  return (
    <AuthCard
      title="Change Password"
      description="Update your password to keep your account secure"
    >
      <Form form={form} schema={changePasswordSchema} onSubmit={onSubmit}>
        <FieldGroup className="gap-4">
          <FormField
            name="currentPassword"
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            required
          />
          <FormField
            name="newPassword"
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
          {form.formState.isDirty && <PasswordRequirements value={newPassword} />}
          <Field>
            <Button type="submit">Change Password</Button>
          </Field>
          <FieldDescription className="text-center">
            <Link href="/dashboard">Back to Dashboard</Link>
          </FieldDescription>
        </FieldGroup>
      </Form>
    </AuthCard>
  );
}
