import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useTheme } from '@/providers';

import { Pagination } from './Pagination';

const mockTheme = {
  components: {
    Icon: {
      primaryColor: 'blue',
      defaultColor: 'black',
    },
  },
};

jest.mock('@/providers', () => ({
  useTheme: jest.fn(),
}));

// to avoid error TypeError: window.matchMedia is not a function
beforeAll(() => {
  (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe('/ui/pagination/Pagination.tsx', () => {
  test('should render pagination', () => {
    render(<Pagination />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('should navigate to the next page when clicking the next button', async () => {
    const handleChange = jest.fn();
    render(<Pagination total={50} current={1} onChange={handleChange} />);

    const nextButton = screen.getByTitle('Next Page');
    await userEvent.click(nextButton);

    expect(handleChange).toHaveBeenCalledWith(2, 10);
  });

  test('should navigate to the previous page when clicking the previous button', async () => {
    const handleChange = jest.fn();
    render(<Pagination total={50} current={2} onChange={handleChange} />);

    const prevButton = screen.getByTitle('Previous Page');
    await userEvent.click(prevButton);

    expect(handleChange).toHaveBeenCalledWith(1, 10);
  });

  test('applies custom styles', () => {
    const customClass = 'custom-pagination';
    const customStyle = { width: 200 };
    render(<Pagination className={customClass} style={customStyle} data-testid="pagination" />);
    const pagination = screen.getByTestId('pagination');

    expect(pagination).toHaveClass(customClass);
    expect(pagination).toHaveStyle('width: 200px');
  });

  // TODO: Ошибка из-за селекта, который появляется при большом количестве
  // test('should change page size when selecting a new option', async () => {
  //   const handleChange = jest.fn();
  //   render(<Pagination total={50} current={1} isPageSizeChanger onChange={handleChange} />);

  //   const select = screen.getByRole('combobox');
  //   console.log('select: ', select);
  //   await userEvent.selectOptions(select, '20');

  //   expect(handleChange).toHaveBeenCalledWith(1, 20);
  // });

  test('should disable pagination when isDisabled is true', () => {
    render(<Pagination total={50} isDisabled />);

    const prevButton = screen.getByTitle('Previous Page');

    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  });

  test('should not trigger onChange when clicking disabled next button', async () => {
    const handleChange = jest.fn();
    render(<Pagination total={50} current={1} isDisabled onChange={handleChange} />);

    const prevButton = screen.getByTitle('Previous Page');
    await userEvent.click(prevButton);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('should not trigger onChange when clicking disabled next button', () => {
    const PAGINATION_TOTAL = 20;
    const ELEMENTS_ON_PAGE = 5;
    const PAGES_AMOUNT = PAGINATION_TOTAL / ELEMENTS_ON_PAGE;
    const PREV_NEXT_BUTTON_AMOUNT = 2;

    render(<Pagination total={PAGINATION_TOTAL} pageSize={ELEMENTS_ON_PAGE} />);

    const paginationItemsList = screen.getByRole('list');

    expect(paginationItemsList.children.length - PREV_NEXT_BUTTON_AMOUNT).toBe(PAGES_AMOUNT);
  });

  test('should unmounts without errors', () => {
    const { unmount } = render(<Pagination data-testid="pagination" />);

    expect(() => unmount()).not.toThrow();
  });
});
