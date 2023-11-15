import type { PropsWithChildren } from 'react';

type Props = {
  htmlFor: string;
};

export default function FormLabel(props: PropsWithChildren<Props>) {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-900"
    >
      {children}
    </label>
  );
}
