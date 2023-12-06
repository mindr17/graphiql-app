import { promises as fs } from 'fs';
import * as path from 'path';

// https://www.sitemaps.org/protocol.html

const FRONTEND_URL = 'https://batumi.estate';

function escape(s: string) {
	let lookup = {
		'&': '&amp;',
		'"': '&quot;',
		"'": '&apos;',
		'<': '&lt;',
		'>': '&gt;'
	};

	return s.replace(/[&"'<>]/g, (c) => lookup[c]);
}

export async function generateXml(folder: string, urls: string[]) {
	const MAX_SIZE = 1024 * 1024 * 50; // 50 MB;
	const MAX_ITEMS = 50000;

	console.log('Items:', urls.length);

	if (urls.length > MAX_ITEMS) {
		throw new Error('Too many urls. Not implemented');
	}

	let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

	for (const url of urls) {
		xml += `<url><loc>${escape(url)}</loc></url>\n`;
	}

	xml += `</urlset>`;

	console.log('Size:', xml.length / 1024 / 1024, 'MB');

	if (xml.length > MAX_SIZE) {
		throw new Error('Too bit file. Not implemented');
	}

	await fs.writeFile(path.join(folder, 'sitemap.xml'), xml);

	console.log('Done');
}
