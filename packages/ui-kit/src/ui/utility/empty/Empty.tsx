import { CSSProperties, ReactNode } from 'react';

import { Empty as AntdEmpty } from 'antd';

export type TProps = {
  description?: ReactNode;
  image?: ReactNode;
  imageStyle?: CSSProperties;
  children?: ReactNode;
  style?: CSSProperties;
};

export function Empty(props: TProps) {
  return <AntdEmpty {...props}>{props.children}</AntdEmpty>;
}

Empty.PRESENTED_IMAGE_SIMPLE = AntdEmpty.PRESENTED_IMAGE_SIMPLE;
Empty.PRESENTED_IMAGE_DEFAULT = AntdEmpty.PRESENTED_IMAGE_DEFAULT;
