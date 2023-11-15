import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

type Props = {
  value: number;
  negativeColor?: string;
  positiveColor?: string;
};

export default function ColoredNumber(props: PropsWithChildren<Props>) {
  const { children, value, negativeColor, positiveColor } = props;

  const [positive] = useState(positiveColor ?? 'text-green-600');
  const [negative] = useState(negativeColor ?? 'text-red-600');
  const [positiveValue] = useState(value >= 0);

  return (
    <span className={clsx(positiveValue ? positive : negative, 'text-sm')}>
      {children}
    </span>
  );
}
