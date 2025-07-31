import { FC } from 'react';

import { Checkbox as AntdCheckbox } from 'antd';
import cn from 'classnames';

import { NCheckbox } from './models';

import styles from './styles.module.css';

export const CheckboxGroup: FC<NCheckbox.TGroupProps> = ({ isDisabled, isReadonly, className, ...restProps }) => (
  <AntdCheckbox.Group
    {...restProps}
    disabled={isDisabled}
    className={cn(className, {
      [styles.readonly]: isReadonly,
    })}
  />
);
