import { ComponentType, MouseEvent, ReactNode } from 'react';

import { NFileInput } from '@/ui';
import { NCommonModal } from '@/ui/modals/common';

export namespace NModalDocument {
  export type TModalDocument = {
    fileSettings?: NFileInput.TProps;
    descriptionFileModal?: ReactNode;
    titleFileModal?: ReactNode;
    iconFileModal?: ReactNode;
  } & NCommonModal.TModalProps;

  export type TBtnClickEvent = MouseEvent<HTMLButtonElement>;
  export type TBtnClickHandler = (event: MouseEvent<HTMLButtonElement>) => void;

  export type TModalButtonProps<T extends { onClick: TBtnClickHandler }> = {
    /**
     * Cсылка на компонент кнопки открытия
     */
    Button: ComponentType<T>;
    /**
     * Cсылка на компонент кнопки открытия
     */
    buttonProps: T;
    /**
     * Флаг начального состояния компонента
     */
    initialIsOpen?: boolean;
  } & Omit<NCommonModal.TModalProps, 'isOpen'>;
}
