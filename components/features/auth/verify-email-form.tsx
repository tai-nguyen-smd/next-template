'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
} from '@/components/ui/field';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';

const verifyEmailSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    console.log('Verify email data:', data);
    // Handle verify email logic here
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form form={form} schema={verifyEmailSchema} onSubmit={onSubmit}>
            <FieldGroup>
              <FormField
                name="code"
                label="Verification Code"
                type="text"
                placeholder="000000"
                required
                maxLength={6}
              />
              <FieldDescription>
                Check your email for the 6-digit verification code
              </FieldDescription>
              <Field>
                <Button type="submit">Verify Email</Button>
              </Field>
              <FieldDescription className="text-center">
                Didn't receive the code? <Link href="/auth/verify-email">Resend</Link>
              </FieldDescription>
              <FieldDescription className="text-center">
                <Link href="/auth/login">Back to Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
