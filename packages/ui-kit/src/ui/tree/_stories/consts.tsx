import {
  IconGitMerge,
  IconList,
  IconMoodConfuzed,
  IconMoodConfuzedFilled,
  IconMoodEmpty,
  IconMoodSmile,
  IconSitemap,
} from '@tabler/icons-react';

import { TreeDataNode } from 'antd';

import { Button } from '@/ui/buttons';

import { CustomTreeTitle } from '../CustomTreeTitle';

export const BASIC_TREE_DATA: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

export const ICON_TREE_DATA: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <IconMoodSmile size={18} stroke={1.5} />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <IconMoodEmpty size={18} stroke={1.5} />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }) =>
          selected ? <IconMoodConfuzedFilled size={18} stroke={1.5} /> : <IconMoodConfuzed size={18} stroke={1.5} />,
      },
    ],
  },
];

export const CUSTOM_TITLE_DATA: TreeDataNode[] = [
  {
    title: (
      <CustomTreeTitle
        showCustomTitle="always"
        title="parent 1 (always on)"
        elementToDisplay={<Button size="small" icon={<IconList />} />}
      />
    ),
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <CustomTreeTitle
                showCustomTitle="onHover"
                title="child 1 (on hover)"
                elementToDisplay={<Button size="small" icon={<IconList />} />}
              />
            ),
            key: '0-0-1-0',
          },
          {
            title: (
              <CustomTreeTitle
                showCustomTitle="always"
                title="child 2 (large)"
                titleHeight="large"
                elementToDisplay={<Button size="small" icon={<IconList />} />}
              />
            ),

            key: '0-0-2-0',
          },
        ],
      },
    ],
  },
];

export const TREE_SELECT_DATA = [
  {
    title: 'Node1 with a very very very very very very long name',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Child Node2',
            value: '0-0-0-0',
            key: '0-0-0-0',
          },
        ],
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export const TREE_SELECT_MANY_DATA = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export const TREE_SELECT_SUBTITLE_DATA = [
  {
    label: 'Лейбл',
    subLabel: 'Под лейбл',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
        label: 'Лейбл1',
        subLabel: 'Под лейбл1',
        iconLabel: <IconGitMerge />,
        children: [
          {
            title: 'Child Node2',
            value: '0-0-0-0',
            key: '0-0-0-0',
            iconLabel: <IconGitMerge />,
            label: 'Лейбл8',
            subLabel: 'Под лейбл8',
          },
        ],
      },
    ],
  },
  {
    value: '0-1',
    label: 'Лейбл ddddddddddddddd2',
    subLabel: 'Под лейб',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
        iconLabel: <IconGitMerge />,
        label: 'ЛейблЛейбл Лейбл Лейбл',
        subLabel: 'Под лейddddddd ddddбл3',
        titlePopup: 'Это дочерний элемент',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
        label: 'Лейбл4',
        iconLabel: <IconGitMerge />,
        subLabel: 'Под лейбл4',
        titlePopup: 'Это дочерний элемент',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
        label: 'Лейбл5',
        iconLabel: <IconGitMerge />,
        subLabel: 'Под лейбл5',
        titlePopup: 'Это дочерний элемент',
      },
    ],
  },
];

export const OPTIONS_SELECT_ICON = [
  {
    value: '1',
    label: (
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <IconSitemap style={{ marginRight: 4 }} />
        Поиск по иерархии
      </div>
    ),
    labelRender: <IconSitemap />,
  },
  {
    value: '2',
    label: (
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <IconList style={{ marginRight: 4 }} />
        Поиск по значению
      </div>
    ),
    labelRender: <IconList />,
  },
];
