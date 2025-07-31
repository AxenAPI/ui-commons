import { CSSProperties, ReactNode } from 'react';

import { AlertProps as AntdAlertProps } from 'antd';

import { TProcedure } from '@/models';

/**
 * Неймспейс с типизацией NAlert
 */

export namespace NAlert {
  export type TProps = {
    closable?: boolean;
    description?: ReactNode;
    icon?: ReactNode;
    message?: ReactNode;
    onClose?: TProcedure;
    showIcon?: boolean;
    type?: AntdAlertProps['type'];
    style?: CSSProperties;
  };
}
