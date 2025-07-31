import { FC } from 'react';

import { IconChevronRight } from '@tabler/icons-react';

import { useTheme } from '@/providers';

import { NCommonAccordion } from '../models';

import styles from './style.module.css';

export const CustomExpandIcon: FC<NCommonAccordion.TPanelProps> = ({ isActive }: NCommonAccordion.TPanelProps) => {
  const { theme } = useTheme();
  const iconSize = theme?.components?.Collapse?.fontSizeIcon;
  return (
    <div
      className={styles.chevron}
      style={{
        transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      <IconChevronRight width={iconSize} height={iconSize} stroke={1.5} />
    </div>
  );
};
