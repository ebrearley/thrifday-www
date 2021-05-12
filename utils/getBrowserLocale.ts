import { find, isArray, isString } from "lodash";

const FALLBACK_DEFAULT_LOCALE = 'en-AU';

const getBrowserLocale = (): string => {
  if (typeof window === 'undefined') {
    return FALLBACK_DEFAULT_LOCALE;
  }

  if (isString(window?.navigator?.language)) {
    return window.navigator.language;
  }

  if (isArray(window?.navigator?.languages)) {
    return find(window.navigator.languages, (language) => language.length > 3);
  }

  return FALLBACK_DEFAULT_LOCALE;
};

export default getBrowserLocale;
