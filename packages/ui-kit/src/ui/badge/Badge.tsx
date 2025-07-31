import { FC } from 'react';

import { Badge as AntdBadge } from 'antd';
import classNames from 'classnames';

import { NBadge } from './models';

import styles from './badge.module.css';

export const Badge: FC<NBadge.TProps> = ({ type = '', children, ...rest }) => {
  return (
    <AntdBadge
      {...rest}
      classNames={{
        indicator: classNames(styles.customBadge, styles[type], rest.classNames?.indicator),
        root: rest.classNames?.root,
      }}
    >
      {children}
    </AntdBadge>
  );
};
