import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TreeDataNode } from 'antd';

import { Tree } from '@/ui';

export const MOCK_TREE_DATA: TreeDataNode[] = [
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
const mockProps = {
  treeData: MOCK_TREE_DATA,
};

describe('/ui/tree/Tree.tsx', () => {
  test('render default tree', () => {
    const { container } = render(<Tree {...mockProps} />);
    const treeElement = container.querySelector('.ant-tree-list');
    expect(treeElement).toBeInTheDocument();
    expect(screen.getByText('parent 1')).toBeInTheDocument();
  });

  test('renders child nodes correctly', () => {
    render(<Tree {...mockProps} isDefaultExpandAll />);
    const childNodes = screen.getAllByText(/leaf/i);
    expect(childNodes).toHaveLength(2);
  });

  test('renders styled child node correctly', () => {
    render(<Tree {...mockProps} isDefaultExpandAll />);
    const styledNode = screen.getByText(/sss/i);
    expect(styledNode).toBeInTheDocument();
    expect(styledNode.parentElement).toHaveStyle("color: '#1677ff'");
  });

  test('disables checkbox for specific leaf node', () => {
    render(<Tree {...mockProps} isDefaultExpandAll isCheckable />);
    const disabledCheckboxNode = screen.queryAllByText('leaf')?.[0]?.closest('div');
    expect(disabledCheckboxNode?.querySelector('span:nth-child(3)')).toHaveClass('ant-tree-checkbox-disabled');
  });

  test('renders disabled parent node correctly', () => {
    render(<Tree {...mockProps} isDefaultExpandAll isCheckable />);
    const disabledParentNode = screen.getByText('parent 1-0')?.closest('div');
    expect(disabledParentNode).toHaveClass('ant-tree-treenode-disabled');
  });
});
