import { FC } from 'react';

import { Skeleton as AntSkeleton } from 'antd';

import type { NAvatarSkeleton } from './models';

export const AvatarSkeleton: FC<NAvatarSkeleton.TProps> = ({ isActive, ...rest }) => (
  <AntSkeleton.Avatar {...rest} active={isActive} />
);
