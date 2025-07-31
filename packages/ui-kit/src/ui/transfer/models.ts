import { CSSProperties } from 'react';

/**
 * Неймспейс с типизацией Transfer
 */
export namespace NTransfer {
  export type TRecordBaseType = {
    key: string;
  };

  export type TRecordType = {
    title: string;
    description: string;
  } & TRecordBaseType;
  export type TTransferKey = React.Key;
  export type TPaginationType =
    | boolean
    | {
        pageSize?: number;
        simple?: boolean;
        showSizeChanger?: boolean;
        showLessItems?: boolean;
      };

  type TTransferDirection = 'left' | 'right';

  type TListStyle = {
    direction: TTransferDirection;
  };

  type TRenderResultObject = {
    label: React.ReactElement;
    value: string;
  };

  type TRenderResult = React.ReactElement | TRenderResultObject | string | null;

  type TTransferRender<TRecordType> = (item: TRecordType) => TRenderResult;

  type TTransferLocale = {
    titles?: React.ReactNode[];
    notFoundContent?: React.ReactNode | React.ReactNode[];
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
    remove?: string;
    selectAll?: string;
    deselectAll?: string;
    selectCurrent?: string;
    selectInvert?: string;
    removeAll?: string;
    removeCurrent?: string;
  };

  type TSelectAllLabel = React.ReactNode | ((info: { selectedCount: number; totalCount: number }) => React.ReactNode);

  type TRenderedItem<TRecordType> = {
    renderedText: string;
    renderedEl: React.ReactNode;
    item: TRecordType;
  };

  export const OmitProps = ['handleFilter', 'handleClear', 'checkedKeys'] as const;

  type TOmitProp = (typeof OmitProps)[number];

  type TTransferListProps<TRecordType> = {
    prefixCls: string;
    titleText: React.ReactNode;
    dataSource: TRecordType[];
    isFilterOption?: (filterText: string, item: TRecordType, direction: TTransferDirection) => boolean;
    style?: React.CSSProperties;
    checkedKeys: TTransferKey[];
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onItemSelect: (key: TTransferKey, check: boolean, e?: React.MouseEvent<Element, MouseEvent>) => void;
    onItemSelectAll: (dataSource: TTransferKey[], checkAll: boolean | 'replace') => void;
    onItemRemove?: (keys: TTransferKey[]) => void;
    handleClear: () => void;
    /** Render item */
    render?: (item: TRecordType) => TRenderResult;
    isShowSearch?: boolean;
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
    renderList?: TRenderListFunction<TRecordType>;
    footer?: (props: TTransferListProps<TRecordType>, info?: { direction: TTransferDirection }) => React.ReactNode;
    onScroll: (e: React.UIEvent<HTMLUListElement, UIEvent>) => void;
    isDisabled?: boolean;
    direction: TTransferDirection;
    isShowSelectAll?: boolean;
    selectAllLabel?: TSelectAllLabel;
    isShowRemove?: boolean;
    pagination?: TPaginationType;
    selectionsIcon?: React.ReactNode;
  } & TTransferLocale;

  type TPartialTransferListProps<TRecordType> = Omit<TTransferListProps<TRecordType>, TOmitProp>;

  type TTransferListBodyProps<TRecordType> = {
    filteredItems: TRecordType[];
    filteredRenderItems: TRenderedItem<TRecordType>[];
    selectedKeys: TTransferKey[];
  } & TPartialTransferListProps<TRecordType>;

  type TRenderListFunction<T> = (props: TTransferListBodyProps<T>) => React.ReactNode;

  type TTransferCustomListBodyProps<T> = NonNullable<unknown> & TTransferListBodyProps<T>;

  type TInputStatus = '' | 'warning' | 'error';

  export type TProps<TCustomData extends TRecordBaseType = TRecordType> = {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    /**
     * Указывает, отключен ли компонент
     */
    isDisabled?: boolean;
    /**
     * Используется для настройки исходных данных. Элементы, являющиеся частью этого массива, будут представлены в левом столбце. За исключением элементов, ключи которых включены в свойство targetKeys
     */
    dataSource?: TCustomData[];
    /**
     * Набор ключей элементов, которые указаны в правом столбце
     */
    targetKeys?: TTransferKey[];
    /**
     * Набор ключей элементов, которые указаны в правом столбце
     */
    selectedKeys?: TTransferKey[];
    render?: TTransferRender<TCustomData>;
    onChange?: (targetKeys: TTransferKey[], direction: TTransferDirection, moveKeys: TTransferKey[]) => void;
    onSelectChange?: (sourceSelectedKeys: TTransferKey[], targetSelectedKeys: TTransferKey[]) => void;
    /**
     * Стили
     */
    style?: React.CSSProperties;
    /**
     * Пользовательский стиль CSS, используемый для отображения столбцов передачи
     */
    listStyle?: ((style: TListStyle) => CSSProperties) | CSSProperties;
    /**
     * Стили операций
     */
    operationStyle?: CSSProperties;
    /**
     * Набор заголовков, отсортированных слева направо.
     */
    titles?: React.ReactNode[];
    /**
     * Набор операций, отсортированных сверху вниз.
     */
    operations?: string[];
    /**
     * Отображение поле поиска в каждом столбце.
     */
    isShowSearch?: boolean;
    /**
     * Метод для определения, должен ли элемент отображаться в списке результатов поиска, работает только при поиске
     */
    isFilterOption?: (inputValue: string, item: TCustomData, direction: TTransferDirection) => boolean;
    locale?: Partial<TTransferLocale>;
    /**
     * Метод для рендеринга нижнего колонтитула
     */
    footer?: (props: TTransferListProps<TCustomData>, info?: { direction: TTransferDirection }) => React.ReactNode;
    rowKey?: (record: TCustomData) => TTransferKey;
    onSearch?: (direction: TTransferDirection, value: string) => void;
    onScroll?: (direction: TTransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => void;
    children?: (props: TTransferCustomListBodyProps<TCustomData>) => React.ReactNode;
    /**
     * Показать флажок «Выбрать все» в заголовке
     */
    isShowSelectAll?: boolean;
    selectAllLabels?: TSelectAllLabel[];
    /**
     * Отображание как однонаправленный компонент
     */
    isOneWay?: boolean;
    /**
     * Используйте нумерацию страниц. Не работает в рендеринге реквизита
     */
    pagination?: TPaginationType;
    /**
     * Установить статус проверки
     */
    status?: TInputStatus;
    /**
     * Пользовательский значок раскрывающегося списка
     */
    selectionsIcon?: React.ReactNode;

    /**
     * Пользовательские ширины для колонок
     */
    listsWidths?: (string | number)[];
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
     * Показывает иконку шеврона оригинального dropdown с дополнительными действиями по выделению элементов
     * @default false
     */
    withDefaultSelectionActions?: boolean;
    /**
     * Отображение кнопки поиска, если необходимо
     */
    withSearchButton?: boolean;
  };
}
