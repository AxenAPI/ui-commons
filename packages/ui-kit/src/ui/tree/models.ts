import { TreeDataNode, TreeNodeProps } from 'antd';
import type { CSSMotionProps } from 'rc-motion';

/**
 * Неймспейс с типизацией NTree
 */

export namespace NTree {
  export type TProps = {
    /*
     * Добавляет чек-бокс перед узлом
     */
    isCheckable?: boolean;
    /*
     * Определяет, должны ли родительские узлы автоматически проверяться при проверке дочерних узлов
     */
    isCheckStrictly?: boolean;
    /*
     * Ключи узлов, которые по умолчанию проверяются
     */
    defaultCheckedKeys?: React.Key[];
    /*
     * Ключи узлов, которые по умолчанию развёрнуты
     */
    defaultExpandedKeys?: React.Key[];
    /*
     * Ключи узлов, которые по умолчанию выбраны
     */
    defaultSelectedKeys?: React.Key[];
    /*
     * Отключает все узлы дерева
     */
    isDisabled?: boolean;
    /*
     * Ключи узлов, которые проверяются (управляемое свойство)
     */
    checkedKeys?: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] };
    /*
     * Ключи узлов, которые развёрнуты (управляемое свойство)
     */
    expandedKeys?: React.Key[];
    /*
     * Ключи узлов, которые выбраны (управляемое свойство)
     */
    selectedKeys?: React.Key[];
    /*
     * Обработчик события изменения проверки
     */
    onCheck?: (checkedKeys: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] }, info: any) => void;
    /*
     * Обработчик события изменения развёртывания
     */
    onExpand?: (expandedKeys: React.Key[], info: any) => void;
    /*
     * Обработчик события изменения выбора
     */
    onSelect?: (selectedKeys: React.Key[], info: any) => void;
    /*
     * Данные дерева
     */
    treeData?: TreeDataNode[];

    /*
     * Отключает перетаскивание узлов
     */
    isDraggable?: boolean;
    shouldAllowDrop?: ({ dropNode, dropPosition }: any) => boolean;

    /*
     * Определяет, должны ли дерево автоматически развернуться
     */
    isAutoExpandedParent?: boolean;

    /*
     * Определяет, должен ли узел ли заполнять всё допустимое горизонтальное пространство
     */
    isBlockNode?: boolean;

    /*
     * Определяет, должно ли дерево быть развернуто по умолчанию
     */
    isDefaultExpandAll?: boolean;

    /*
     * Определяет, должно ли родительские узлы быть развернуты по умолчанию
     */
    isDefaultExpandParent?: boolean;

    /*
     * Присваивает имя, ключ и дочерние узлы
     */
    fieldNames?: TFieldNames;

    /*
     * Функция для фильтрации узлов
     */
    isFilterTreeNode?: (node: any) => boolean;

    /*
     * Определяет высоту виртуального скролла. Горизонтальный будет отключен.
     */
    height?: number;

    /*
     * Добавляет иконку
     */
    icon?: React.ReactNode;

    /*
     * Асинхронно загружает данные
     */
    loadData?: (node: any) => Promise<any> | any;

    /*
     * Указывает загруженные узлы. Работает совместно с loadData
     */
    loadedKeys?: string[];

    /*
     * Позволяет выделить несколько узлов
     */
    isMultiple?: boolean;

    /*
     * Корневые стили
     */
    rootStyle?: React.CSSProperties;

    /*
     * Позволяет выбирать узлы
     */
    isSelectable?: boolean;

    /*
     * Определяет показывать ли узел с иконкой
     */
    isShowIcon?: boolean;

    /*
     * Определяет показывать ли линии
     */
    isShowLine?: boolean;

    /*
     * Добавляет иконку для сворачивания / развёртывания
     */
    switcherIcon?: React.ReactNode | (({ expanded }: { expanded?: boolean }) => React.ReactNode);

    /*
     * Добавляет иконку для загрузки
     */
    switcherLoadingIcon?: React.ReactNode;

    /*
     * Кастомизация узла заголовка
     */
    titleRender?: (node: any) => React.ReactNode;

    /*
     * Отключает виртуальный скролл, если ложь
     */
    isVirtual?: boolean;

    /*
     * Обработчики событий перетаскивания
     */
    onDragEnd?: ({ event, node }: { event: any; node: any }) => void;

    onDragEnter?: ({ event, node }: { event: any; node: any }) => void;

    onDragLeave?: ({ event, node }: { event: any; node: any }) => void;

    /*
     * Обработчик события опускания
     */
    onDrop?: ({
      event,
      node,
      dragNode,
      dragNodesKeys,
    }: {
      event: any;
      node: any;
      dragNode: any;
      dragNodesKeys: any;
    }) => void;

    /*
     * Обработчик события загрузки
     */
    onLoad?: (loadedKeys: any, { event, node }: { event: any; node: any }) => void;

    /*
     * Обработчик события нажатия правой кнопки мыши
     */
    onRightClick?: ({ event, node }: { event: any; node: any }) => void;

    motion?: CSSMotionProps;
  };

  export type TFieldNames = {
    title?: string;
    /** @private Для внутреннего использования с `rc-tree-select`, можно удалить, если не используется */
    _title?: string[];
    key?: string;
    children?: string;
  };

  export type TDataNode = TFieldDataNode<{
    key: TKey;
    title?: React.ReactNode | ((data: TDataNode) => React.ReactNode);
  }>;

  /** Предоставляет обертку для типов, когда требуется обернуть в кастомизированный тип fieldNames */
  export type TFieldDataNode<T, TChildFieldName extends string = 'children'> = TBasicDataNode &
    T &
    Partial<Record<TChildFieldName, TFieldDataNode<T, TChildFieldName>[]>>;

  /** Для fieldNames предоставляется абстрактный интерфейс */
  export type TBasicDataNode = {
    isCheckable?: boolean;
    isDisabled?: boolean;
    isDisableCheckbox?: boolean;
    icon?: TIcon;
    isLeaf?: boolean;
    isSelectable?: boolean;
    switcherIcon?: TIcon;
    /** Установить стили для TreeNode. Это не рекомендуется делать, если только нет жесткого требования к стилям */
    className?: string;
    style?: React.CSSProperties;
  };

  export type TIcon = React.ReactNode | ((props: TreeNodeProps) => React.ReactNode);
  export type TKey = React.Key;
}
