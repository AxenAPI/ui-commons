import React, { LegacyRef } from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { InputRef } from 'antd';

import { InputSearch } from './InputSearch.tsx';
import { NInput } from './models';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => (key === 'input.placeholder' ? 'Введите запрос' : key),
  }),
}));

const renderInputSearch = (props?: NInput.TInputSearchProps) => {
  return render(<InputSearch {...props} />);
};

describe('/ui/form/inputs/InputSearch.tsx', () => {
  test('input search exists', () => {
    renderInputSearch({ value: 'SearchInputExist' });
    expect(screen.getByDisplayValue('SearchInputExist')).toBeInTheDocument();
  });

  test('input search placeholder', () => {
    renderInputSearch();
    expect(screen.getByPlaceholderText('Введите запрос')).toBeInTheDocument();
  });

  test('input search custom placeholder', () => {
    renderInputSearch({ placeholder: 'CustomPlaceholder' });
    expect(screen.getByPlaceholderText('CustomPlaceholder')).toBeInTheDocument();
  });

  test('input search disabled', () => {
    renderInputSearch({ value: 'SearchDisabled', isDisabled: true });
    expect(screen.getByDisplayValue('SearchDisabled')).toBeDisabled();
  });

  test('input search read-only', () => {
    renderInputSearch({ value: 'SearchReadOnly', isReadOnly: true });
    expect(screen.getByDisplayValue('SearchReadOnly')).toHaveAttribute('readonly');
  });

  test('input search triggers search on button click', () => {
    const handleSearch = jest.fn();
    renderInputSearch({ value: 'SearchTest', onSearch: handleSearch });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  test('input search style', () => {
    const { container } = renderInputSearch({ value: 'SearchStyled', style: { background: 'blue', color: 'white' } });

    const wrapper = container.querySelector('.ant-input-group-wrapper');

    expect(wrapper).toHaveStyle({
      backgroundColor: 'blue',
      color: 'white',
    });
  });

  test('input search focus ref', () => {
    const InputSearchFocus = () => {
      const inputRef: LegacyRef<InputRef> = React.createRef();

      const handleFocus = () => {
        inputRef.current?.focus();
      };

      return (
        <div>
          <InputSearch ref={inputRef} />
          <button onClick={handleFocus}>Фокус</button>
        </div>
      );
    };

    const { getByRole, getByText } = render(<InputSearchFocus />);

    const inputField = getByRole('searchbox');
    const button = getByText('Фокус');

    fireEvent.click(button);
    expect(document.activeElement).toBe(inputField);
  });

  test('input search unmounts without errors', () => {
    const { unmount } = renderInputSearch();
    expect(() => unmount()).not.toThrow();
  });
});
