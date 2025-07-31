import {
  IconCategory,
  IconChartPie,
  IconCircleCheck,
  IconContainer,
  IconDeviceDesktop,
  IconFiles,
  IconList,
  IconMail,
  IconSettings,
  IconTool,
} from '@tabler/icons-react';

import { ItemType } from 'antd/lib/menu/interface';

export const DEFAULT_ITEMS: ItemType[] = [
  {
    label: 'Navigation One',
    key: 'mail1',
  },
  {
    label: 'Navigation two',
    key: 'mail2',
  },
  {
    label: 'Navigation three',
    key: 'mail3',
  },
];

export const TOP_NAVIGATION: ItemType[] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <IconMail />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <IconCategory />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <IconSettings />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { label: 'Option 1', key: 'setting:1' },
          { label: 'Option 2', key: 'setting:2' },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { label: 'Option 3', key: 'setting:3' },
          { label: 'Option 4', key: 'setting:4' },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

export const INLINE_NAVIGATION: ItemType[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <IconMail />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <IconCategory />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <IconSettings />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

export const COLLAPSED_INLINE: ItemType[] = [
  { key: '1', icon: <IconChartPie />, label: 'Option 1' },
  { key: '2', icon: <IconDeviceDesktop />, label: 'Option 2' },
  { key: '3', icon: <IconContainer />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <IconMail />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <IconCategory />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

export const OPEN_CURRENT_SUBMENU: ItemType[] = [
  {
    key: '1',
    icon: <IconMail />,
    label: 'Navigation One',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' },
    ],
  },
  {
    key: '2',
    icon: <IconCategory />,
    label: 'Navigation Two',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' },
        ],
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: <IconSettings />,
    label: 'Navigation Three',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
      { key: '33', label: 'Option 3' },
      { key: '34', label: 'Option 4' },
    ],
  },
];

export const STORYBOOK_ITEMS: ItemType[] = [
  {
    label: 'Конструктор отчётов',
    key: 'mail1',
    icon: <IconTool />,
  },
  {
    label: 'Репроцессинг',
    key: 'mail2',
    icon: <IconCircleCheck />,
  },
  {
    label: 'Справочники',
    key: 'mail3',
    icon: <IconFiles />,
  },
  {
    label: 'Продуктовый каталог',
    key: 'mail4',
    icon: <IconList />,
  },
  {
    label: 'Конструктор отчётов',
    key: 'mail1',
    icon: <IconTool />,
  },
  {
    label: 'Репроцессинг',
    key: 'mail2',
    icon: <IconCircleCheck />,
  },
  {
    label: 'Справочники',
    key: 'mail3',
    icon: <IconFiles />,
  },
  {
    label: 'Продуктовый каталог',
    key: 'mail4',
    icon: <IconList />,
  },
];
