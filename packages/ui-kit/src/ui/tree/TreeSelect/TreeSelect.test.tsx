import { DownCircleOutlined } from '@ant-design/icons';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TreeSelect } from '@/ui';

export const mockTreeData = [
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

describe('TreeSelect Component', () => {
  test('renders correctly with default props', () => {
    render(<TreeSelect treeData={mockTreeData} />);
    expect(screen.getByText('Выберите значение')).toBeInTheDocument();
  });

  test('renders correctly with Checkable', () => {
    const { container } = render(<TreeSelect treeData={mockTreeData} value={['0-0-0']} isTreeCheckable />);
    const treeSelectElement = container.querySelector(
      '.ant-select-selector .ant-select-selection-overflow-item .ant-select-selection-item'
    );
    expect(treeSelectElement).toBeInTheDocument();
    expect(screen.getByText('Child Node2')).toBeInTheDocument();
  });

  test('renders correctly select open', () => {
    const { container } = render(<TreeSelect treeData={mockTreeData} isOpen isTreeCheckable />);
    const treeSelectElement = container.querySelector('.ant-tree-select.ant-select-open');
    expect(treeSelectElement).toBeInTheDocument();
    expect(screen.getByText('Node1 with a very very very very very very long name')).toBeInTheDocument();
  });

  test('renders correctly with custom switcher icon', () => {
    render(<TreeSelect treeData={mockTreeData} switcherIcon={<DownCircleOutlined />} isOpen />);
    const node = screen.getByText('Node1 with a very very very very very very long name');
    const icon = node?.parentElement?.parentElement?.querySelector(
      '.ant-select-tree-switcher .anticon-down-circle svg'
    );
    expect(icon).toBeInTheDocument();
  });

  test('renders correctly multiple selection', () => {
    const { container } = render(<TreeSelect treeData={mockTreeData} isMultiple isAllowClear />);
    const node = container.querySelector('.ant-select.ant-select-multiple');
    expect(node).toBeInTheDocument();
  });
});
