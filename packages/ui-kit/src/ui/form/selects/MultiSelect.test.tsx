import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { MultipleSelect } from './MultiSelect';

const optionsMock = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

describe('MultipleSelect', () => {
  test('renders with basic props', () => {
    render(<MultipleSelect options={optionsMock} value={['option1']} onChange={jest.fn()} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('renders with isTopContent and toggles maxTag settings', () => {
    render(<MultipleSelect options={optionsMock} value={['option1']} isTopContent onChange={jest.fn()} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(input).toHaveAttribute('aria-expanded');
  });

  test('triggers onFocus and onBlur callbacks', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<MultipleSelect options={optionsMock} onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleFocus).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  test('calls onDropdownVisibleChange when dropdown visibility changes', () => {
    const onDropdownVisibleChange = jest.fn();

    render(<MultipleSelect options={optionsMock} onDropdownVisibleChange={onDropdownVisibleChange} />);

    const input = screen.getByRole('combobox');
    fireEvent.mouseDown(input);

    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  test('renders tooltip for omitted values', () => {
    render(<MultipleSelect options={optionsMock} value={['option1', 'option2', 'option3']} maxTagCount={1} />);

    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  test('renders grouped options', () => {
    const groupedOptions = [
      {
        label: 'Группа 1',
        options: [
          { label: 'Опция 1', value: '1' },
          { label: 'Опция 2', value: '2' },
        ],
      },
      {
        label: 'Группа 2',
        options: [{ label: 'Опция 3', value: '3' }],
      },
      { label: 'Без группы', value: '4' },
    ];
    render(<MultipleSelect options={groupedOptions} value={[]} onChange={jest.fn()} mode="multiple" />);
    const selector = screen.getByRole('combobox');
    fireEvent.mouseDown(selector);
    expect(screen.getByText('Группа 1')).toBeInTheDocument();
    expect(screen.getByText('Опция 1')).toBeInTheDocument();
    expect(screen.getByText('Группа 2')).toBeInTheDocument();
    expect(screen.getByText('Без группы')).toBeInTheDocument();
  });

  test('allows multiple selection from groups', () => {
    const groupedOptions = [
      {
        label: 'Группа 1',
        options: [
          { label: 'Опция 1', value: '1' },
          { label: 'Опция 2', value: '2' },
        ],
      },
      { label: 'Без группы', value: '4' },
    ];
    render(<MultipleSelect options={groupedOptions} value={['1', '4']} onChange={jest.fn()} mode="multiple" />);
    expect(screen.getByText('Опция 1')).toBeInTheDocument();
    expect(screen.getByText('Без группы')).toBeInTheDocument();
  });
});
