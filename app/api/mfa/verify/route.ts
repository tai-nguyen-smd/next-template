import { NextResponse } from 'next/server';

/**
 * Verify MFA OTP
 * This endpoint verifies the OTP code entered by the user
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { otp } = body;

    if (!otp || typeof otp !== 'string' || otp.length !== 6) {
      return NextResponse.json({ error: 'Invalid OTP format' }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Get the user's secret from the database
    // 2. Verify the OTP using a library like 'otplib'
    // 3. If valid, mark MFA as enabled for the user
    // 4. Return success response

    // For demo purposes, we'll do a simple validation
    // In production, use: import { authenticator } from 'otplib'; authenticator.verify({ token: otp, secret: userSecret });
    const isValid = verifyOTP(otp);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid OTP code', success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'MFA setup completed successfully',
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}

/**
 * Mock OTP verification
 * In production, use a proper library like 'otplib' to verify TOTP codes
 */
function verifyOTP(otp: string): boolean {
  // This is a mock verification for demonstration
  // In production, use: import { authenticator } from 'otplib';
  // return authenticator.verify({ token: otp, secret: storedSecret });

  // For demo, accept any 6-digit code (you should replace this with real verification)
  const randomTrueFalse = Math.random() < 0.5;
  return randomTrueFalse;
}
