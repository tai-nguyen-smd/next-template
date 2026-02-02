import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

interface VerifyMFARequest {
  otp: string;
}

interface VerifyMFAResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface MFAQRCodeResponse {
  qrCodeData: string;
  secret: string;
}

/**
 * Fetch MFA QR code data using TanStack Query
 */
export function useMFAQRCode() {
  return useQuery<MFAQRCodeResponse>({
    queryKey: ['mfa', 'qr-code'],
    queryFn: async () => {
      const response = await fetch('/api/mfa/qr-code');
      if (!response.ok) {
        throw new Error('Failed to fetch QR code data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - QR code doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Mutation hook to verify MFA OTP using TanStack Query
 */
export function useVerifyMFA() {
  const queryClient = useQueryClient();

  return useMutation<VerifyMFAResponse, Error, VerifyMFARequest>({
    mutationFn: async ({ otp }: VerifyMFARequest) => {
      const response = await fetch('/api/mfa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to verify OTP');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate QR code query on successful verification
      queryClient.invalidateQueries({ queryKey: ['mfa', 'qr-code'] });
    },
  });
}
