export function makeCamelCase(str: string): string {
	const words = str.split('-');
	return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.slice(1)).join('');
}

export function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}

export function getDocumentationLabel(link: URL) {
	const path = link.pathname;

	switch(link.hostname) {
	case 'datatracker.ietf.org': {
		// example URLs:
		// - https://datatracker.ietf.org/doc/html/rfc7694#section-3
		// - https://datatracker.ietf.org/doc/html/rfc7089#section-2.1.1
		const regex = /(draft-(\w|-)+|rfc(\d{4,}))#section-(\d+)((.\d*)*)/;
		const ietfPath = path.substring('/doc/html/'.length) + link.hash;
		const matches = regex.exec(ietfPath);

		if(matches !== null) {
			const isDraft: boolean = matches[1].startsWith('draft');
			const specType: string = isDraft ? 'Internet Draft' : 'IETF RFC';
			const specName: string = isDraft ? matches[1].substring('draft-'.length) : matches[3];
			const section: string = matches[4] + matches[5];

			return ` → ${specType} ${specName} §${section}`;
		}
	}
		break;
	default:
		return '';
	}
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
			'Via',
		].includes(header);
}
