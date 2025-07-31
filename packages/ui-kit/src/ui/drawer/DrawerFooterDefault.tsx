import { FC } from 'react';

import { Button } from '@/ui';

import { NDrawer } from './models';

import styles from './styles.module.scss';

export const DrawerFooterDefault: FC<NDrawer.TDefaultFooterProps> = ({
  onClose,
  cancelBtnText = 'Отменить',
  onCancel,
  acceptBtnText = 'Применить',
  onAccept,
}) => {
  const handleBtnCancelClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    onCancel?.();
    onClose?.(e);
  };

  return (
    <div className={styles.drawerFooter}>
      <Button type="primary" onClick={onAccept}>
        {acceptBtnText}
      </Button>
      <Button onClick={handleBtnCancelClick}>{cancelBtnText}</Button>
    </div>
  );
};
