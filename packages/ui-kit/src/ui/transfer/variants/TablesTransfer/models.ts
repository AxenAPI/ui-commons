import { ComponentProps, ReactNode } from 'react';

import { TAnyObject } from '@/models';

import { Card } from '../../../utility';
import { TransferTable } from './components';

export namespace NTablesTransfer {
  type TTitleFn = (selectedQuantity: number, overallQuantity: number) => ReactNode;
  type TExtraFn = (selectedQuantity: number, overallQuantity: number) => ReactNode;

  type TTableProps = Omit<
    ComponentProps<typeof TransferTable>,
    'added' | 'removed' | 'rowKey' | 'selected' | 'onSelect'
  > & {
    onSearch?: (search: string) => Promise<void> | void;
  };

  export type TProps<T extends TAnyObject = TAnyObject> = {
    /**
     * Классы CSS для корневого элемента.
     */
    className?: string;
    /**
     * Флаг, указывающий на однонаправленность передачи данных.
     */
    isOneWay?: boolean;
    /**
     * Классы CSS для левой карты.
     */
    leftCardClassNames?: ComponentProps<typeof Card>['classNames'];
    /**
     * Свойства для левой таблицы.
     */
    leftTableProps: TTableProps;
    /**
     * Переданные элементы в левую часть.
     */
    leftTransfered?: T[];
    leftSelected?: T[];
    /**
     * Обработчик передачи данных между таблицами.
     */
    onTransfer: (left: T[], right: T[]) => Promise<void> | void;
    /**
     * Классы CSS для правой карты.
     */
    rightCardClassNames?: ComponentProps<typeof Card>['classNames'];
    /**
     * Свойства для правой таблицы.
     */
    rightTableProps: TTableProps;
    /**
     * Переданные элементы в правую часть.
     */
    rightTransfered?: T[];
    /**
     * Выбранные элементы в правой части.
     */
    rightSelected?: T[];
    /**
     * Ключ строки для идентификации элементов.
     */
    rowKey?: keyof T;
    /**
     * Заголовки для левой и правой таблиц.
     */
    titles?: [TTitleFn | null, TTitleFn | null];
    /**
     * Пользовательский текст для случая отсутствия данных
     */
    customNotFoundText?: string;
    /**
     * Пользовательская иконка для случая отсутствия данных
     */
    customNotFoundImage?: React.ReactNode;
    /**
     * Пользовательский текст для случая отсутствия данных при поиске
     */
    customSearchNotFoundText?: string;
    /**
     * Пользовательская иконка для случая отсутствия данных при поиске
     */
    customSearchNotFoundImage?: React.ReactNode;
    /**
     * Флаг блокировки
     */
    isDisabled?: boolean;
    /**
     * Дополнительный компонент для левой и правой таблиц.
     */
    extra?: [TExtraFn | null, TExtraFn | null];
    /**
     * Отображение кнопки поиска, если необходимо
     */
    withSearchButton?: boolean;
    /**
     * Максимальная длина строки для поиска.
     */
    maxLengthSearch?: number;
    /**
     * Поиск по добавленым элементам
     */
    onAddedSearch?: (record: T, search: string) => boolean;
    /**
     * Обработчик выбора записей в левой колонке
     */
    onSelectLeft?: (record: T[]) => void;
    /**
     * Обработчик выбора записей в правой колонке
     */
    onSelectRight?: (record: T[]) => void;
  };
}
