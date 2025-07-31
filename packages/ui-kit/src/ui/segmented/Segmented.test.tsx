import { IconList } from '@tabler/icons-react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { NSegmented } from './models';
import { Segmented } from './Segmented';

const defaultOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
const disabledOptions = [{ label: 'Daily', value: 'Daily', disabled: true }];
const iconOptions = [{ label: 'List', value: 'List', icon: <IconList /> }];
const customStyleOptions = [{ label: 'Daily', value: 'Daily', className: 'custom-class' }];

const renderSegmented = (props?: Omit<NSegmented.TProps, 'options'>) =>
  render(<Segmented {...props} options={defaultOptions} />);

describe('Segmented component', () => {
  it('renders the segmented control with the correct number of segments', () => {
    const { getAllByRole } = renderSegmented();
    const segmentButtons = getAllByRole('radio');
    expect(segmentButtons.length).toBe(defaultOptions.length);
  });

  it('renders the correct segment label and value', () => {
    const { container } = renderSegmented();
    const segmentButtons = container.querySelectorAll('.ant-segmented-item-label');
    defaultOptions.forEach((option, index) => expect(segmentButtons[index].textContent).toBe(option));
  });

  it('selects clicked option', () => {
    const { getAllByRole } = renderSegmented();
    const segmentButtons = getAllByRole('radio');
    waitFor(() => {
      fireEvent.click(segmentButtons[1]);
      expect(segmentButtons[1].classList.contains('ant-segmented-item-selected')).toBe(true);
    });
  });

  it('renders disabled segment', () => {
    const { getByRole } = render(<Segmented options={disabledOptions} />);
    const segment = getByRole('radio');
    expect(segment.parentElement?.classList.contains('ant-segmented-item-disabled')).toBe(true);
  });

  it('renders segment with icon', () => {
    const { container } = render(<Segmented options={iconOptions} />);
    const segment = container.querySelector('.ant-segmented-item-label');
    expect(segment?.querySelector('svg')).toBeInTheDocument();
    expect(segment?.querySelector('svg')?.classList.contains('tabler-icon-list')).toBe(true);
  });

  it('renders segment with large size', () => {
    const { getByRole } = render(<Segmented size="large" options={defaultOptions} />);
    const segment = getByRole('radiogroup');
    expect(segment.classList.contains('ant-segmented-lg')).toBe(true);
  });

  it('renders segment with custom style', () => {
    const { getByRole } = render(<Segmented options={customStyleOptions} />);
    const segment = getByRole('radio');
    expect(segment.parentElement?.classList.contains('custom-class')).toBe(true);
  });
});
