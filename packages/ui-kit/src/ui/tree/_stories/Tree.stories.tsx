import { ReactNode } from 'react';

import { DownCircleOutlined, DownOutlined } from '@ant-design/icons';
import { Meta, StoryFn } from '@storybook/react';

import initCollapseMotion from 'antd/lib/_util/motion';
import type { CSSMotionProps } from 'rc-motion';

import { NTree } from '../models';
import { Tree } from '../Tree';
import { BASIC_TREE_DATA, CUSTOM_TITLE_DATA, ICON_TREE_DATA } from './consts';

const meta: Meta<NTree.TProps> = {
  title: 'Axenix UI/Tree/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    treeData: { control: 'object' },
  },
};

export default meta;

const Template: StoryFn<NTree.TProps> = (args: NTree.TProps) => <Tree {...args} />;

export const Default = Template.bind({});

Default.args = {
  treeData: BASIC_TREE_DATA,
};

export const WithMotion = Template.bind({});

const motion: CSSMotionProps = {
  ...initCollapseMotion('ant'),
  motionDeadline: 500,
};

WithMotion.args = {
  treeData: BASIC_TREE_DATA,
  motion: motion,
};

export const Basic = Template.bind({});
Basic.args = {
  isCheckable: true,
  defaultExpandedKeys: ['0-0-0', '0-0-1'],
  defaultSelectedKeys: ['0-0-0', '0-0-1'],
  defaultCheckedKeys: ['0-0-0', '0-0-1'],
  treeData: BASIC_TREE_DATA,
};

export const CustomizeIcon = Template.bind({});
CustomizeIcon.args = {
  isShowIcon: true,
  isDefaultExpandAll: true,
  defaultSelectedKeys: ['0-0-0'],
  switcherIcon: <DownOutlined />,
  treeData: ICON_TREE_DATA,
};

export const CustomizeOpenCollapseIcon = Template.bind({});
CustomizeOpenCollapseIcon.args = {
  isShowIcon: true,
  isDefaultExpandAll: true,
  defaultSelectedKeys: ['0-0-0'],
  switcherIcon: <DownCircleOutlined />,
  treeData: ICON_TREE_DATA,
};

export const CustomizeTitle = Template.bind({});
CustomizeTitle.args = {
  isCheckable: true,
  defaultExpandedKeys: ['0-0-0', '0-0-1'],
  defaultSelectedKeys: ['0-0-0', '0-0-1'],
  defaultCheckedKeys: ['0-0-0', '0-0-1'],
  treeData: CUSTOM_TITLE_DATA,
};

export const EmbeddedExample = (argTypes: NTree.TProps): ReactNode => {
  return (
    <div style={{ display: 'flex', border: '1px solid orange', padding: '5px', gap: '5px' }}>
      <div style={{ width: '300px', border: '1px solid green', padding: '5px' }}>
        <Tree
          {...argTypes}
          isCheckable
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          treeData={CUSTOM_TITLE_DATA}
        />
      </div>
      <div
        style={{
          width: '300px',
          height: '300px',
          border: '1px solid grey',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Some content
      </div>
    </div>
  );
};
