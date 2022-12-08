import { HttpHeader } from 'httpHeaders';
import { HttpMethod } from 'httpMethods';
import { HttpStatusCode } from 'httpStatusCodes';

declare global {
	interface Headers {
		append(name: HttpHeader, value: string): void;
		delete(name: HttpHeader): void;
		get(name: HttpHeader): string | null;
		has(name: HttpHeader): boolean;
		set(name: HttpHeader, value: string): void;
		keys(): IterableIterator<Lowercase<HttpHeader>>;
		values(): IterableIterator<string>;
	}

	interface RequestInit {
		method: HttpMethod;
	}

	interface Response {
		readonly status: HttpStatusCode;
	}
}
