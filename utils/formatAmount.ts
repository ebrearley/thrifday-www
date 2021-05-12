import _ from 'lodash';
import getBrowserLocale from './getBrowserLocale';

interface FormatAmountOptions {
  currencyCode?: string;
}

const defaultOptions: FormatAmountOptions = {
  currencyCode: 'AUD',
}

const formatAmount = (amount: number = 0, options?: FormatAmountOptions) => {
  const locale = getBrowserLocale();
  const opts = {
    ...defaultOptions,
    ...options,
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: opts.currencyCode,
  });

  if (!_.isFinite(amount)) {
    return formatter.format(0);
  }

  return formatter.format(amount);
};


export default formatAmount;
