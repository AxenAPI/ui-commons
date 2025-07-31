import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MENU_ITEMS, WITH_MENU_ITEMS } from './_mock';
import { Breadcrumbs } from './Breadcrumbs';
import { NBreadcrumb } from './models';

const renderBreadcrumbs = (props?: NBreadcrumb.TProps) => {
  return render(<Breadcrumbs {...props} />);
};

describe('/ui/breadcrumbs/Breadcrumbs.tsx', () => {
  test('renders with the provided MENU_ITEMS', () => {
    renderBreadcrumbs({ items: MENU_ITEMS });
    expect(screen.getByText('Ant Design')).toBeInTheDocument();
    expect(screen.getByText('Component')).toBeInTheDocument();
  });

  test('renders with custom separator', () => {
    renderBreadcrumbs({ items: MENU_ITEMS, separator: '/' });
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  test('renders with isLastCrumbBold=true', async () => {
    renderBreadcrumbs({ items: MENU_ITEMS, isLastCrumbBold: true });
    const item = await screen.findByText('Component');
    const itemWrapper = item.closest('.ant-breadcrumb-link');
    const itemWrapperTest = itemWrapper?.querySelector('span');
    expect(itemWrapperTest).toHaveStyle('font-weight: 600');
  });

  test('renders with custom style', async () => {
    renderBreadcrumbs({ items: MENU_ITEMS, isLastCrumbBold: true });
    const item = await screen.findByText('Component');
    const itemWrapper = item.closest('.ant-breadcrumb-link');
    expect(itemWrapper).toHaveClass('class-1');
  });

  test('renders without props', () => {
    renderBreadcrumbs();

    const breadcrumbs = document.querySelector('.ant-breadcrumb');
    expect(breadcrumbs).toBeInTheDocument();

    // We check that no MENU_ITEMS are rendered if no props are passed.
    expect(screen.queryByText(/Ant Design|Component/)).not.toBeInTheDocument();
  });

  test('renders with params', () => {
    const params = { id: 1 };
    renderBreadcrumbs({ items: MENU_ITEMS, params });
    expect(screen.getByText('Ant Design')).toBeInTheDocument();
    expect(screen.getByText('Component')).toBeInTheDocument();
  });

  test('renders with menu items', () => {
    renderBreadcrumbs({ items: WITH_MENU_ITEMS });
    expect(screen.getByText('Ant Design')).toBeInTheDocument();
    expect(screen.getByText('Component')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.queryByText('Layout')).not.toBeInTheDocument();
  });

  test('click with menu items', async () => {
    renderBreadcrumbs({ items: WITH_MENU_ITEMS });
    const generalItem = await screen.findByText('General');
    await userEvent.click(generalItem);
    expect(await screen.findByText('Layout')).toBeInTheDocument();
    expect(await screen.findByText('Navigation')).toBeInTheDocument();
  });
});
