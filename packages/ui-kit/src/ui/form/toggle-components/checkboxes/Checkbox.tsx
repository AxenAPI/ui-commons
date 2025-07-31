import { FC } from 'react';

import { Checkbox as AntdCheckbox } from 'antd';
import cn from 'classnames';

import { NCheckbox } from './models';

import styles from './styles.module.css';

export const Checkbox: FC<NCheckbox.TProps> = ({
  isChecked,
  isDisabled,
  shouldDefaultChecked,
  isRequired,
  className,
  isReadonly,
  ...restProps
}) => (
  <AntdCheckbox
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
