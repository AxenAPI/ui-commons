import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ITEMS_MENU, WITH_SUBMENU_ITEMS } from './_mock';
import { Menu } from './Menu';

const renderMenu = (props?: any) => {
  return render(<Menu {...props} />);
};

describe('/ui/menu/Menu.tsx', () => {
  test('renders with the provided items', () => {
    renderMenu({ items: ITEMS_MENU });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('renders with custom mode', () => {
    renderMenu({ items: ITEMS_MENU, mode: 'vertical' });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('renders without props', () => {
    renderMenu();
    const menu = document.querySelector('.ant-menu');
    expect(menu).toBeInTheDocument();
    expect(screen.queryByText(/Item 1|Item 2/)).not.toBeInTheDocument();
  });

  test('renders with submenu items', async () => {
    renderMenu({ items: WITH_SUBMENU_ITEMS });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Submenu')).toBeInTheDocument();
    const submenuItem = screen.getByText('Submenu');
    await userEvent.click(submenuItem);
    expect(await screen.findByText('Subitem 1')).toBeInTheDocument();
    expect(await screen.findByText('Subitem 2')).toBeInTheDocument();
  });

  test('renders with defaultOpenKeys', async () => {
    renderMenu({ items: WITH_SUBMENU_ITEMS, defaultOpenKeys: ['3'] });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Submenu')).toBeInTheDocument();
    expect(await screen.findByText('Subitem 1')).toBeInTheDocument();
    expect(await screen.findByText('Subitem 2')).toBeInTheDocument();
  });

  test('renders with onClick', async () => {
    const onClick = jest.fn();
    renderMenu({ items: ITEMS_MENU, onClick });
    const item = screen.getByText('Item 1');
    await userEvent.click(item);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('click with menu items', async () => {
    renderMenu({ items: WITH_SUBMENU_ITEMS });
    const submenuItem = screen.getByText('Submenu');
    await userEvent.click(submenuItem);
    expect(await screen.findByText('Subitem 1')).toBeInTheDocument();
    expect(await screen.findByText('Subitem 2')).toBeInTheDocument();
  });
});
