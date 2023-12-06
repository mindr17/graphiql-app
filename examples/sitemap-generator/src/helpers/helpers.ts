import { config } from '../config';

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getAvgWeighted = (arr: Array<Array<number | null | undefined>>): number => {
  if (arr.every(item => !item[0] || !item[1]) || arr.length === 0) return 0;

  const arrFiltered = arr.filter((items) => {
    if (items[0]
      && items[0] !== null
      && items[1] !== null
      && items[1]
    ) return true;

    if (items.some(item => !item || item === null)) return false;
  });

  if (arrFiltered.length === 0) return 0;

  const arrMultiplied = arrFiltered.map((item) => {
    const result = [item[0] * item[1], item[1]];

    return result;
  })

  const sumFunc = (r: any, a: any) => r.map((b: any, i: any) => a[i] + b);
  const sumArr: Array<number> = arrMultiplied.reduce(sumFunc);
  const avgWeighted: number = sumArr[0] / sumArr[1];

  return avgWeighted;
};

export const formatDateUpdated = (locale: string, dateUpdated: string): string => {
  const date = new Date(dateUpdated);

  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = date.toLocaleDateString(locale, options);

  return dateFormatted;
};

export const getImgSrc = (path: string): string => {
  if (typeof path !== 'string') return '/img/default.jpg';

  return `${config.fetchUrl}${path}`;
};

export const getNumWordCase = (n: number, cases: string[]): string => {
  return n + ' ' + cases[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};
