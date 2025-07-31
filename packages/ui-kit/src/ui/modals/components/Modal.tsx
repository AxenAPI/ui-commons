import { IconX } from '@tabler/icons-react';

import { useTheme } from '@/providers';

import { CommonModal, type NCommonModal } from '../common';

/**
 * Компонент модального окна.
 * */
export function Modal({ closeIcon, ...rest }: NCommonModal.TModalProps) {
  const { theme } = useTheme();
  const closeIconSize = theme?.components?.Modal?.closeIconSize;

  return (
    <CommonModal
      {...rest}
      closeIcon={closeIcon ?? <IconX width={closeIconSize} height={closeIconSize} stroke={1.5} />}
    />
  );
}
