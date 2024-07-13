import _ from "lodash";

/**
 *
 * @param value
 * @param locales
 * @param options
 * @returns
 */
function _intl_fraction(
  value: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
) {
  const localesArgs = locales ? locales : "en-US";

  const result = new Intl.NumberFormat(localesArgs, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(value);

  return result;
}

/**
 * 
 * @param value 
 * @param locales 
 * @param options 
 * @returns 
 */
function _intl_number(
  value: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
) {
  const localesArgs = locales ? locales : "en-US";

  const result = new Intl.NumberFormat(localesArgs, {
    maximumFractionDigits: 4,
    ...options,
  }).format(value);

  return result;
}

/**
 * 
 * @param value 
 * @param locales 
 * @param options 
 * @returns 
 */
export function intlNumberFormat(
  value: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
) {
  if (value % 1 === 0) {
    return _intl_fraction(value, locales, options)
  } else {
    return _intl_number(value, locales, options)
  }
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
