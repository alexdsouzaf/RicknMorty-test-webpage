import { Injectable, signal } from "@angular/core";

// * Service generico de requisicoes http
@Injectable({ providedIn: 'root' })
export class RequestService {

    urlBase = signal('https://rickandmortyapi.com/api')

	private defaultHeaders: HeadersInit = {
		"Content-Type": "application/json",
	}

	private async request<T>(endpoint: string, method: string, body?: any, customHeader?: HeadersInit) {
		const url = `${this.urlBase()}${endpoint}`
		const headers = { ...this.defaultHeaders, ...customHeader }

		const options: RequestInit = {
			method,
			headers,
			body: body ? JSON.stringify({ registro: body }) : undefined
		}

		try {
			const response = await fetch(url, options)
			if (!response.ok) {
				throw new Error(`Erro ${response.status}: ${response.statusText}`)
			}
			return (await response.json() as T)
		} catch (error) {
			console.error("Erro na requisição:", error)
			throw error;
		}
	}

	get<T>(endpoint: string, headers?: HeadersInit) {
		return this.request<T>(endpoint, "GET", undefined, headers);
	}

	post<T>(endpoint: string, body: any, headers?: HeadersInit) {
		return this.request<T>(endpoint, "POST", body, headers);
	}

	put<T>(endpoint: string, body: any, headers?: HeadersInit) {
		return this.request<T>(endpoint, "PUT", body, headers);
	}

	delete<T>(endpoint: string, headers?: HeadersInit) {
		return this.request<T>(endpoint, "DELETE", undefined, headers);
	}

}

