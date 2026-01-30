'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import AuthCard from './auth-card';
import { Field, FieldGroup } from '@/components/ui/field';
import Image from 'next/image';
import GooglePlayBadge from '@/public/images/google-play-badge.png';
import Link from 'next/link';
import AppStoreBadge from '@/public/images/apple-store-badge.png';
import QRCode from '@/public/images/qr-code.png';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

// Zod schema for MFA validation
const mfaSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type MFAFormData = z.infer<typeof mfaSchema>;

export function MFAForm() {
  const form = useForm<MFAFormData>({
    resolver: zodResolver(mfaSchema),
    mode: 'onChange',
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data: MFAFormData) => {
    console.log('[v0] MFA submitted with OTP:', data.otp);
    // Handle MFA submission
  };

  return (
    <AuthCard
      title="Multi-Factor Authentication (MFA)"
      description="To complete your registration, please ensure you finish the Multi-Factor Authentication (MFA) process."
    >
      {/* Info Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertDescription className="text-sm text-gray-700">
          To complete your registration, please ensure you finish the Multi-Factor
          Authentication (MFA) process.
        </AlertDescription>
      </Alert>

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
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-300 font-semibold text-gray-900">
                2
              </div>
              <Typography variant="h3">Scan QR Code</Typography>
            </div>

            <div className="border-border w-fit rounded-sm border bg-white p-2">
              <Image src={QRCode} alt="QR Code" width={100} height={100} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 3: Enter OTP */}
      <Card>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-300 font-semibold text-gray-900">
              2
            </div>
            <Typography variant="h3">Enter Digit Code</Typography>
          </div>

          <Typography variant="p">
            Please enter 6-digit OTP from the authentication app
          </Typography>

          <Form
            form={form}
            schema={mfaSchema}
            onSubmit={onSubmit}
            className="mx-auto"
          >
            <FormField
              name="otp"
              label="Enter OTP"
              type="otp"
              maxLength={6}
              required
              className="mx-auto"
            />
            <Button type="submit" disabled={!form.formState.isValid}>
              Log in
            </Button>
          </Form>
        </CardContent>
      </Card>
    </AuthCard>
  );
}
