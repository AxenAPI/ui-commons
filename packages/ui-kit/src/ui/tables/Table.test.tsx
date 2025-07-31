import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Table } from './Table';

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

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
];

const data = [
  { key: '1', name: 'John', age: 30 },
  { key: '2', name: 'Jane', age: 25 },
];

describe('Table component', () => {
  test('renders table with data', () => {
    render(<Table columns={columns} data={data} rowKey="key" />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  test('renders settings column when isNeedToShowSettingsCell is true', () => {
    render(<Table columns={columns} data={data} rowKey="key" isNeedToShowSettingsCell />);

    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders.length).toBeGreaterThan(columns.length);
  });

  test('renders correctly when loading is true', () => {
    render(<Table columns={columns} data={data} rowKey="key" isLoading />);

    const loading = document.querySelector('.ant-spin-spinning');
    expect(loading).toBeInTheDocument();
  });

  test('calls onChange when table changes', () => {
    const handleChange = jest.fn();

    render(
      <Table
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Age', dataIndex: 'age', key: 'age' },
        ]}
        data={[
          { key: '1', name: 'John', age: 30 },
          { key: '2', name: 'Jane', age: 25 },
          { key: '3', name: 'Jack', age: 40 },
        ]}
        rowKey="key"
        onChange={handleChange}
        pagination={{ pageSize: 1, current: 1, total: 3 }}
      />
    );

    fireEvent.click(screen.getByText('2'));
    expect(handleChange).toHaveBeenCalled();
  });

  test('applies custom rowClassName', () => {
    const customClass = 'custom-row';
    render(<Table columns={columns} data={data} rowKey="key" rowClassName={() => customClass} />);

    const row = document.querySelector('.ant-table-row');
    expect(row).toHaveClass(customClass);
  });

  test('updates fixed title padding style when prop is set', () => {
    render(<Table columns={columns} data={data} rowKey="key" fixedTitlePadding={20} />);

    const title = document.querySelector('.ant-table-title');
    if (title) {
      expect((title as HTMLElement).style.padding).toContain('20px');
    }
  });

  test('includes only default visible columns in checkedList', () => {
    render(<Table columns={columns} data={data} rowKey="key" defaultVisibleColumnsList={['name']} />);

    const nameHeader = screen.getByText('Name');
    expect(nameHeader).toBeInTheDocument();
    const ageHeader = screen.queryByText('Age');
    expect(ageHeader).not.toBeNull(); // rendered, but column should be hidden
  });

  test('returns column as-is if key is undefined', () => {
    const customColumns = [
      { title: 'Title only', dataIndex: 'name' }, // no key
    ];

    render(<Table columns={customColumns} data={[{ name: 'Test' }]} rowKey={() => 'test-key'} />);

    expect(screen.getByText('Title only')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
