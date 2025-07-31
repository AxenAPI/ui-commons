import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { NTag } from '../models';
import { TTagBorderless, TTagIcon } from './models';

export const TAG_COLORS: NTag.TTagPresetColor[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

export const TAG_ICONS: TTagIcon[] = [
  { icon: <CheckCircleOutlined />, color: 'green', text: 'success' },
  { icon: <SyncOutlined spin />, color: 'blue', text: 'processing' },
  { icon: <CloseCircleOutlined />, color: 'red', text: 'error' },
  { icon: <ClockCircleOutlined />, text: 'waiting' },
  { icon: <MinusCircleOutlined />, text: 'stop' },
];

export const TAG_BORDERLESS: TTagBorderless[] = [
  { text: 'Tag 1' },
  { isClosable: true, text: 'Tag 2' },
  { icon: <CheckCircleOutlined />, color: 'green', text: 'success' },
  { icon: <SyncOutlined spin />, color: 'blue', text: 'processing' },
  { icon: <CloseCircleOutlined />, color: 'red', text: 'error' },
];
