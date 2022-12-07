export function makeDocTag(annotation: string, value: string): string {
	return `@${annotation} ${value}`;
}

export function makeDocSeeTag(label: string, link: URL): string {
	return makeDocTag('see', `[${label}](${link})`);
}

export function makeDocBlock(values: string[]): string {
	let docBlock = '/**\n';
	for(const value of values) {
		docBlock += ` *${value === '' ? '\n' : ` ${value}\n`}`;
	}
	docBlock += ' */';
	return docBlock;
}
