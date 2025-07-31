import { FC } from 'react';

import { Radio as AntdRadio } from 'antd';
import cn from 'classnames';

import { NRadio } from './models';

import styles from './styles.module.css';

/**
 * Радио кнопка (обертка радио кнопки из Ant Design)
 */
export const Radio: FC<NRadio.TProps> = ({
  isChecked,
  isDisabled,
  shouldDefaultChecked,
  isRequired,
  isReadonly,
  className,
  ...restProps
}) => (
  <AntdRadio
    {...restProps}
    checked={isChecked}
    disabled={isDisabled}
    defaultChecked={shouldDefaultChecked}
    required={isRequired}
    className={cn(className, {
      [styles.readonly]: isReadonly,
    })}
  />
);
