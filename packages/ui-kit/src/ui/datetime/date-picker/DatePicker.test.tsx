import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import dayjs from 'dayjs';

import { useTheme } from '@/providers';

import { DatePicker } from './DatePicker';

const mockTheme = {
  components: {
    Icon: {
      primaryColor: 'blue',
      defaultColor: 'black',
    },
  },
};

jest.mock('@/providers', () => ({
  useComponentTokens: jest.fn().mockReturnValue({}),
  useTheme: jest.fn(),
}));

beforeAll(() => {
  (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
});

describe('DatePicker', () => {
  const defaultProps = {
    isTopContent: false,
    isDisabled: false,
    isDisabledDate: jest.fn(),
    isOpen: false,
    isReadonly: false,
    suffixIcon: null,
    nextIcon: null,
    superNextIcon: null,
    prevIcon: null,
    superPrevIcon: null,
    isAllowClear: true,
  };

  it('renders correctly', () => {
    const { container } = render(<DatePicker {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('renders MaskedInput when isTopContent is false', () => {
    const { getByLabelText } = render(<DatePicker {...defaultProps} aria-label="ant-picker-input" />);

    expect(getByLabelText('ant-picker-input')).toBeInTheDocument();
  });

  it('renders MaskedTextArea when isTopContent is true', () => {
    const { container } = render(<DatePicker {...defaultProps} isTopContent />);

    expect(container.getElementsByTagName('textarea').length > 0);
  });

  it('should call onBlur when input loses focus', () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const { getByRole } = render(
      <DatePicker isTopContent={false} isDisabled={false} isOpen={true} onChange={handleChange} onBlur={handleBlur} />
    );
    const input = getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('disables date input when disabled prop is true', () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    const { getByRole } = render(
      <DatePicker isTopContent={false} isDisabled={true} isOpen={true} onChange={handleChange} onBlur={handleBlur} />
    );
    const input = getByRole('textbox');

    expect(input).toBeDisabled();
  });

  it('rendering of suffixIcon', () => {
    const suffixIcon = <div>suffixIcon</div>;

    const { getByText } = render(<DatePicker {...defaultProps} suffixIcon={suffixIcon} />);

    expect(getByText('suffixIcon')).toBeInTheDocument();
  });

  it('rendering of nextIcon', () => {
    const nextIcon = <div aria-label="next-icon">nextIcon</div>;

    const { getByLabelText } = render(<DatePicker {...defaultProps} nextIcon={nextIcon} isOpen={true} />);

    expect(getByLabelText('next-icon')).toBeInTheDocument();
  });

  it('rendering of superNextIcon', () => {
    const superNextIcon = <div aria-label="super-next-icon">superNextIcon</div>;

    const { getByLabelText } = render(<DatePicker {...defaultProps} superNextIcon={superNextIcon} isOpen={true} />);

    expect(getByLabelText('super-next-icon')).toBeInTheDocument();
  });

  it('rendering of prevIcon', () => {
    const prevIcon = <div aria-label="prev-icon">prevIcon</div>;

    const { getByLabelText } = render(<DatePicker {...defaultProps} prevIcon={prevIcon} isOpen={true} />);

    expect(getByLabelText('prev-icon')).toBeInTheDocument();
  });

  it('rendering of superPrevIcon', () => {
    const superPrevIcon = <div aria-label="super-prev-icon">superPrevIcon</div>;

    const { getByLabelText } = render(<DatePicker {...defaultProps} superPrevIcon={superPrevIcon} isOpen={true} />);

    expect(getByLabelText('super-prev-icon')).toBeInTheDocument();
  });

  it('does not render clearIcon when isAllowClear equals true and has not value', () => {
    const { container } = render(<DatePicker {...defaultProps} isAllowClear aria-label="ant-picker-clear" />);

    expect(container.querySelector('.ant-picker-clear')).not.toBeInTheDocument();
  });

  it('renders clearIcon when isAllowClear is true and input has a value', () => {
    const { container } = render(<DatePicker {...defaultProps} isAllowClear value={dayjs()} />);

    expect(container.querySelector('.ant-picker-clear')).toBeInTheDocument();
  });

  it('render with custom class', () => {
    const customClass = 'custom-class';

    const { container } = render(<DatePicker className={customClass} />);

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('render with custom style', () => {
    const customStyle = { backgroundColor: 'red' };

    const { container } = render(<DatePicker style={customStyle} />);

    expect(container.firstChild).toHaveStyle(`background-color: ${customStyle.backgroundColor};`);
  });

  it('unmounts without errors', () => {
    const { unmount } = render(<DatePicker {...defaultProps} />);

    expect(() => unmount()).not.toThrow();
  });

  it('renders floating label when floatLabel props is true', () => {
    const { container } = render(<DatePicker {...defaultProps} floatLabel />);
    const label = container.querySelector('.label');
    expect(label).toBeInTheDocument();
  });
});
