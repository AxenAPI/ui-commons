import { FC } from 'react';

import { Switch as AntdSwitch } from 'antd';

import { NSwitch } from './models';

export const Switch: FC<NSwitch.TProps> = ({ isChecked, isDisabled, isLoading, ...restProps }) => (
  <AntdSwitch {...restProps} checked={isChecked} disabled={isDisabled} loading={isLoading} />
);
