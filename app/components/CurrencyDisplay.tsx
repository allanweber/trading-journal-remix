import { useEffect, useState } from 'react';
import { currencies } from '~/model/currency/currencies';

type Options = {
  digits?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
};

const defaultOptions: Options = {
  digits: 2,
  thousandsSeparator: '.',
  decimalSeparator: ',',
};

const currencyFormat = (value: number) => {
  if (value === undefined) {
    value = 0;
  }
  const fixed = value.toFixed(defaultOptions.digits);
  const [integer, decimal] = fixed.split('.');
  const thousandsSeparator = defaultOptions.thousandsSeparator ?? '.';

  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)}${
    defaultOptions.decimalSeparator
  }${decimal}`;
};

const currencySymbol = (currency: string) => {
  const filter = currencies.filter((item) => item.value === currency);
  return filter.length > 0 ? filter[0].symbol : '$';
};

type Props = {
  currency: string;
  children: number;
};

export default function CurrencyDisplay(props: Props) {
  const { currency, children } = props;

  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    const symbol = currencySymbol(currency);
    const formatted = currencyFormat(children);
    setFormatted(`${symbol} ${formatted}`);
  }, [currency, children]);

  return formatted;
}
