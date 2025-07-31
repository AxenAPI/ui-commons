import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import { NSwitch } from './models';
import { Switch } from './Switch';

const renderSwitch = (props: NSwitch.TProps) => render(<Switch {...props} />);

describe('/ui/form/toggle-components/Popover.tsx', () => {
  const onChange = jest.fn();
  const onClick = jest.fn();

  const fnProps = { onChange, onClick };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByRole } = renderSwitch({});

    expect(getByRole('switch')).toBeInTheDocument();
  });

  it('unmounts correctly', () => {
    const { getByRole, unmount, queryByRole } = renderSwitch({});

    expect(getByRole('switch')).toBeInTheDocument();

    unmount();

    expect(queryByRole('switch')).not.toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const { getByRole } = renderSwitch(fnProps);
    const switchElement = getByRole('switch');
    fireEvent.click(switchElement);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when clicked', () => {
    const { getByRole } = renderSwitch(fnProps);
    const switchElement = getByRole('switch');
    fireEvent.click(switchElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders as checked when isChecked is true', () => {
    const { container } = renderSwitch({ isChecked: true });

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveClass('ant-switch-checked');
  });

  it('renders as disabled when isDisabled is true', () => {
    const { getByRole } = renderSwitch({ isDisabled: true });
    const switchElement = getByRole('switch');

    expect(switchElement).toHaveClass('ant-switch-disabled');
    expect(switchElement).toHaveProperty('disabled', true);
  });

  it('renders with loading indicator when isLoading is true', () => {
    const { container } = renderSwitch({ isLoading: true });

    const switchElement = container.querySelector('.ant-switch');
    expect(switchElement).toHaveClass('ant-switch-loading');

    const loadingIcon = container.querySelector('.ant-switch-loading-icon');
    expect(loadingIcon).toBeInTheDocument();
  });

  test('renders with custom class', () => {
    const { getByRole } = renderSwitch({ isLoading: true, className: 'custom-class' });

    expect(getByRole('switch')).toHaveClass('custom-class');
  });

  test('renders with styles', () => {
    const style = { background: 'red' };
    const { getByRole } = renderSwitch({ style: style });

    expect(getByRole('switch')).toHaveStyle(style);
  });
});
