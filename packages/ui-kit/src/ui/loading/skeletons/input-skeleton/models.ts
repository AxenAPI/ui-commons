import { TCommonProps } from '../_common/models';

export namespace NInputSkeleton {
  export type TProps = Omit<TCommonProps, 'size' | 'shape'> & {
    isBlock?: boolean;
    size?: 'large' | 'small' | 'default';
  };
}
