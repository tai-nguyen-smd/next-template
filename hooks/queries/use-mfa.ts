import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {
  mfaService,
  type MFAQRCodeResponse,
  type VerifyMFARequest,
  type VerifyMFAResponse,
} from '@/services';

/**
 * Fetch MFA QR code data using TanStack Query
 */
export function useMFAQRCode() {
  return useQuery<MFAQRCodeResponse>({
    queryKey: ['mfa', 'qr-code'],
    queryFn: () => mfaService.getQRCode(),
    staleTime: 5 * 60 * 1000, // 5 minutes - QR code doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Mutation hook to verify MFA TOTP using TanStack Query
 */
export function useVerifyTOTP() {
  const queryClient = useQueryClient();

  return useMutation<VerifyMFAResponse, Error, VerifyMFARequest>({
    mutationFn: (request: VerifyMFARequest) => mfaService.verifyTOTP(request),
    onSuccess: () => {
      // Invalidate QR code query on successful verification
      queryClient.invalidateQueries({ queryKey: ['mfa', 'qr-code'] });
    },
  });
}
