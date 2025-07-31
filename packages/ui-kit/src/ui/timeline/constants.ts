import React from 'react';

import { IconAccessible } from '@tabler/icons-react';

export const TIMELINE_BASE_ITEMS = [
  { children: 'Create a services' },
  { children: 'Technical testing' },
  { children: 'Solve initial network problems' },
];

export const TIMELINE_ALTERNATE_ITEMS = [
  { label: '2015-09-01', children: 'Create a services' },
  { label: '2015-09-01', children: 'Solve initial network problems' },
  { children: 'Technical testing' },
  { label: '2015-09-01', children: 'Network problems being solved' },
];

export const TIMELINE_CUSTOM_COLORS_ITEMS = [
  { color: '#52c41a', children: 'Create a services' },
  { color: '#1890ff', children: 'Technical testing' },
  { color: '#f5222d', children: 'Solve initial network problems' },
];

export const TIMELINE_CUSTOM_ICONS_ITEMS = [
  { dot: React.createElement(IconAccessible), children: 'Create a services' },
  { children: 'Solve initial network problems' },
];

export const TIMELINE_HORIZONTAL_ITEMS = [
  {
    children: 'Create a services',
  },
  {
    color: '#f5222d',
    children: 'Solve initial network problems',
  },
  {
    dot: React.createElement(IconAccessible),
    children: 'Technical testing',
  },
  {
    children: 'Technical testing',
    contentPosition: 'top',
  },
];
