'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import AuthCard from './auth-card';
import Image from 'next/image';
import GooglePlayBadge from '@/public/images/google-play-badge.png';
import Link from 'next/link';
import AppStoreBadge from '@/public/images/apple-store-badge.png';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useMFAQRCode, useVerifyMFA } from '@/hooks/queries/use-mfa';
import { AlertMessage } from '@/components/custom/alert-message/alert-message';

// Zod schema for MFA validation
const mfaSchema = z.object({
  otp: z
    .string()
    .length(
      6,
      'Invalid or expired code. Please enter the current 6-digit code from your authenticator app.'
    ),
});

type MFAFormData = z.infer<typeof mfaSchema>;

export function MFAForm() {
  const [isVerified, setIsVerified] = useState(false);
  const form = useForm<MFAFormData>({
    resolver: zodResolver(mfaSchema),
    mode: 'onChange',
    defaultValues: {
      otp: '',
    },
  });

  const { data: qrCodeData, isLoading, isError } = useMFAQRCode();
  const verifyMutation = useVerifyMFA();

  const onSubmit = async (data: MFAFormData) => {
    try {
      const result = await verifyMutation.mutateAsync({ otp: data.otp });
      if (result.success) {
        setIsVerified(true);
        form.reset();
      }
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to verify OTP:', error);
    }
  };

  return (
    <AuthCard
      title="Multi-Factor Authentication (MFA)"
      description="To complete your registration, please ensure you finish the Multi-Factor Authentication (MFA) process."
    >
      {/* Info Alert */}
      <AlertMessage
        message="To complete your registration, please ensure you finish the Multi-Factor Authentication (MFA) process."
        variant="info"
      />

      {/* Step 1: Download App and Step 2: Scan QR Code */}
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Step 1: Download App */}
        <Card>
          <CardContent>
            <div className="flex gap-2">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold">
                1
              </div>
              <Typography variant="h3">Download Authentication App</Typography>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">
                  Download Google Authenticator or similar app from App Store or
                  Google Play
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-opacity hover:opacity-80"
                >
                  <Image
                    src={GooglePlayBadge}
                    alt="Get it on Google Play"
                    className="h-8 w-auto"
                    width={100}
                    height={32}
                    priority={false}
                  />
                </Link>
                <Link
                  href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-opacity hover:opacity-80"
                >
                  <Image
                    src={AppStoreBadge}
                    alt="Download on the App Store"
                    className="h-8 w-auto"
                    width={100}
                    height={32}
                    priority={false}
                  />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Scan QR Code */}
        <Card className="md:w-[50%]">
          <CardContent>
            <div className="flex gap-2">
              <div className="text-primary-foreground bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold">
                2
              </div>
              <Typography variant="h3">Scan QR Code</Typography>
            </div>

            <div className="border-border flex w-fit items-center justify-center rounded-sm border bg-white p-2">
              {isLoading ? (
                <div className="flex h-32 w-32 items-center justify-center">
                  <div className="text-muted-foreground text-sm">Loading...</div>
                </div>
              ) : isError ? (
                <div className="flex h-32 w-32 items-center justify-center">
                  <div className="text-destructive text-sm">
                    Failed to load QR code
                  </div>
                </div>
              ) : qrCodeData?.qrCodeData ? (
                <QRCodeSVG
                  value={qrCodeData.qrCodeData}
                  size={128}
                  level="M"
                  marginSize={0}
                  className="rounded-sm"
                />
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 3: Enter OTP */}
      <Card>
        <CardContent>
          <div className="flex gap-2">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold">
              3
            </div>
            <Typography variant="h3">Enter Digit Code</Typography>
          </div>

          {isVerified ? (
            <div className="mt-4 flex flex-col gap-4">
              <AlertMessage
                message="MFA has been successfully set up! Your account is now protected with two-factor authentication."
                variant="success"
              />
              <Button
                onClick={() => {
                  setIsVerified(false);
                  form.reset();
                }}
                variant="outline"
              >
                Set up another device
              </Button>
            </div>
          ) : (
            <>
              <Typography variant="p">
                Please enter 6-digit OTP from the authentication app to verify and
                complete the setup
              </Typography>

              {verifyMutation.isError && (
                <AlertMessage
                  message={
                    verifyMutation.error?.message ||
                    'Failed to verify OTP. Please try again.'
                  }
                  variant="destructive"
                />
              )}

              <Form form={form} schema={mfaSchema} onSubmit={onSubmit}>
                <FormField
                  name="otp"
                  label="Enter OTP"
                  type="otp"
                  maxLength={6}
                  required
                />
                <Button
                  type="submit"
                  disabled={!form.formState.isValid || verifyMutation.isPending}
                >
                  {verifyMutation.isPending
                    ? 'Verifying...'
                    : 'Verify & Complete Setup'}
                </Button>
              </Form>
            </>
          )}
        </CardContent>
      </Card>
    </AuthCard>
  );
}
