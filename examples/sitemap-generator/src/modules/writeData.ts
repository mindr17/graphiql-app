import { writerClient } from './clientGq';
import { gql } from 'graphql-request'

  // const updateFields = async () => {
  //   for await (const country of countriesWithFields) {
  //     // if (country.attributes.slug === 'argentina') {
  //       // console.log('country: ', country);

  //       const body = {
  //         data: {
  //           medicineScore: country.attributes.medicineScore,
  //           crimeSafeScore: country.attributes.crimeSafeScore,
  //           qualityOfLifeScore: country.attributes.qualityOfLifeScore,
  //           passportPowerScore: country.attributes.passportPowerScore,
  //           livingCostAvg: country.attributes.livingCostAvg,
  //         }
  //       };

  //       const putResponse = await fetch(
  //         `https://api.passport.help/api/country2s/${country.id}?locale=ru`,
  //         {
  //           method: 'PUT',
  //           mode: 'cors',
  //           headers: {
  //             "Content-Type": "application/json",
  //             'Authorization': `Bearer ${config.token}`,
  //           },
  //           body: JSON.stringify(body),
  //         }
  //       );
  //       console.log('putResponse: ', await putResponse.json());
  //     // }
  //   }
  // };

const query = gql`
  query CountryPageQuery{
    country2s{
      living_cost_avg
    }
  }
`;

export const writeData = async (data) => {
  try {
    // if (!locale) throw new Error('locale is undefined!');

    const variables = {
      locale: 'en-EN',
    };

    return {
      data: await readerClient.request(query, variables).catch(e => console.error(e)),
    };
  } catch(e) {console.error(e)};
};
