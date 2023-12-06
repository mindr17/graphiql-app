import { CountriesQueryQuery } from "../gql/graphql";
import { getAvgWeighted } from "../helpers/helpers";
import {
  getCrimeRating,
  getMedicineRating,
  getQualityRating,
  getFinanceRating,
  getPassportRating,
} from "../helpers/ratingHelpers";

export const updateFields = (data: CountriesQueryQuery) => {
  const countries = data.country2s;

  return countries.map((country, index) => {
    const defaultCity = country.cities?.[0];

    const livingCostAvg: number = getAvgWeighted([
      [
        defaultCity?.numbeo_cost,
        100,
      ],
      [
        defaultCity?.living_cost_cost,
        100,
      ],
    ]);

    const passportAvg: number = getAvgWeighted([
      [
        country?.passport?.power_index,
        100,
      ],
      [
        country?.passport?.power_hey,
        50,
      ],
    ]);

    // console.log(getPassportRating(data, country).toFixed(1));

    const passportscore = Number(getPassportRating(data, country).toFixed(1));
    // console.log(`${index}. ${country.slug} passportscore: ${passportscore}`);


    return {
      id: country.id,
      slug: country.slug,
      crime: country.crime,
      living_cost_avg: Number(livingCostAvg.toFixed(0)),
      passport_power_score: Number(passportAvg.toFixed(0)),
      passport_score: passportscore,
      finance_score: Number(getFinanceRating(data, country).toFixed(2)),
      quality_of_life_score: Number(getQualityRating(data, country).toFixed(2)),
      crime_safe_score: Number(getCrimeRating(data, country).toFixed(2)),
      medicine_score: Number(getMedicineRating(data, country).toFixed(2)),
    };
  });
};

// country.children_score = getMedicineRating(data);
// country.finance_score = getMedicineRating(data);

// children_score = 4 рейтингов:
// писа - экзамен
// хди - просто количество лет которые люди учатся
// сеоворлд - хз чо у них за данные

// finance_score = 6 рейтингов
// economic_freedom_world
// world_competitiveness_index
// индекс
// инновейшен
// компетишн
// изи бизнес
