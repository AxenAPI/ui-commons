import { FC } from 'react';

import { Radio as AntdRadio } from 'antd';
import cn from 'classnames';

import { NRadio } from './models';

import styles from './styles.module.css';

/**
 * Радио кнопка (обертка радио кнопки из Ant Design)
 */
export const RadioGroup: FC<NRadio.TRadioGroupProps> = ({ isDisabled, isReadonly, className, ...restProps }) => (
  <AntdRadio.Group
    {...restProps}
    disabled={isDisabled}
    className={cn(className, {
      [styles.readonly]: isReadonly,
    })}
  />
);
