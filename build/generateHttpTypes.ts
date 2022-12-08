import fs from 'fs';
import {
	Concept,
	READ_FILE_PATH,
	capitalize,
	ConceptValue,
	getHttpMethodAsCamelCase,
	isForbiddenHttpRequestHeader,
	makeCamelCase,
	makeDocBlock,
	makeDocSeeTag,
	makeExcludeType,
	makeStringType,
	makeType,
	makeUnionType,
} from '.';
import wordWrap from 'word-wrap';

function createRunGenerator(
	writeFilePath: string,
	conceptName: string,
	endMessage: (concept: Concept) => string,
	generateFn: (concept: Concept, writeStream: fs.WriteStream) => void,
) {
	console.time(conceptName);
	fs.readFile(READ_FILE_PATH, 'utf8', (err, data) => {
		if(err) {
			console.error(err);
			return;
		}

		const concepts: Concept[] = JSON.parse(data);
		const specificConcept = concepts.find((val) => val['concept'] === conceptName) as Concept;
		fs.truncateSync(writeFilePath, 0);
		console.log(`${writeFilePath} emptied`);

		const writeStream: fs.WriteStream = fs.createWriteStream(writeFilePath, {flags:'a'});
		writeStream.write(makeDocBlock([
			'This file is generated by the `build/generateHttpTypes.ts` script.',
			'To run it, run `npm run generateHttpTypes`.',
			'Do NOT edit this file directly.',
		]) + '\n\n');

		generateFn(specificConcept, writeStream);
		console.timeEnd(conceptName);
		console.log(`${writeFilePath}: ${endMessage(specificConcept)}\n`);
	});
}

function makeFullDocBlock(conceptValue: ConceptValue): string {
	const description = wordWrap(conceptValue.details[0].description, { width: 60, indent: '' });
	const lines = description.split('\n');

	const docBlock = makeDocBlock([
		...lines.map((line) => line.trim()),
		'',
		makeDocSeeTag('Documentation', conceptValue.details[0].documentation),
		makeDocSeeTag(`Specification → ${conceptValue.details[0]['spec-name']}`,
			conceptValue.details[0].specification),
	]);

	return docBlock;
}

// Generate HTTP methods
createRunGenerator(
	'./src/httpMethods.ts',
	'http-method',
	(concepts) => `Exported ${concepts.values.length} HTTP methods`,
	(concept, writeStream) => {
		const httpMethodTypes: string[] = [];

		// generate each individual HTTP method type
		for(const conceptValue of concept.values) {
			const httpMethodType = `HttpMethod${getHttpMethodAsCamelCase(conceptValue.value)}`;
			httpMethodTypes.push(httpMethodType);

			const httpMethodName = conceptValue.value;
			const tsType = makeStringType( httpMethodType, httpMethodName);

			const docBlock = makeFullDocBlock(conceptValue);
			writeStream.write(`${docBlock}\n${tsType}\n\n`);
		}

		writeStream.write(makeUnionType('HttpMethod', httpMethodTypes) + '\n');
		writeStream.end();
	},
);

// Generate HTTP status codes
createRunGenerator(
	'./src/httpStatusCodes.ts',
	'http-status-code',
	(concepts) => `Exported ${concepts.values.length} HTTP status codes`,
	(concept, writeStream) => {
		const httpStatusCodeTypes: string[] = [];

		// categories
		const infoStatusCodes: string[] = [];
		const successStatusCodes: string[] = [];
		const redirectStatusCodes: string[] = [];
		const clientErrorStatusCodes: string[] = [];
		const serverErrorStatusCodes: string[] = [];

		// generate each individual HTTP status code type
		for(const conceptValue of concept.values) {
			const httpStatusCodeType = `HttpStatusCode${capitalize(makeCamelCase(conceptValue.value))}`;
			httpStatusCodeTypes.push(httpStatusCodeType);

			const httpStatusCodeName = conceptValue.value;
			const tsType = makeType( httpStatusCodeType, httpStatusCodeName, false);

			const docBlock = makeFullDocBlock(conceptValue);
			writeStream.write(`${docBlock}\n${tsType}\n\n`);

			if(httpStatusCodeName.startsWith('1')) {
				infoStatusCodes.push(httpStatusCodeType);
			}
			else if(httpStatusCodeName.startsWith('2')) {
				successStatusCodes.push(httpStatusCodeType);
			}
			else if(httpStatusCodeName.startsWith('3')) {
				redirectStatusCodes.push(httpStatusCodeType);
			}
			else if(httpStatusCodeName.startsWith('4')) {
				clientErrorStatusCodes.push(httpStatusCodeType);
			}
			else if(httpStatusCodeName.startsWith('5')) {
				serverErrorStatusCodes.push(httpStatusCodeType);
			}
		}

		// generate union type of all HTTP status codes
		writeStream.write(makeUnionType('HttpInfoStatusCode', infoStatusCodes) + '\n\n');
		writeStream.write(makeUnionType('HttpSuccessStatusCode', successStatusCodes) + '\n\n');
		writeStream.write(makeUnionType('HttpRedirectStatusCode', redirectStatusCodes) + '\n\n');
		writeStream.write(makeUnionType('HttpClientErrorStatusCode', clientErrorStatusCodes) + '\n\n');
		writeStream.write(makeUnionType('HttpServerErrorStatusCode', serverErrorStatusCodes) + '\n\n');
		writeStream.write(makeUnionType('HttpStatusCode', [
			'HttpInfoStatusCode',
			'HttpSuccessStatusCode',
			'HttpRedirectStatusCode',
			'HttpClientErrorStatusCode',
			'HttpServerErrorStatusCode',
		]) + '\n');

		writeStream.end();
	},
);

// Generate HTTP headers
createRunGenerator(
	'./src/httpHeaders.ts',
	'http-header',
	(concept) => `Exported ${concept.values.length} HTTP headers`,
	(concept, writeStream) => {
		const httpHeaderTypes: string[] = [];
		const forbiddenHttpRequestHeaders: string[] = [];

		// generate each individual HTTP header type
		for(const conceptValue of concept.values) {
			const httpHeaderType = `HttpHeader${capitalize(makeCamelCase(conceptValue.value))}`;
			httpHeaderTypes.push(httpHeaderType);

			const httpHeaderName = capitalize(conceptValue.value);
			const tsType = makeStringType(httpHeaderType, httpHeaderName);
			if(isForbiddenHttpRequestHeader(httpHeaderName)) {
				forbiddenHttpRequestHeaders.push(httpHeaderType);
			}

			const docBlock = makeFullDocBlock(conceptValue);
			writeStream.write(`${docBlock}\n${tsType}\n\n`);
		}

		// generate union type of all HTTP headers
		writeStream.write(makeUnionType('HttpHeader', httpHeaderTypes) + '\n\n');
		writeStream.write(makeUnionType('ForbiddenHttpRequestHeader', forbiddenHttpRequestHeaders) + '\n\n');
		writeStream.write(makeUnionType('ForbiddenHttpResponseHeader', [ 'HttpHeaderSetCookie', 'HttpHeaderSetCookie2' ]) + '\n\n');
		writeStream.write(makeExcludeType('HttpRequestHeader', 'HttpHeader', 'ForbiddenHttpRequestHeader') + '\n\n');
		writeStream.write(makeExcludeType('HttpResponseHeader', 'HttpHeader', 'ForbiddenHttpResponseHeader') + '\n');

		writeStream.end();
	},
);
