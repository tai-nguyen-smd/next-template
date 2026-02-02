import { httpClient } from './http/http-client';

export interface MFAQRCodeResponse {
  qrCodeData: string;
  secret: string;
}

export interface VerifyMFARequest {
  otp: string;
}

export interface VerifyMFAResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * MFA Service
 * Handles all MFA-related API calls
 */
export class MFAService {
  /**
   * Get MFA QR code data
   */
  async getQRCode(): Promise<MFAQRCodeResponse> {
    return httpClient.get<MFAQRCodeResponse>('/mfa/qr-code');
  }

  /**
   * Verify MFA TOTP code
   */
  async verifyTOTP(request: VerifyMFARequest): Promise<VerifyMFAResponse> {
    return httpClient.post<VerifyMFAResponse>('/mfa/verify', request);
  }
}

// Export singleton instance
export const mfaService = new MFAService();
