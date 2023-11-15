import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import type { Journal } from '~/model/journal/Journal';
import { Case, Default, Switch } from '~/utils/conditionalRendering';
import ColoredNumber from './ColoredNumber';
import CurrencyDisplay from './CurrencyDisplay';

type Props = {
  journal: Journal;
};

export default function JournalBalanceStatus(props: Props) {
  const { journal } = props;
  const [growing] = useState(journal.balance.current >= journal.initialBalance);
  return (
    <>
      <Switch>
        <Case condition={growing}>
          <ArrowTrendingUpIcon
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-600"
            aria-hidden="true"
          />
        </Case>
        <Default>
          <ArrowTrendingDownIcon
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-600"
            aria-hidden="true"
          />
        </Default>
      </Switch>

      <ColoredNumber value={journal.balance.current}>
        <CurrencyDisplay currency={journal.currency}>
          {journal.balance.current}
        </CurrencyDisplay>
      </ColoredNumber>
    </>
  );
}
