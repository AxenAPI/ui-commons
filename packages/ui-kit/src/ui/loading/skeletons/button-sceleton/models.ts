import { TCommonProps } from '../_common/models';

export namespace NButtonSkeleton {
  export type TProps = Omit<TCommonProps, 'size'> & {
    size?: 'large' | 'small' | 'default';
    /**
     * Состояние ширины кнопки относительно ее родителя
     */
    isBlock?: boolean;
  };
}
