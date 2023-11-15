import type { PropsWithChildren } from 'react';
import React from 'react';

export const Switch = (props: PropsWithChildren) => {
  let matchChild: any = null;
  let defaultCase: any = null;

  React.Children.forEach(props.children, (child: any) => {
    if (!matchChild && child.type === Case) {
      const { condition } = child.props;

      const conditionResult = Boolean(condition);

      if (conditionResult) {
        matchChild = child;
      }
    } else if (!defaultCase && child.type === Default) {
      defaultCase = child;
    }
  });

  return matchChild ?? defaultCase ?? null;
};

type CaseProps = {
  condition: boolean;
};

export const Case = (props: PropsWithChildren<CaseProps>) => {
  return props.children;
};

export const Default = (props: PropsWithChildren) => {
  return props.children;
};
