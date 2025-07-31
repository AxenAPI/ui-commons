import { TSize as TSizeC } from '@/models';

import { NCommonAccordion } from '../_common/models';

/**
 * Неймспейс с типизацией NAccordion
 */

export namespace NAccordion {
  export type TCollapseExpandIconPosition = NCommonAccordion.TCollapseExpandIconPosition;
  export type TCollapseItem = NCommonAccordion.TCollapseItem;
  export type TCollapsible = NCommonAccordion.TCollapsible;
  export type TSize = TSizeC;

  export type TProps = NCommonAccordion.TBaseProps & {
    /**
     * Ключи активных панелей
     */
    activeKey?: string | number;
  };
}
