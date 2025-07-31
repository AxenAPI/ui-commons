import { ReactNode } from 'react';

import { TCommonProps } from '../_common/models';

export namespace NNodeSkeleton {
  export type TProps = Omit<TCommonProps, 'size' | 'shape'> & {
    children?: ReactNode;
    isFullSize?: boolean;
  };
}
