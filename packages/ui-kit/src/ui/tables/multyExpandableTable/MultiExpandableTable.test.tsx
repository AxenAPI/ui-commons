import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { MultiExpandTable } from './MultiExpandableTable';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    };
});

const mockData = [
  { id: 1, name: 'Item 1', category: 'Group A' },
  { id: 2, name: 'Item 2', category: 'Group A' },
  { id: 3, name: 'Item 3', category: 'Group B' },
];

describe('MultiExpandTable', () => {
  test('renders grouped rows collapsed by default', () => {
    render(
      <MultiExpandTable
        data={mockData}
        groupedKey={['category']}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        rowKey="id"
      />
    );

    expect(screen.getByText('Group A')).toBeInTheDocument();
    expect(screen.getByText('Group B')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();

    expect(document.querySelector('[data-row-key="group-Group A"]')).toBeInTheDocument();
  });

  test('renders grouped rows expanded by default', () => {
    render(
      <MultiExpandTable
        data={mockData}
        groupedKey={['category']}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        rowKey="id"
        isExpandedByDefault
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    const rows = document.querySelectorAll('[data-row-key]');
    const childRow = Array.from(rows).find(row => row.innerHTML.includes('Item 1'));
    expect(childRow?.getAttribute('data-row-key')).toBe('1');
  });

  test('expands a group when clicked', () => {
    render(
      <MultiExpandTable
        data={mockData}
        groupedKey={['category']}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        rowKey="id"
      />
    );

    const groupRow = screen.getByText('Group A');
    fireEvent.click(groupRow);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('calls setTableState when pagination changes', () => {
    render(
      <MultiExpandTable
        data={mockData}
        groupedKey={['category']}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        rowKey="id"
        pagination={{ pageSize: 1, current: 1, total: 3 }}
      />
    );

    const page2 = screen.getByText('2');
    fireEvent.click(page2);
    expect(page2.closest('li')).toHaveClass('ant-pagination-item-active');
  });

  test('does not render pagination when disabled', () => {
    render(
      <MultiExpandTable
        data={mockData}
        groupedKey={['category']}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        rowKey="id"
        pagination={false}
      />
    );

    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });
});
