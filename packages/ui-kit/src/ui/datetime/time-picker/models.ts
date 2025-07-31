import type { TSize as TSizeC, TVariant as TVariantC } from '@/models/ui';

import { NDateTime } from '../_common/models';

/**
 * Неймспейс с типизацией NTimePicker
 */

export namespace NTimePicker {
  export type TPlacement = NDateTime.TPlacement;
  export type TSize = TSizeC;
  export type TStatus = NDateTime.TStatus;
  export type TVariant = TVariantC;

  export type TProps = NDateTime.TTimePickerProps;
}
