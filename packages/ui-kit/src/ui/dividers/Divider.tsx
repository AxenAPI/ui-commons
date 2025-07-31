import { FC } from 'react';

import { Divider as AntdDivider } from 'antd';

import { NDivider } from './models';

export const Divider: FC<NDivider.TProps> = ({ isDashed, isPlain, ...rest }) => (
  <AntdDivider {...rest} dashed={isDashed} plain={isPlain} />
);
