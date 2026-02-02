'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/custom/rhf/rhf-form';
import AuthCard from '@/components/features/auth/auth-card';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import { AlertMessage } from '@/components/custom/alert-message/alert-message';
import { useVerifyTOTP } from '@/hooks/queries/use-mfa';

const otpSchema = z.object({
  otp: z
    .string()
    .length(
      6,
      'Invalid or expired code. Please enter the current 6-digit code from your authenticator app.'
    )
    .regex(
      /^\d{6}$/,
      'Invalid or expired code. Please enter the current 6-digit code from your authenticator app.'
    ),
});

type OTPFormData = z.infer<typeof otpSchema>;

export function OTPForm() {
  const router = useRouter();
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const verifyMutation = useVerifyTOTP();

  const onSubmit = async (data: OTPFormData) => {
    try {
      const result = await verifyMutation.mutateAsync({ otp: data.otp });
      if (result.success) {
        // Redirect to success page or login
        // You can customize this redirect based on your flow
        router.push('/dashboard');
      }
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to verify OTP:', error);
    }
  };

  return (
    <AuthCard
      title="Enter verification code"
      description="We sent a 6-digit code to your email."
    >
      {verifyMutation.isError && (
        <AlertMessage
          message="Invalid or expired code. Please enter the current 6-digit code from your email."
          variant="destructive"
        />
      )}

      <Form form={form} schema={otpSchema} onSubmit={onSubmit}>
        <FormField name="otp" label="Enter OTP" type="otp" maxLength={6} required />
        <Button
          type="submit"
          disabled={!form.formState.isValid || verifyMutation.isPending}
        >
          {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
        </Button>
      </Form>
    </AuthCard>
  );
}
