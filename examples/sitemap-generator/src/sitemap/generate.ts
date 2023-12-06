import { localesMap, client, ProjectsQuery, ProjectsDocument } from './modules/frontendImports';
import { generateXml } from './modules/generateXml';

// https://www.sitemaps.org/protocol.html

const FRONTEND_URL = 'https://batumi.estate';

async function generateUrls() {
	const variables = {
		locale: 'ru-RU',
		page: 1,
		limit: 10000,
	};

	const data = await client.request<ProjectsQuery>(ProjectsDocument, variables);

	const projects = data.projects;
	const locales = [...localesMap.entries()];

	const urls: string[] = [];

	for (let i = 0; i < projects.length; i++) {
		const c = projects[i];

		if (!c.slug) {
			console.error(c, 'project skipped');

			continue;
		}

		for (let [shortLocale, fullLocale] of locales) {
			urls.push(`${FRONTEND_URL}/${shortLocale}/${c.slug}`);
		}
	}

	return urls;
}

(async () => {
	const urls = await generateUrls();

	await generateXml('../frontend/public', urls);
})();
