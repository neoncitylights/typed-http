import { HttpHeader } from 'httpHeaders';

declare global {
	class Headers {
		append(name: HttpHeader, value: string): void;
		delete(name: HttpHeader): void;
		get(name: HttpHeader): string | null;
		has(name: HttpHeader): boolean;
		set(name: HttpHeader, value: string): void;
		keys(): IterableIterator<Lowercase<HttpHeader>>;
		values(): IterableIterator<string>;
	}

	function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}
