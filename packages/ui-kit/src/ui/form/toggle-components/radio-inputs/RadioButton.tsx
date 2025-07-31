import { FC } from 'react';

import { Radio as AntdRadio } from 'antd';

import { NRadio } from './models';

/**
 * Радио кнопка (обертка радио кнопки из Ant Design)
 */
export const RadioButton: FC<NRadio.TRadioButtonProps> = ({
  isChecked,
  isDisabled,
  shouldDefaultChecked,
  isRequired,
  ...restProps
}) => (
  <AntdRadio.Button
    {...restProps}
    checked={isChecked}
    disabled={isDisabled}
    defaultChecked={shouldDefaultChecked}
    required={isRequired}
  />
);
