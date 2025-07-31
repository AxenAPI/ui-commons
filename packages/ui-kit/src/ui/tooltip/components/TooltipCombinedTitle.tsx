import { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';

import cn from 'classnames';

import { NTooltip } from '@/ui/tooltip/models';

import styles from '../styles.module.css';

const Component = ({
  type,
  children,
}: {
  type: NTooltip.TTooltipCombined['type'];
  children: ReactNode | ReactNode[];
}) => {
  switch (type) {
    case 'double':
      return <div>{children}</div>;
    default:
      return <Fragment>{children}</Fragment>;
  }
};

export const TooltipCombinedTitle = ({ type, rows }: NTooltip.TTooltipCombined) => {
  const classNames = cn(
    styles.tooltipCombinedTitle,
    { [styles.singleRow]: type === 'single' },
    { [styles.doubleRow]: type === 'double' }
  );

  return (
    <div className={classNames}>
      {rows?.map(({ label, value }, index) => {
        return (
          <Component key={index} type={type}>
            <div className={styles.tooltipLabel}>{label}</div> <div className={styles.tooltipValue}>{value}</div>
          </Component>
        );
      })}
    </div>
  );
};
