import { FC } from 'react';

import { Avatar as AntdAvatar } from 'antd';

import { NAvatar } from './model';

/**
 * Компонент аватара
 */
export const Avatar: FC<NAvatar.TProps> = props => <AntdAvatar {...props} />;
