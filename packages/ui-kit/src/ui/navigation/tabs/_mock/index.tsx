import { BarsOutlined, SearchOutlined } from '@ant-design/icons';

import { Button } from '@/ui';

export const DEFAULT_ITEMS = [
  { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
  { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
];

export const WITH_BADGE_ITEMS = [
  { key: '1', label: 'Tab 13', children: 'Content of Tab Pane 1', hasBadge: true, badgeCount: 5 },
  { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2', hasBadge: false },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3', hasBadge: true, badgeCount: 6 },
];

export const WITH_ICON_ITEMS = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
    icon: <SearchOutlined />,
  },
  { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
];

export const WITH_EXTRA_ELEMENT_ITEMS = [
  {
    key: '1',
    label: 'Always',
    children: 'Content of Tab Pane 1',
    extraNode: { element: <Button size="small" icon={<BarsOutlined />} /> },
  },
  {
    key: '2',
    label: 'On hover',
    children: 'Content of Tab Pane 2',
    extraNode: { element: <Button size="small" icon={<BarsOutlined />} />, onHover: true },
  },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
];

export const DRAGGABLE_TABS_ITEMS = [
  { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
  { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
  { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
];
