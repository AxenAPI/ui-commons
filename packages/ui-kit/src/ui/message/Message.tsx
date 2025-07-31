import { FC, useEffect } from 'react';

import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconExclamationCircleFilled,
  IconLoader2,
} from '@tabler/icons-react';

import cn from 'classnames';

import { useComponentTokens } from '@/providers';
import { Icon } from '@/ui/utility/icon/Icon';

import type { NMessage } from './models';

import styles from './styles.module.css';

const ICONS: Record<NMessage.TType, React.ReactNode> = {
  normal: <Icon icon={<IconAlertCircleFilled className={styles.iconNormal} />} size={20} type="primary" />,
  success: <Icon icon={<IconCircleCheckFilled className={styles.iconSuccess} />} size={20} type="primary" />,
  error: <Icon icon={<IconCircleXFilled className={styles.iconError} />} size={20} type="primary" />,
  warning: <Icon icon={<IconExclamationCircleFilled className={styles.iconWarning} />} size={20} type="primary" />,
  loading: (
    <Icon icon={<IconLoader2 className={cn(styles.iconLoading, styles.loaderSpin)} />} size={20} type="primary" />
  ),
};

export const Message: FC<NMessage.TProps> = ({
  type = 'normal',
  content,
  className,
  style,
  icon,
  duration,
  onClose,
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const tokens = useComponentTokens('Message');

  const cssVars = {
    ...(tokens.paddingContentVertical && { '--message-paddingContentVertical': `${tokens.paddingContentVertical}px` }),
    ...(tokens.paddingSM && { '--message-paddingSM': `${tokens.paddingSM}px` }),
    ...(tokens.borderRadiusLG && { '--message-borderRadiusLG': `${tokens.borderRadiusLG}px` }),
    ...(tokens.fontSize && { '--fontSize': `${tokens.fontSize}px` }),
    ...(tokens.lineHeight && { '--message-line-height': tokens.lineHeight }),
    ...(tokens.fontFamily && { '--message-font-family': tokens.fontFamily }),
    ...(tokens.colorText && { '--colorText': tokens.colorText }),
    ...(tokens.contentBg && { '--message-contentBg': tokens.contentBg }),
    ...(tokens.boxShadow && { '--message-boxShadow': tokens.boxShadow }),
    ...(tokens.colorInfo && { '--message-colorInfo': tokens.colorInfo }),
    ...(tokens.colorSuccess && { '--message-colorSuccess': tokens.colorSuccess }),
    ...(tokens.colorError && { '--message-colorError': tokens.colorError }),
    ...(tokens.colorWarning && { '--message-colorWarning': tokens.colorWarning }),
    ...(tokens.colorNornal && { '--message-colorNormal': tokens.colorNornal }),
  };

  return (
    <div
      className={cn(styles.message, styles[type], className)}
      style={{ ...(style || {}), ...(cssVars as React.CSSProperties) }}
      role="alert"
    >
      <span className={styles.iconWrap}>{icon ?? ICONS[type]}</span>
      <span>{content}</span>
    </div>
  );
};
