import { expect, test } from 'vitest';
import { getDocumentationLabel } from '../build/stringUtils';

test.each([
	['https://datatracker.ietf.org/doc/html/rfc7694#section-3', ' → IETF RFC 7694 §3'],
	['https://datatracker.ietf.org/doc/html/rfc7089#section-2.1.1', ' → IETF RFC 7089 §2.1.1'],
	['https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-semantics-14#section-6.1', ' → Internet Draft ietf-httpbis-semantics-14 §6.1'],
	['https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-semantics-14#section-6.1.1', ' → Internet Draft ietf-httpbis-semantics-14 §6.1.1'],
])(`getDocumentationLabel(%s)`, (url, expected) => {
	expect(getDocumentationLabel(new URL(url))).toBe(expected);
});
