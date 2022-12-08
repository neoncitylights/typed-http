export function makeCamelCase(str: string): string {
	const words = str.split('-');
	return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.slice(1)).join('');
};

export function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}

export function getHttpMethodAsCamelCase(method: string): string {
	switch(method) {
		case 'MKACTIVITY': return 'MkActivity';
		case 'MKCALENDAR': return 'MkCalendar';
		case 'MKCOL': return 'MkCol';
		case 'MKREDIRECTREF': return 'MkRedirectRef';
		case 'MKWORKSPACE': return 'MkWorkspace';
		case 'ORDERPATCH': return 'OrderPatch';
		case 'PROPFIND': return 'PropFind';
		case 'PROPPATCH': return 'PropPatch';
		case 'UPDATEREDIRECTREF': return 'UpdateRedirectRef';
		default: return capitalize(makeCamelCase(method.toLowerCase()));
	}
}

export function isForbiddenHttpRequestHeader(header: string): boolean {
	return header.startsWith('Proxy')
		|| header.startsWith('Sec')
		|| [
		'Accept-Charset',
		'Accept-Encoding',
		'Access-Control-Request-Headers',
		'Access-Control-Request-Method',
		'Connection',
		'Content-Length',
		'Cookie',
		'Date',
		'DNT',
		'Expect',
		'Feature-Policy',
		'Host',
		'Keep-Alive',
		'Origin',
		'Referer',
		'TE',
		'Trailer',
		'Transfer-Encoding',
		'Upgrade',
		'Via'
	].includes(header);
};
