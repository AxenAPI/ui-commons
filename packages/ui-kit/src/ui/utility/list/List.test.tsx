import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { List } from '@/ui';
import { TListProps } from '@/ui/utility/list/List';

const mockProps: TListProps<string> = {
  dataSource: ['Item 1'],
  renderItem: item => <div data-testid="list-item">{item}</div>,
};

describe('/ui/utility/list/List.tsx', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  test('render with provided props', () => {
    render(<List {...mockProps} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  test('renders an empty list when dataSource is empty', () => {
    render(<List dataSource={[]} renderItem={() => null} />);
    const emptyState = screen.getByText('No data', { selector: '.ant-empty-description' });

    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveClass('ant-empty-description');
  });

  test('calls renderItem for each item in dataSource', () => {
    const mockRenderItem = jest.fn(() => <span>Item</span>);
    render(<List dataSource={[1, 2, 3]} renderItem={mockRenderItem} />);

    expect(mockRenderItem).toHaveBeenCalledTimes(3);
  });

  test('renders with a custom class name', () => {
    render(<List {...mockProps} className="custom-class" />);

    const listElement = screen.getByRole('list').closest('.custom-class');
    expect(listElement).toBeInTheDocument();
  });

  test('renders a custom header and footer', () => {
    render(
      <List
        {...mockProps}
        header={<div data-testid="list-header">Custom Header</div>}
        footer={<div data-testid="list-footer">Custom Footer</div>}
      />
    );

    expect(screen.getByTestId('list-header')).toHaveTextContent('Custom Header');
    expect(screen.getByTestId('list-footer')).toHaveTextContent('Custom Footer');
  });

  test('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(<List {...mockProps} style={customStyle} />);

    expect(container.firstChild).toHaveStyle(customStyle);
  });

  test('renders with pagination when pagination prop is provided', () => {
    const pagination = { pageSize: 2, total: 1, defaultCurrent: 1 };
    render(<List {...mockProps} pagination={pagination} />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('unmounts without errors', () => {
    const { unmount } = render(<List {...mockProps} />);

    expect(() => unmount()).not.toThrow();
  });
});
