import { Flex as AFlex } from 'antd';

import { TAnyObject } from '@/models';

import { NFlex } from './models';

/**
 * Компонент-контейнер для позиционирования потомком с помощью dislay: flex
 */
export const Flex = <P = TAnyObject,>(props: NFlex.TProps<P>) => <AFlex {...props} />;
