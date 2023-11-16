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
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <h3 className="text-sm text-muted-foreground">{subtitle}</h3>
      </div>
      <div className="flex items-center space-x-2">
        <div className="sm:mt-0 sm:ml-16 ">{action}</div>
      </div>
    </div>
  );
}

const Title = (props: PropsWithChildren) => {
  const { children } = props;
  return children;
};

const Subtitle = (props: PropsWithChildren) => {
  const { children } = props;
  return children;
};

const Action = (props: PropsWithChildren) => {
  const { children } = props;
  return children;
};

PageHeader.Title = Title;
PageHeader.Subtitle = Subtitle;
PageHeader.Action = Action;
