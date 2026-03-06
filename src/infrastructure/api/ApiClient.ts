import { API_BASE_URL } from "./apiConfig"

export class ApiClient {

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

}

