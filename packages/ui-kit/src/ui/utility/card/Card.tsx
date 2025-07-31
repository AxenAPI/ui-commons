import { Card as AntdCard } from 'antd';
import cn from 'classnames';

import { NCard } from './model.ts';

import styles from './styles.module.css';

export function Card({ isLoading, isHoverable, isBordered, isInner, isInnerStyle, className, ...rest }: NCard.TProps) {
  return (
    <AntdCard
      {...rest}
      type={isInner ? 'inner' : undefined}
      loading={isLoading}
      hoverable={isHoverable}
      bordered={isBordered}
      className={cn(className, { [styles.innerStyle]: isInnerStyle })}
    />
  );
}

Card.Grid = AntdCard.Grid;
Card.Meta = AntdCard.Meta;
