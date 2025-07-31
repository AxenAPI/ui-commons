import { FC } from 'react';

import { Skeleton as AntSkeleton } from 'antd';

import type { NNodeSkeleton } from './models';

export const NodeSkeleton: FC<NNodeSkeleton.TProps> = ({ isActive, isFullSize, ...rest }) => (
  <AntSkeleton.Node {...rest} active={isActive} fullSize={isFullSize} />
);
