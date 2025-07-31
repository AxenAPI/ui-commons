import { FC } from 'react';
import styles from '../styles.module.css';

interface IBurgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  color?: string;
}

export const BurgerIcon: FC<IBurgerIconProps> = ({ isOpen, onClick, color = 'black' }) => {
  const topLineClass = isOpen
    ? `${styles.line} ${styles.lineTopOpen}`
    : `${styles.line} ${styles.lineTopClosed}`;

  const middleLineClass = isOpen
    ? `${styles.line} ${styles.lineMiddleOpen}`
    : `${styles.line} ${styles.lineMiddleClosed}`;

  const bottomLineClass = isOpen
    ? `${styles.line} ${styles.lineBottomOpen}`
    : `${styles.line} ${styles.lineBottomClosed}`;

  const lineStyle = {
    backgroundColor: color
  };

  return (
    <button
      onClick={onClick}
      className={styles.button}
      aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
    >
      <div className={styles.iconContainer}>
        <span className={topLineClass} style={lineStyle} />
        <span className={middleLineClass} style={lineStyle} />
        <span className={bottomLineClass} style={lineStyle} />
      </div>
    </button>
  );
};