import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { NSelect } from './models';
import { Select } from './Select';

const optionsMock: NSelect.TOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3', isDisabled: true },
];

describe('/ui/form/inputs/selects/Select.tsx', () => {
  test('renders select with placeholder', () => {
    render(<Select options={optionsMock} placeholder="Выберите" />);
    expect(screen.getByText('Выберите')).toBeInTheDocument();
  });

  test('shows options on click', async () => {
    render(<Select options={optionsMock} placeholder="Выберите" />);

    const selector = screen.getByRole('combobox');
    fireEvent.mouseDown(selector);

    expect(await screen.findByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('selects option', async () => {
    const handleChange = jest.fn();
    render(<Select options={optionsMock} onChange={handleChange} />);

    const selector = screen.getByRole('combobox');
    fireEvent.mouseDown(selector);

    const option = await screen.findByText('Option 1');
    fireEvent.click(option);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('1', expect.anything());
    });
  });

  test('disabled select', () => {
    render(<Select options={optionsMock} isDisabled />);
    const selector = screen.getByRole('combobox');
    expect(selector).toBeDisabled();
  });

  test('render with allowClear icon', () => {
    render(<Select options={optionsMock} isAllowClear />);
    const selector = screen.getByRole('combobox');
    expect(selector).toBeInTheDocument();
  });

  test('loading state shows skeleton', async () => {
    render(<Select options={optionsMock} isLoading isOpen />);

    await waitFor(() => {
      const skeleton = document.body.querySelector('.ant-skeleton');
      expect(skeleton).toBeInTheDocument();
    });
  });

  test('calls onSearch with debounce', async () => {
    jest.useFakeTimers();
    const handleSearch = jest.fn();
    render(<Select options={optionsMock} isDebounceSearch onSearch={handleSearch} showSearch />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'abc' } });

    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('abc', undefined, undefined);
    });

    jest.useRealTimers();
  });

  test('custom notFoundContent', () => {
    render(<Select options={[]} notFoundContent={<div data-testid="no-options">Ничего не найдено</div>} isOpen />);

    expect(screen.getByTestId('no-options')).toBeInTheDocument();
  });

  test('calls onDropdownVisibleChange', () => {
    const handleDropdownVisibleChange = jest.fn();
    render(<Select options={optionsMock} onDropdownVisibleChange={handleDropdownVisibleChange} />);

    const selector = screen.getByRole('combobox');
    fireEvent.mouseDown(selector);

    expect(handleDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  test('renders grouped options', async () => {
    const groupedOptions: NSelect.TSelectOption[] = [
      {
        label: 'Группа 1',
        options: [
          { label: 'Опция 1', value: '1' },
          { label: 'Опция 2', value: '2' },
        ],
      },
      {
        label: 'Группа 2',
        options: [{ label: 'Опция 3', value: '3', isDisabled: true }],
      },
      { label: 'Без группы', value: '4' },
    ];
    render(<Select options={groupedOptions} />);
    const selector = screen.getByRole('combobox');
    fireEvent.mouseDown(selector);
    expect(await screen.findByText('Группа 1')).toBeInTheDocument();
    expect(screen.getByText('Опция 1')).toBeInTheDocument();
    expect(screen.getByText('Группа 2')).toBeInTheDocument();
    expect(screen.getByText('Без группы')).toBeInTheDocument();
  });

  test('selects option from group', async () => {
    const groupedOptions: NSelect.TSelectOption[] = [
      {
        label: 'Группа 1',
        options: [
          { label: 'Опция 1', value: '1' },
          { label: 'Опция 2', value: '2' },
        ],
      },
      { label: 'Без группы', value: '4' },
    ];
    const handleChange = jest.fn();
    render(<Select options={groupedOptions} onChange={handleChange} />);
    const selector = screen.getByRole('combobox');
    fireEvent.mouseDown(selector);
    fireEvent.click(screen.getByText('Опция 2'));
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('2', expect.anything());
    });
  });
});
