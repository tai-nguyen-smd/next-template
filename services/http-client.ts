/**
 * Base HTTP Client for making REST API calls
 * Provides a centralized way to handle API requests with error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for default headers
    this.axiosInstance.interceptors.request.use(config => {
      const defaultHeaders = this.getDefaultHeaders();
      Object.keys(defaultHeaders).forEach(key => {
        config.headers.set(key, defaultHeaders[key]);
      });
      return config;
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        return Promise.reject(this.handleAxiosError(error));
      }
    );
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, options);
    return response.data;
  }

  /**
   * Make a POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, options);
    return response.data;
  }

  /**
   * Make a PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, options);
    return response.data;
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, options);
    return response.data;
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, options);
    return response.data;
  }

  /**
   * Get default headers
   */
  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    // Add authorization header if token exists
    // const token = getAuthToken();
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`;
    // }

    return headers;
  }

  /**
   * Handle axios error response
   */
  private handleAxiosError(error: AxiosError): Error {
    let errorData: ApiError;

    if (error.response) {
      // Server responded with error status
      const statusCode = error.response.status;
      const responseData = error.response.data;

      if (
        typeof responseData === 'object' &&
        responseData !== null &&
        'error' in responseData
      ) {
        errorData = responseData as ApiError;
      } else {
        errorData = {
          error: `HTTP ${statusCode}: ${error.response.statusText || 'Request failed'}`,
          statusCode,
        };
      }
    } else if (error.request) {
      // Request was made but no response received
      errorData = {
        error: 'Network error: No response received from server',
      };
    } else {
      // Something else happened
      errorData = {
        error: error.message || 'An unexpected error occurred',
      };
    }

    const errorMessage = new Error(errorData.error || 'Request failed');
    (errorMessage as Error & { statusCode?: number }).statusCode =
      errorData.statusCode || error.response?.status;
    return errorMessage;
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
