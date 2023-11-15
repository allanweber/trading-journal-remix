import { Link } from '@remix-run/react';
import type { PropsWithChildren } from 'react';

interface props {
  to: string;
}

export default function RoundLink(props: PropsWithChildren<props>) {
  const { to, children } = props;
  return (
    <Link
      to={to}
      className="mr-2 inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}
