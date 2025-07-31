import { CSSProperties } from 'react';

import cn from 'classnames';

import { Button } from './Button';
import { TButtonsConfig } from './models';

import styles from './styles.module.css';

export type TProps = {
  buttonsConfig: TButtonsConfig[];
  className?: string;
  style?: CSSProperties;
};

export const ButtonsGroup = ({ buttonsConfig, className, style }: TProps) => {
  return (
    <div className={cn(styles.buttonsGroupContainer, className)} style={style}>
      {buttonsConfig?.map((button: TButtonsConfig) => {
        return <Button key={button?.buttonKey} {...button} />;
      })}
    </div>
  );
};
