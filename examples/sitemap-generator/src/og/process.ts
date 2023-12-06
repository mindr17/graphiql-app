import { promises as fs } from 'fs';
import puppeteer, { Browser } from "puppeteer";
import { uploadImage } from './uploadImage';
import { directus } from './directus';
import { readerClient } from '../modules/clientGq';
import { GetCountryCompareDocument, GetCountryCompareQuery, OgQueryDocument, OgQueryQuery } from '../gql/graphql';
import { localesMap } from '../helpers/locales';

const imageType: 'jpeg' | 'webp' = 'webp';
const singleFolder = '33c5b512-cfa0-4f03-a41f-ceb6418e1932';
const compareFolder = '35e7b7b9-18f9-4f7a-9cb2-57cef1ab3835';

async function setOGSingle(countryId: string, imageId: string, translationId: string) {
  await directus.items('country2s').updateOne(countryId, {
    translations: {
      update: [
        { id: translationId, og_image: imageId }
      ]
    }
  });
}

interface OgTranslation {
  languages_code: string,
  og_image: string,
}

async function createOGCompareItem(compareSlug: string, translations: OgTranslation[]) {
  const Compare = directus.items('country_compare');
  try {
    await Compare.createOne({slug: compareSlug, translations});
  } catch(err) {
    if(err.message === 'Field "slug" has to be unique.') {
      const data = await readerClient.request<GetCountryCompareQuery>(GetCountryCompareDocument, { slug: compareSlug });
      const item = data.country_compare[0];
      console.log('already created. update...');

      const updates = translations.map(({og_image, languages_code}) => {
        const id = item.translations?.find(o => o?.languages_code === languages_code)?.id;
        if(!id) {
          throw new Error('id not found');
        }

        return { id, og_image };
      });

      await Compare.updateOne(item.id, {
        translations: {
          update: updates,
        }
      });
    } else {
      throw err;
    }
  }
}

// todo: remove old file on update
async function removeFile(fileId: string) {
  await directus.files.deleteOne(fileId);
}

// task: string - single, string[] - compare
async function takeScreenshot(browser: Browser, shortLocale: string, task: string | string[]) {
  const single = typeof task === 'string';
  const sTask = single ? task : task.join('-vs-');

  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1200, height: 630 });

    await page.goto(`http://localhost:3000/${shortLocale}/og/${single ? 'single' : 'compare'}/${sTask}`, {"waitUntil" : "networkidle0"});
    const el = await page.waitForSelector(".og-image");

    const image = await el?.screenshot({type: imageType, captureBeyondViewport: false});
    if(Buffer.isBuffer(image)) {
      return image;
    } else {
      throw new Error('image is not buffer');
    }
  } finally {
    await page.close();
  }
}

export const createOgImagesForSingleCountry = async () => {
  const data = await readerClient.request<OgQueryQuery>(OgQueryDocument);
  const browser = await puppeteer.launch({headless: true});

  const countries = data.country2s;
  const locales = [...localesMap.entries()];

  console.log(`capturing ${countries.length} countries for ${locales.length} locales...`);
  const startAt = Date.now();
  let nErrors = 0;
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    for (let [shortLocale, fullLocale] of locales) {
      const translationId = country.translations?.find(o => o?.languages_id === fullLocale)?.id;

      try {
        if(!country.slug || !translationId) {
          throw new Error('slug or translation id not found');
        }

        console.log(`----- ${country.slug} | ${shortLocale} -----`);
        console.log('taking screenshot...');
        const image = await takeScreenshot(browser, shortLocale, country.slug);

        console.log('uploading...');
        const imageId = await uploadImage(image, `OG single ${country.slug} ${shortLocale}.${imageType}`, imageType, singleFolder);

        console.log('updating item...');
        await setOGSingle(country.id, imageId, translationId);

        if(country.slug === 'russia') {
          throw new Error('testing error');
        }
      } catch(err) {
        console.error(err);
        nErrors += 1;
        await fs.writeFile('./og-single-errors.log', `[${new Date()}] ${country.slug} ${err}\n`, { flag: 'a' });
      }
    }

    const elapsed = (Date.now() - startAt) / 1000;
    console.log(`Done ${country.slug} | ${i + 1} of ${countries.length} | Errors: ${nErrors} | Total time: ${elapsed} sec. Avg: ${elapsed / (i + 1)} sec`);
  }
};


export async function createOgCompare() {
  const data = await readerClient.request<OgQueryQuery>(OgQueryDocument);
  const browser = await puppeteer.launch({headless: true});

  const countries = data.country2s;
  const locales = [...localesMap.entries()];

  const totalVariants = countries.length * (countries.length - 1) * locales.length;
  let nDone = 0;
  let nErrors = 0;
  console.log(`Capturing ${countries.length} countries compare for ${locales.length} locales. ${totalVariants} total variants`);
  const startAt = Date.now();

  for (let i = 0; i < countries.length; i++) {
    for (let j = 0; j < countries.length; j++) {
      if(i === j) {
        continue;
      }

      const c1 = countries[i];
      const c2 = countries[j];
      if(!c1.slug || !c2.slug) {
        console.error(c1, c2, 'countries skipped');
        continue;
      }
      const compareSlug = c1.slug + '-vs-' + c2.slug;

      const translations: OgTranslation[] = [];

      try {
        for (let [shortLocale, fullLocale] of locales) {
          console.log(`----- ${compareSlug} | ${shortLocale} -----`);
          console.log('taking screenshot...');
          const image = await takeScreenshot(browser, shortLocale, [c1.slug, c2.slug]);

          console.log('uploading...');
          const imageId = await uploadImage(image, `OG compare ${compareSlug} ${shortLocale}.${imageType}`, imageType, compareFolder);

          translations.push({og_image: imageId, languages_code: fullLocale});

          nDone += 1;
        }

        console.log('creating db item...');
        await createOGCompareItem(compareSlug, translations);
      } catch(err) {
        console.error(err);
        nErrors += 1;
        await fs.writeFile('./og-compare-errors.log', `[${new Date()}] ${compareSlug} ${err}\n`, { flag: 'a' });
      }

      const elapsed = (Date.now() - startAt) / 1000 / 60;
      const doneCoef = nDone / totalVariants;
      const estimatedTotalTime = totalVariants * elapsed / nDone;
      console.log(`Done ${nDone} of ${totalVariants} (${(doneCoef * 100).toFixed(2)}%) | Errors: ${nErrors} | Elapsed: ${elapsed.toFixed(2)} min / ${estimatedTotalTime.toFixed(2)} min. Avg: ${(elapsed * 60 / nDone).toFixed(2)} sec`);
    }
  }
};
