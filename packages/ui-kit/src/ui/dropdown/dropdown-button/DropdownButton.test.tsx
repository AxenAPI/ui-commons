import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Tooltip } from 'antd';
import { ItemType } from 'antd/es/menu/interface';

import { DropdownButton } from './DropdownButton';

test('renders DropdownButton with default props', () => {
  const items: ItemType[] = [
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2' },
    { key: '3', label: 'Item 3' },
  ];
  render(<DropdownButton menu={{ items }}>Test</DropdownButton>);
  expect(screen.getByText(/Test/i)).toBeInTheDocument();

  waitFor(() => {
    const button = screen.getAllByRole('button')[1];
    fireEvent.mouseEnter(button);
    const menuList = document.querySelector('.ant-dropdown-menu');
    const menuItems = menuList?.childNodes;

    expect(menuItems?.length).toBe(3);
  });
});

test('renders with count badge', () => {
  render(<DropdownButton countBadge={5} />);
  expect(screen.getByText(/5/i)).toBeInTheDocument();
});

test('renders in loading state with tooltip', () => {
  render(
    <DropdownButton
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip text" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton as React.ReactElement<any, string>, { loading: true }),
      ]}
    />
  );

  waitFor(() => {
    const button = screen.getAllByRole('button')[0];
    fireEvent.mouseEnter(button);
    expect(document.body.querySelector('.ant-tooltip-inner')).toHaveTextContent('tooltip text');
  });
  expect(document.querySelector('.ant-btn-loading')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'loading');
});

test('renders in danger mode', () => {
  render(<DropdownButton isDanger={true} />);
  expect(screen.getAllByRole('button')[0]).toHaveClass('ant-btn-dangerous');
});

test('renders as disabled', () => {
  render(<DropdownButton isDisabled={true} />);
  expect(screen.getAllByRole('button')[0]).toBeDisabled();
});
