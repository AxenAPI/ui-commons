import { FC } from 'react';

import { Skeleton as AntdSkeleton } from 'antd';

import type { NSkeleton } from './models';

export const Skeleton: FC<NSkeleton.TProps> = ({
  isActive,
  isAvatar,
  isLoading,
  isParagraph,
  isRound,
  isTitle,
  ...rest
}) => (
  <AntdSkeleton
    {...rest}
    active={isActive}
    avatar={isAvatar}
    loading={isLoading}
    paragraph={isParagraph}
    round={isRound}
    title={isTitle}
  />
);
