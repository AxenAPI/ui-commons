import { FC } from 'react';

import { Skeleton as AntSkeleton } from 'antd';

import type { NImageSkeleton } from './models';

export const ImageSkeleton: FC<NImageSkeleton.TProps> = ({ isActive, ...rest }) => (
  <AntSkeleton.Image {...rest} active={isActive} />
);
