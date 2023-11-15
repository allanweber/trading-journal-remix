import { useState } from 'react';
import type { Journal } from '~/model/journal/Journal';

import { SearchSelect, SearchSelectItem } from '@tremor/react';
import { getIcon } from '~/model/currency/currencies';

type Props = {
  journals: Journal[];
  selected?: Journal;
  onChange?: (journal: Journal) => void;
};

export default function JournalSelect(props: Props) {
  const { journals, selected, onChange } = props;
  const [current, setCurrent] = useState(selected ?? journals[0]);

  const handleSelect = (id: string) => {
    const journal = journals.find((journal) => journal.id === id)!;
    setCurrent(journal);
    if (onChange) onChange(journal);
  };

  return (
    <SearchSelect
      value={current.id}
      icon={getIcon(current.currency)}
      onValueChange={handleSelect}
    >
      {journals.map((journal) => (
        <SearchSelectItem
          key={journal.id}
          value={journal.id}
          icon={getIcon(journal.currency)}
        >
          {journal.name} {journal.description}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
}
