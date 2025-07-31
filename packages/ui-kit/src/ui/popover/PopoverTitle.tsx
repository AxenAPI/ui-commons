import { IconX } from '@tabler/icons-react';

import { Button } from '@/ui';
import { NPopover } from '@/ui/popover/models.ts';

import styles from './styles.module.css';

export const PopoverTitle = ({
  title,
  headerButton,
  showHeaderButtons,
  showCloseIcon,
  handleClose,
}: NPopover.TProps) => {
  const titleContent = typeof title === 'function' ? title() : title;

  if (showHeaderButtons) {
    return (
      <div className={styles.header}>
        <span>{titleContent}</span>
        <div>
          {headerButton}
          <Button className={styles.button} size="middle" type="text" onClick={handleClose} icon={<IconX />} />
        </div>
      </div>
    );
  }

  if (showCloseIcon) {
    return (
      <div className={styles.header}>
        <span>{titleContent}</span>
        <Button className={styles.button} size="middle" type="text" onClick={handleClose} icon={<IconX />} />
      </div>
    );
  }

  return titleContent;
};
