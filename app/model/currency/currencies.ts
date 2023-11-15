import {
  TbCurrencyDollar,
  TbCurrencyEuro,
  TbCurrencyReal,
} from 'react-icons/tb';

export const currencies = [
  { value: 'USD', symbol: '$', icon: TbCurrencyDollar },
  { value: 'EUR', symbol: '€', icon: TbCurrencyEuro },
  { value: 'BRL', symbol: 'R$', icon: TbCurrencyReal },
];

export const getIcon = (currency: string) => {
  const icon = currencies.find((c) => c.value === currency);
  return icon ? icon?.icon : TbCurrencyDollar;
};
