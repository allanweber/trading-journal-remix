import { SearchSelect, SearchSelectItem } from '@tremor/react';
import { useState } from 'react';
import { currencies } from '~/model/currency/currencies';

type Props = {
  selected?: string;
  onChange?: (currency: string) => void;
  [x: string]: any;
};

export default function CurrencySelect(props: Props) {
  const { selected, onChange, ...rest } = props;
  const [curr] = useState(currencies);
  const [current, setCurrent] = useState(selected ?? currencies[0].value);

  const handleSelect = (currency: string) => {
    setCurrent(currency);
    if (onChange) onChange(currency);
  };

  return (
    <SearchSelect value={current} onValueChange={handleSelect} {...rest}>
      {curr.map((currency) => (
        <SearchSelectItem key={currency.value} value={currency.value}>
          {currency.value}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
}
