import { FC } from 'react';

import { Image as AntdImage } from 'antd';

import { NImage } from './models';

export const PreviewGroup: FC<NImage.TPreviewGroupProps> = ({ ...rest }) => <AntdImage.PreviewGroup {...rest} />;
