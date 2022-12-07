import { HttpHeader, HttpRequestHeader, HttpResponseHeader } from 'httpHeaders';

module 'http' {
	interface ServerResponse {
		getHeader(name: HttpResponseHeader): string | number | string[] | undefined;
		getHeaderNames(): Lowercase<HttpResponseHeader>[];
		getHeaders(): OutgoingHttpHeaders;
		hasHeader(name: HttpResponseHeader): boolean;
		removeHeader(name: HttpResponseHeader): void;
		setHeader(name: HttpResponseHeader, value: number | string | string[]): void;
	}

	interface ClientRequest {
		getHeader(name: HttpRequestHeader): string | number | string[] | undefined;
		getHeaderNames(): Lowercase<HttpRequestHeader>[];
		getHeaders(): OutgoingHttpHeaders;
		getRawHeaderNames(): HttpRequestHeader[];
		hasHeader(name: HttpRequestHeader): boolean;
		removeHeader(name: HttpRequestHeader): void;
		setHeader(name: HttpRequestHeader, value: number | string | string[]): void;
	}

	interface IncomingMessage {
		headers: { [key: HttpHeader]: string; };
	}

	interface OutgoingMessage {
		getHeader(name: HttpHeader): string | number | string[] | undefined;
		getHeaderNames(): Lowercase<HttpHeader>[];
		getHeaders(): OutgoingHttpHeaders;
		hasHeader(name: HttpHeader): boolean;
		removeHeader(name: HttpHeader): void;
		setHeader(name: HttpHeader, value: number | string | string[]): void;
	}
}
