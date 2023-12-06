import { CountriesQueryQuery } from '../gql/graphql';
import { getAvgWeighted } from '../helpers/helpers';

type Country = CountriesQueryQuery['country2s'][0];

export const getQualityRating = (data: CountriesQueryQuery, country: Country): number => {
  const quality = country.quality_of_life;
  const qualityConfig = data.quality_of_lives_configs;

  return getAvgWeighted([
    [
      (quality?.numbeo_quality_of_life ?? 0) / (qualityConfig?.numbeo_quality_of_life_MAX ?? 0) * 10,
      qualityConfig?.numbeo_quality_of_life_WEIGHT,
    ],
    [
      (quality?.world_happiness ?? 0) / (qualityConfig?.world_happiness_MAX ?? 0) * 10,
      qualityConfig?.human_development_WEIGHT,
    ],
    [
      (quality?.world_data ?? 0) / (qualityConfig?.world_data_MAX ?? 0) * 10,
      qualityConfig?.world_data_WEIGHT,
    ],
    [
      (quality?.ceo_world ?? 0) / (qualityConfig?.ceo_world_MAX ?? 0) * 10,
      qualityConfig?.ceo_world_WEIGHT,
    ],
    [
      (quality?.social_progress ?? 0) / (qualityConfig?.social_progress_MAX ?? 0) * 10,
      qualityConfig?.social_progress_WEIGHT,
    ],
    [
      (quality?.human_development ?? 0) / (qualityConfig?.human_development_MAX ?? 0) * 10,
      qualityConfig?.human_development_WEIGHT,
    ],
  ]);
};

export const getCrimeRating = (data: CountriesQueryQuery, country: Country): number => {
  const crime = country.crime;
  const crimeConfig = data.crimes_configs;

  const crimeRating = getAvgWeighted([
    [
      ((crimeConfig?.numbeo_crime_index_MAX ?? 0) - (crime?.numbeo_crime_index ?? 0)) / (crimeConfig?.numbeo_crime_index_MAX ?? 0) * 10,
      crimeConfig?.numbeo_crime_index_WEIGHT,
    ],
    [
      (crime?.legatum_safety ?? 0) / (crimeConfig?.legatum_safety_MAX ?? 0) * 10,
      crimeConfig?.legatum_safety_WEIGHT,
    ],
    [
      ((crimeConfig?.oc_index_rating_MAX ?? 0) - (crime?.oc_index_rating ?? 0)) / (crimeConfig?.oc_index_rating_MAX ?? 0) * 10,
      crimeConfig?.oc_index_rating_WEIGHT,
    ],
    [
      ((crimeConfig?.peace_rating_MAX ?? 0) - (crime?.peace_rating ?? 0)) / (crimeConfig?.peace_rating_MAX ?? 0) * 10,
      crimeConfig?.peace_rating_WEIGHT,
    ],
    [
      (crime?.corruption_perception ?? 0) / (crimeConfig?.corruption_perception_MAX ?? 0) * 10,
      crimeConfig?.corruption_perception_WEIGHT,
    ],
    [
      (crime?.women_security ?? 0) / (crimeConfig?.women_security_MAX ?? 0) * 10,
      crimeConfig?.women_security_WEIGHT,
    ],
    [
      (crime?.insurly_rating ?? 0) / (crimeConfig?.insurly_rating_MAX ?? 0) * 10,
      crimeConfig?.insurly_rating_WEIGHT,
    ],
  ]);

  return crimeRating;
};

export const getMedicineRating = (data: CountriesQueryQuery, country: Country): number => {
  const medicine = country.medicine;
  const medicineConfig = data.medicines_configs;
  if (!medicine || !medicineConfig) return 0;

  return getAvgWeighted([
    [
      (medicine.numbeo_health ?? 0) / (medicineConfig.numbeo_health_MAX ?? 0) * 10,
      medicineConfig.numbeo_health_WEIGHT,
    ],
    [
      (medicine.global_health_security ?? 0) / (medicineConfig.global_health_security_MAX ?? 0) * 10,
      medicineConfig.global_health_security_WEIGHT,
    ],
    [
      (medicine.ceo_world_medicine_rating ?? 0) / (medicineConfig.ceo_world_medicine_rating_MAX ?? 0) * 10,
      medicineConfig.ceo_world_medicine_rating_WEIGHT,
    ],
    [
      (medicine.covid_protection_score ?? 0) / (medicineConfig.covid_protection_score_MAX ?? 0) * 10,
      medicineConfig.covid_protection_score_WEIGHT,
    ],
    [
      (medicine.covid_vaccinated ?? 0) / (medicineConfig.covid_vaccinated_MAX ?? 0) * 10,
      medicineConfig.covid_vaccinated_WEIGHT,
    ],
    [
      (medicine.legatum_health ?? 0) / (medicineConfig.legatum_health_MAX ?? 0) * 10,
      medicineConfig.legatum_health_WEIGHT,
    ],
  ]);
};

export const getFinanceRating = (data: CountriesQueryQuery, country: Country): number => {
  const metric = country.finance;
  const config = data.finances_configs;

  return getAvgWeighted([
    [
      (metric?.easy_business ?? 0) / (config?.easy_business_MAX ?? 0) * 10,
      config?.easy_business_WEIGHT,
    ],
    [
      (metric?.global_innovation_index ?? 0) / (config?.global_innovation_index_MAX ?? 0) * 10,
      config?.global_innovation_index_WEIGHT,
    ],
    [
      (metric?.economic_freedom_index ?? 0) / (config?.economic_freedom_index_MAX ?? 0) * 10,
      config?.economic_freedom_index_WEIGHT,
    ],
    [
      (metric?.world_competitiveness_index ?? 0) / (config?.world_competitiveness_index_MAX ?? 0) * 10,
      config?.world_competitiveness_index_WEIGHT,
    ],
  ]);
};

export const getPassportRating = (data: CountriesQueryQuery, country: Country): number => {
  const metric = country.passport;
  const config = data.passports_configs;

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
  
  // console.log('country: ', country.slug);
  const naturalizationScoreNumber = 10 - Number(country?.passport?.methods?.[0]?.number);
  const naturalizationScore = (() => {
    if (Number(country?.passport?.methods?.[0]?.number) == 0) return 0.01;

    return naturalizationScoreNumber > 0 ? naturalizationScoreNumber : 0.01;
  })();
  // console.log('passportAvg: ', passportAvg);
  // console.log('config?.passport_power_MAX: ', config?.passport_power_MAX);
  // console.log('config?.passport_power_WEIGHT: ', config?.passport_power_WEIGHT);
  
  // console.log('naturalizationScore: ', naturalizationScore);
  // console.log('config?.naturalization_WEIGHT: ', config?.naturalization_WEIGHT);

  return getAvgWeighted([
    [
      passportAvg / (config?.passport_power_MAX ?? 0) * 10,
      config?.passport_power_WEIGHT,
    ],
    [
      naturalizationScore,
      config?.naturalization_WEIGHT,
    ],
    // [
    //   (metric?.economic_freedom_index ?? 0) / (config?.economic_freedom_index_MAX ?? 0) * 10,
    //   config?.economic_freedom_index_WEIGHT,
    // ],
    // [
    //   (metric?.world_competitiveness_index ?? 0) / (config?.world_competitiveness_index_MAX ?? 0) * 10,
    //   config?.world_competitiveness_index_WEIGHT,
    // ],
  ]);
};
