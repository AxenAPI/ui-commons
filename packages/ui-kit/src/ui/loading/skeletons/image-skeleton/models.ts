import { TCommonProps } from '../_common/models';

export namespace NImageSkeleton {
  export type TProps = Omit<TCommonProps, 'size' | 'shape'>;
}
