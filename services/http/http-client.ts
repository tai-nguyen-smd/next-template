/**
 * Base HTTP Client for making REST API calls
 * Provides a centralized way to handle API requests with error handling
 */

import axiosInstance from '@/services/http/axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosInstance;
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

  async postForm<T>(
    endpoint: string,
    data?: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.postForm<T>(endpoint, data, options);
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
}

// Export singleton instance
export const httpClient = new HttpClient();
