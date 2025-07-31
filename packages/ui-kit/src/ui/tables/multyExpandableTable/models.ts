import { TAnyObject } from '@/models';
import { NCommonTable } from '@/ui';
import { NTable } from '@/ui/tables/models/model.ts';

/**
 * Неймспейс с типизацией NMultiExpandTable
 */

export namespace NMultiExpandTable {
  export type TMultiExpandProps = NTable.TTableProps<TAnyObject> & {
    /**
     * Ключ, по которому группируем
     */
    groupedKey: string[];
    /**
     * Раскрыты ли группы по умолчанию
     */
    isExpandedByDefault?: boolean;
    /**
     * Уникальный ключ строки
     */
    rowKey: string | NCommonTable.TGetRowKey<TAnyObject>;
  };
}
