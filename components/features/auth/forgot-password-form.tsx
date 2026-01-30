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

const forgotPasswordSchema = z.object({
  email: z.email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log('Forgot password data:', data);
    // Handle forgot password logic here
  };

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email address and we'll send you a link to reset your password"
    >
      <Form form={form} schema={forgotPasswordSchema} onSubmit={onSubmit}>
        <FieldGroup>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
            required
          />
          <Field>
            <Button type="submit">Send Reset Link</Button>
          </Field>
          <FieldDescription className="text-center">
            Remember your password? <Link href="/auth/login">Sign in</Link>
          </FieldDescription>
        </FieldGroup>
      </Form>
    </AuthCard>
  );
}
