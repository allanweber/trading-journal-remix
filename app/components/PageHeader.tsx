import type { PropsWithChildren, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

export default function PageHeader(props: PropsWithChildren) {
  const { children } = props;
  const [title, setTitle] = useState<ReactNode>(undefined);
  const [subtitle, setSubtitle] = useState<ReactNode>(undefined);
  const [action, setAction] = useState<ReactNode>(undefined);

  useEffect(() => {
    React.Children.forEach(children, (child: any) => {
      if (!title && child.type === Title) {
        setTitle(child);
      } else if (!subtitle && child.type === Subtitle) {
        setSubtitle(child);
      } else if (!action && child.type === Action) {
        setAction(child);
      }
    });
  }, [action, children, subtitle, title]);

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <div className="flex-auto">
          {title}
          {subtitle}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 ">{action}</div>
      </div>
    </div>
  );
}

const Title = (props: PropsWithChildren) => {
  const { children } = props;
  return <h1 className="text-xl font-semibold text-gray-900">{children}</h1>;
};

const Subtitle = (props: PropsWithChildren) => {
  const { children } = props;
  return <p className="mt-2 text-sm text-gray-700">{children}</p>;
};

const Action = (props: PropsWithChildren) => {
  const { children } = props;
  return <div className="mt-4 sm:mt-0 sm:ml-16 ">{children}</div>;
};

PageHeader.Title = Title;
PageHeader.Subtitle = Subtitle;
PageHeader.Action = Action;
