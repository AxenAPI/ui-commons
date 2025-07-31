import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NTransfer } from './models';
import { Transfer } from './Transfer';

export const items = Array.from({ length: 20 }).map<NTransfer.TRecordType>((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const renderTransfer = (props?: Partial<NTransfer.TProps<NTransfer.TRecordType>>) => {
  return render(<Transfer dataSource={items} render={item => item.title} {...props} />);
};

describe('/ui/transfer/Transfer.tsx', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  test('renders titles correctly', () => {
    renderTransfer();

    expect(screen.getByText('content1')).toBeInTheDocument();
    expect(screen.getByText('content2')).toBeInTheDocument();
  });

  test('renders search input when isShowSearch is true', () => {
    renderTransfer({ isShowSearch: true });

    const searchInput = screen.getAllByPlaceholderText('Поиск');
    expect(searchInput[0]).toBeInTheDocument();
    expect(searchInput[1]).toBeInTheDocument();
  });

  test('search input change', async () => {
    renderTransfer({ isShowSearch: true });

    const searchInput = screen.getAllByPlaceholderText('Поиск');
    await userEvent.type(searchInput[0], 'test');
    expect(searchInput[0]).toHaveValue('test');

    await userEvent.type(searchInput[1], 'test1');
    expect(searchInput[1]).toHaveValue('test1');
  });

  test('renders search button when withSearchButton is true', () => {
    renderTransfer({ isShowSearch: true, withSearchButton: true });

    const transfer = document.querySelector('.ant-transfer-list');

    const transferSearchButton = transfer?.querySelector('.anticon-search');
    expect(transferSearchButton).toBeInTheDocument();
  });

  test('disables the transfer component when isDisabled is true', () => {
    renderTransfer({ isDisabled: true });

    const transfer = document.querySelector('.ant-transfer');
    expect(transfer).toHaveClass('ant-transfer-disabled');
  });

  test('render one way transfer component', () => {
    renderTransfer({ isOneWay: true });

    const transferButton = document.querySelector('.ant-transfer-operation');
    const transferButtonRight = transferButton?.querySelector('.anticon-right');
    expect(transferButtonRight).toBeInTheDocument();
    const transferButtonLeft = transferButton?.querySelector('.anticon-left');
    expect(transferButtonLeft).not.toBeInTheDocument();
  });

  test('render arrow button currently', () => {
    renderTransfer();

    const transferButton = document.querySelector('.ant-transfer-operation');
    const transferButtonRight = transferButton?.querySelector('.anticon-right');
    expect(transferButtonRight).toBeInTheDocument();
    const transferButtonLeft = transferButton?.querySelector('.anticon-left');
    expect(transferButtonLeft).toBeInTheDocument();
  });
});
