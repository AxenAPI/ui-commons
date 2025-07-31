import { NBurgerMenu } from "@/ui/burger-menu/models";
import { BurgerIcon } from "@/ui/burger-menu/components/BurgerIcon";
import { useState, FC } from 'react';
import { Button } from "@/ui";
import styles from './styles.module.css';

export const BurgerMenu: FC<NBurgerMenu.TProps> = (props) => {
  const {children, items = [], className = '', color, menuButtonClassName, ...restProps } = props;
  const [burgerOpen, setBurgerOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setBurgerOpen(prev => !prev);
  };

  const containerClasses = `${styles.container} ${className}`.trim();

  return (
    <div
      className={containerClasses}
      {...restProps}
    >
      <BurgerIcon isOpen={burgerOpen} onClick={handleBurgerMenuClick} color={color}/>

      {burgerOpen ? (
        <div className={styles.menuItems}>
          {items.map((item, index) => (
            <Button
              key={`${item.text}-${index}`}
              onClick={item.action}
              className={menuButtonClassName}
            >
              {item.text}
            </Button>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
};