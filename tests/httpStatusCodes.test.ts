import { expectTypeOf, test } from 'vitest';
import {
	HttpClientErrorStatusCode,
	HttpInfoStatusCode,
	HttpRedirectStatusCode,
	HttpServerErrorStatusCode,
	HttpStatusCode,
	HttpSuccessStatusCode
} from '../src/httpStatusCodes';

const infoStatusCodes: HttpInfoStatusCode[] = [
	100, 101, 102, 103
];

const successStatusCodes: HttpSuccessStatusCode[] = [
	200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
];

const redirectStatusCodes: HttpRedirectStatusCode[] = [
	300, 301, 302, 303, 304, 305, 306, 307, 308,
];

const clientErrorStatusCodes: HttpClientErrorStatusCode[] = [
	400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
	410, 411, 412, 413, 414, 415, 416, 417, 418, 421,
	422, 423, 424, 425, 426, 428, 429, 431, 451,
];

const serverErrorStatusCodes: HttpServerErrorStatusCode[] = [
	500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
];

const httpStatusCodes: HttpStatusCode[] = [
	...infoStatusCodes,
	...successStatusCodes,
	...redirectStatusCodes,
	...clientErrorStatusCodes,
	...serverErrorStatusCodes,
];

test.each(httpStatusCodes)('%#: Test HTTP status code type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpStatusCode>();
});

test.each(infoStatusCodes)('%#: (info) Test HTTP status codes type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpInfoStatusCode>();
});

test.each(successStatusCodes)('%#: (success) Test HTTP status codes type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpSuccessStatusCode>();
});

test.each(redirectStatusCodes)('%#: (redirect) Test HTTP status codes type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpRedirectStatusCode>();
});

test.each(clientErrorStatusCodes)('%#: (client error) Test HTTP status codes type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpClientErrorStatusCode>();
});

test.each(serverErrorStatusCodes)('%#: (server error) Test HTTP status codes type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpServerErrorStatusCode>();
});
