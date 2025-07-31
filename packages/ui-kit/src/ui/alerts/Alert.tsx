import { FC } from 'react';

import { Alert as AntdAlert } from 'antd';

import { NAlert } from './models';

/**
 * Компонент объявления
 * */
export const Alert: FC<NAlert.TProps> = props => <AntdAlert {...props} />;
