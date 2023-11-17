import { currencies } from '~/model/currency/currencies';
import Search from '../table/Search';

export default function JournalSearch() {
  const filters = [
    {
      filterId: 'currency',
      title: 'Currency',
      options: currencies.map((currency) => {
        return {
          label: `${currency.value} - ${currency.symbol}`,
          value: currency.value,
        };
      }),
    },
  ];
  return <Search placeholder="Search journals" filters={filters} />;
}
