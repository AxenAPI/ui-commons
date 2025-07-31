import { NTag } from '../tag';

export namespace NFilter {
  export type TProps = Omit<NTag.TProps, 'children'> & {
    /**
     * Название фильтра
     */
    label?: string;
    /**
     * Значения фильтра
     */
    items: string[];
    /**
     * Максимальная длина фильтра
     */
    controlMaxWidth?: number;
  };
}
