import { FC } from 'react';

import { Spin as AntSpin } from 'antd';
import cn from 'classnames';

import { NPageSpinner } from './models';

import styles from './styles.module.css';

export const PageSpinner: FC<NPageSpinner.TProps> = ({
  isFullscreen,
  isSpinning,
  rootClassName,
  className,
  isFullContent,
  ...rest
}) => {
  return (
    <AntSpin
      {...rest}
      className={cn({ [styles.spinContent]: isFullContent }, className)}
      rootClassName={cn(styles.spin, rootClassName)}
      spinning={isSpinning}
      fullscreen={isFullscreen}
    />
  );
};
