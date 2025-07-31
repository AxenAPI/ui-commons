import { FC } from 'react';

import { Skeleton as AntSkeleton } from 'antd';

import type { NButtonSkeleton } from './models';

export const ButtonSkeleton: FC<NButtonSkeleton.TProps> = ({ isActive, isBlock, ...rest }) => (
  <AntSkeleton.Button {...rest} block={isBlock} active={isActive} />
);
