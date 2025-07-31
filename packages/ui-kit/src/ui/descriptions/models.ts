import { CSSProperties, ReactNode } from 'react';

import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import { DescriptionsItemType } from 'antd/es/descriptions';
import { SemanticName } from 'antd/es/descriptions/DescriptionsContext';

export namespace NDescriptions {
  export type TDescriptionsProps = {
    /**
     * Отображение границ компонента
     */
    isBordered?: boolean;
    /**
     * Изменяет значение дефолтного пропса `colon` в Descriptions.Item.
     * Указывает, будет ли отображаться двоеточие после лейбла
     */
    isWithColon?: boolean;
    /**
     * Количество DescriptionItems в строке. Необходимо установить `bordered={true}` для этого
     */
    column?: number | Partial<Record<Breakpoint, number>>;
    /**
     * Область действий в списке описаний, расположенная в правом верхнем углу
     */
    extra?: ReactNode;
    /**
     * Содержимое элементов списка
     */
    items?: DescriptionsItemType[];
    /**
     * Расположение описания
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * Размер списка
     */
    size?: 'middle' | 'small' | 'default';
    /**
     * Наименование списка, расположен сверху
     */
    title?: ReactNode;
    /**
     * Семантический класс DOM
     */
    classNames?: Partial<Record<SemanticName, string>>;
    /**
     * Семантические стили DOM
     */
    styles?: Partial<Record<SemanticName, CSSProperties>>;
  };
}
