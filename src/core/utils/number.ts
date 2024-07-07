import _ from "lodash";

/**
 *
 * @param value
 * @param locales
 * @param options
 * @returns
 */
export function formatNumber(
  value: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
) {
  const localesArgs = locales ? locales : "en-US";

  const result = new Intl.NumberFormat(localesArgs, {
    maximumSignificantDigits: 3,
    ...options,
  }).format(value);

  return result;
}

/**
 *
 * @param value
 * @returns
 */
export function isNumeric(value: any): boolean {
  return !_.isNaN(parseFloat(value)) && _.isFinite(value);
}

/**
 *
 * @param value
 * @returns
 */
export function validateNumber(value: any): number {
  if (isNumeric(Number(value))) {
    return Number(value);
  }

  return 0;
}

/**
 * 
 * @param value 
 * @returns 
 */
export function roundDecimal(value: number) {
  const result = Math.round((value + Number.EPSILON) * 100) / 100;

  return result;
}
