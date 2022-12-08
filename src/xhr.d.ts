import { HttpRequestHeader, HttpResponseHeader } from 'headers';
import { HttpMethod } from 'httpMethods';

declare global {
	interface XmlHttpRequest {
		getResponseHeader(header: HttpResponseHeader): string|null;
		getAllResponseHeaders(): HttpResponseHeader[]; 
		open(method: HttpMethod, url: string): void;
		setRequestHeader(header: HttpRequestHeader, value: string): void;
	}
}
