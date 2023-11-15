import { useNavigate } from '@remix-run/react';
import { Button } from '@tremor/react';
import type { PropsWithChildren } from 'react';

type Props = {
  to: string;
};

export default function CancelLink(props: PropsWithChildren<Props>) {
  const navigate = useNavigate();
  const { to, children } = props;
  return (
    <Button type="button" variant="secondary" onClick={() => navigate(to)}>
      {children}
    </Button>
  );
}
