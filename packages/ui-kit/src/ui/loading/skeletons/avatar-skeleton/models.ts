import { TCommonProps } from '../_common/models';

export namespace NAvatarSkeleton {
  export type TProps = Omit<TCommonProps, 'shape'> & {
    shape?: 'circle' | 'square';
  };
}
