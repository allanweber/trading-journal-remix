import { Button } from '@tremor/react';
import type { PropsWithChildren } from 'react';

export default function PrimaryButton(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <Button type="submit">{children}</Button>;
}
