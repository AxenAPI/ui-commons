import { CSSProperties, ReactNode } from 'react';

import { AvatarProps as AntdAvatarProps } from 'antd';

/**
 * Неймспейс с типизацией NAvatar
 */
export namespace NAvatar {
  export type TProps = {
    alt?: string;
    draggable?: boolean;
    icon?: ReactNode;
    shape?: AntdAvatarProps['shape'];
    size?: AntdAvatarProps['size'];
    src?: AntdAvatarProps['src'];
    srcSet?: string;
    style?: CSSProperties;
    onError?: AntdAvatarProps['onError'];
  };
}
