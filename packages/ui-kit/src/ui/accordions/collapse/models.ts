import { TSize as TSizeC } from '@/models';

import { NCommonAccordion } from '../_common/models';

/**
 * Неймспейс с типизацией NCollapse
 */

export namespace NCollapse {
  export type TCollapseExpandIconPosition = NCommonAccordion.TCollapseExpandIconPosition;
  export type TCollapseItem = NCommonAccordion.TCollapseItem;
  export type TCollapsible = NCommonAccordion.TCollapsible;
  export type TSize = TSizeC;

  export type TProps = NCommonAccordion.TBaseProps & {
    /**
     * Ключи активных панелей
     */
    activeKey?: (string | number)[] | string | number;
    /**
     * Ключи активных панелей по дефолту
     */
    defaultActiveKey?: (string | number)[] | string | number;

    /**
     * Изменение стилей при встраивании
     */
    isOutline?: boolean;

    /**
     * Если true, то элементы перетаскиваются
     */
    isDraggable?: boolean;
  };
}
