import { expectTypeOf, test } from 'vitest';
import { HttpMethod } from '../src/httpMethods';

const httpMethods: HttpMethod[] = [
	'GET',
	'POST',
	'PUT',
	'PATCH',
	'DELETE',
	'ACL',
	'BASELINE-CONTROL',
	'BIND',
	'CHECKIN',
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'HEAD',
	'LABEL',
	'LINK',
	'LOCK',
	'MERGE',
	'MKACTIVITY',
	'MKCALENDAR',
	'MKCOL',
	'MKWORKSPACE',
	'MOVE',
	'OPTIONS',
	'ORDERPATCH',
	'PATCH',
	'PRI',
	'PROPFIND',
	'PROPPATCH',
	'QUERY',
	'REBIND',
	'REPORT',
	'SEARCH',
	'TRACE',
	'UNBIND',
	'UNCHECKOUT',
	'UNLINK',
	'UPDATE',
	'UPDATEREDIRECTREF',
	'VERSION-CONTROL',
];

test.each(httpMethods)('%#: Test HTTP method type of \'%s\'', (expected) => {
	expectTypeOf(expected).toEqualTypeOf<HttpMethod>();
});