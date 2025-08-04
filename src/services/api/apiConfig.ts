// Configuración base para la API
export const API_CONFIG = {
  baseURL: 'https://ed90mas1-back-efdec0a3crfpdkcz.centralus-01.azurewebsites.net/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Tipos de respuesta de la API
export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  timestamp: string
  statusCode: number
}

// Tipos de error de la API
export interface ApiError {
  success: false
  message: string
  timestamp: string
  statusCode: number
  error?: string
}

// Cliente HTTP base
export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(
    baseURL: string = API_CONFIG.baseURL,
    headers: Record<string, string> = API_CONFIG.headers,
  ) {
    this.baseURL = baseURL
    this.defaultHeaders = headers
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    // Obtener token del localStorage si existe
    const token = localStorage.getItem('authToken')

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async put<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient()
