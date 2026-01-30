'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import AuthCard from '@/components/features/auth/auth-card';
import { PasswordRequirements } from '@/components/features/auth/password-requirement';

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(12, 'Password must be at least 12 characters')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useWatch({
    control: form.control,
    name: 'password',
  });
  const onSubmit = async (data: SignupFormData) => {
    console.log('Signup data:', data);
    // Handle signup logic here
  };

  return (
    <AuthCard
      title="Create your account"
      description="Enter your email below to create your account"
    >
      <Form form={form} schema={signupSchema} onSubmit={onSubmit}>
        <FieldGroup>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
            required
          />

          <Field>
            <FieldGroup>
              <FormField name="password" label="Password" type="password" required />
              <FormField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
              />
            </FieldGroup>
            <PasswordRequirements value={password} />
          </Field>
          <Field>
            <Button type="submit">Create Account</Button>
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <Field>
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Sign up with Google</span>
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </FieldDescription>
        </FieldGroup>
      </Form>
    </AuthCard>
  );
}
