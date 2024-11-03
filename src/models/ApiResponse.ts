// src/interfaces/ApiResponse.ts
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error: string;
  }