export function makeCamelCase(str: string): string {
	const words = str.split('-');
	return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.slice(1)).join('');
};

export function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
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
