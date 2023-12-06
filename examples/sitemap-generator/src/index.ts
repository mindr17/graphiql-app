import { updateFields } from "./modules/updateFields";
import { readData } from "./modules/readData";
import { config } from "./config";

const main = async () => {
  const startTime = new Date().getTime();
  const data = await readData("ru-RU");

  const countriesUpdated = updateFields(data);

  const upload = async () => {
    const responses = countriesUpdated.map(async country => {

      // if (country.slug !== 'norway') {
      //   return;
      // }

      // console.log('country.crime_safe_score: ', country.crime_safe_score);

      const body = {
        passport_power_score: country.passport_power_score,
        passport_score: country.passport_score,
        living_cost_avg: country.living_cost_avg,
        finance_score: country.finance_score,
        quality_of_life_score: country.quality_of_life_score,
        crime_safe_score: country.crime_safe_score,
        medicine_score: country.medicine_score,
      };

      return await fetch(
        `https://api.passport.help/items/country2s/${country.id}`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.writerToken}`
          },
          body: JSON.stringify(body)
        }
      );
    });

    const writerResponses = await Promise.all(responses);
    console.log('writerResponses: ', writerResponses);
  };
  await upload();

  console.log(`Done in ${new Date().getTime() - startTime}ms`);
};

main();
