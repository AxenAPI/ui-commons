import { IconHome } from '@tabler/icons-react';

import { NBreadcrumb } from '../models';

export const DEFAULT_ITEMS = [
  {
    title: 'Home',
  },
  {
    title: 'Application Center',
  },
  {
    title: 'Application List',
  },
  {
    title: 'An Application',
  },
];

export const WITH_ICON_ITEMS = [
  {
    href: '',
    icon: <IconHome />,
  },
  {
    href: '',
    title: 'Application List',
    icon: <IconHome />,
  },
  {
    title: 'Application',
  },
];

export const LAST_CRUMB_TITLE_WITH_ICON_ITEMS = [
  {
    href: '',
    icon: <IconHome />,
  },
  {
    href: '',
    title: 'Application List',
    icon: <IconHome />,
  },
  {
    title: 'Application',
    icon: <IconHome />,
  },
];

const MENU_ITEMS = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];

export const WITH_MENU_ITEMS = [
  {
    title: 'Ant Design',
  },
  {
    title: 'Component',
  },
  {
    title: 'General',
    menu: { items: MENU_ITEMS },
  },
  {
    title: 'Button',
  },
];

export const INDEPENDENT_SEPARATOR: NBreadcrumb.TItem[] = [
  {
    title: 'Location',
  },
  {
    type: 'separator',
    separator: ':',
  },
  {
    href: '',
    title: 'Application Center',
  },
  {
    type: 'separator',
  },
  {
    href: '',
    title: 'Application List',
  },
  {
    type: 'separator',
  },
  {
    title: 'An Application',
  },
];
