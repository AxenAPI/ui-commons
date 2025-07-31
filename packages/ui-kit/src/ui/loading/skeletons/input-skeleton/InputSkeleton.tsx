import { FC } from 'react';

import { Skeleton as AntSkeleton } from 'antd';

import type { NInputSkeleton } from './models';

export const InputSkeleton: FC<NInputSkeleton.TProps> = ({ isActive, isBlock, ...rest }) => (
  <AntSkeleton.Input {...rest} active={isActive} block={isBlock} />
);
