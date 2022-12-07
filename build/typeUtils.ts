export function makeType(name: string, value: string, withNewline: boolean = true): string {
	return `export type ${name} =${withNewline ? '\n' : ' '}${value};`;
}

export function makeStringType(name: string, value: string): string {
	return makeType(name, `'${value}'`, false);
}

export function makeExcludeType(name: string, lhs: string, rhs: string): string {
	return makeType(name, `Exclude<${lhs}, ${rhs}>`, false);
}

export function makeCompositeType(name: string, types: string[], token: string): string {
	return makeType(name, types.map((v) => `\t${token} ${v}`).join('\n'));
}

export function makeUnionType(name: string, types: string[]): string {
	return makeCompositeType(name, types, '|');
}
