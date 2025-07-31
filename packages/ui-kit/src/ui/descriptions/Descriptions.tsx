import { FC } from 'react';

import { Descriptions as AntdDescriptions } from 'antd';

import { NDescriptions } from '@/ui/descriptions';

import './styles.module.scss';

export const Descriptions: FC<NDescriptions.TDescriptionsProps> = ({ isWithColon, isBordered, ...props }) => {
  return <AntdDescriptions colon={isWithColon} bordered={isBordered} {...props} />;
};
