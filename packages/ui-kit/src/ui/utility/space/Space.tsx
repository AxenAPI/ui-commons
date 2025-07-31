import { Space as AntdSpace } from 'antd';

import { NSpace } from './models';

/**
 * Контейнер для установки отступов детям
 * */
export function Space(props: NSpace.TProps) {
  return <AntdSpace {...props} />;
}

Space.Compact = AntdSpace.Compact;
