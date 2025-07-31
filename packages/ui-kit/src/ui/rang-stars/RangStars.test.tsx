import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { NRangStars } from './models';
import { RangStars } from './RangStars';

const defaultProps: NRangStars.TProps = {
  value: 0,
  max: 5,
  readOnly: false,
  lockAfterSelect: false,
};

const renderRangStars = (props: Partial<NRangStars.TProps> = {}) => {
  return render(<RangStars {...defaultProps} {...props} />);
};

describe('RangStars Component', () => {
  test('renders correct number of stars', () => {
    renderRangStars({ max: 7 });
    expect(screen.getAllByRole('button')).toHaveLength(7);
  });

  test('renders active stars according to value', () => {
    renderRangStars({ value: 3 });
    const stars = screen.getAllByRole('button');
    stars.slice(0, 3).forEach(star => {
      expect(star.className).toMatch(/active/);
    });
    stars.slice(3).forEach(star => {
      expect(star.className).not.toMatch(/active/);
    });
  });

  test('calls onChange when star is clicked', () => {
    const handleChange = jest.fn();
    renderRangStars({ onChange: handleChange });
    const stars = screen.getAllByRole('button');
    fireEvent.click(stars[2]);
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  test('does not call onChange when readOnly', () => {
    const handleChange = jest.fn();
    renderRangStars({ onChange: handleChange, readOnly: true });
    const stars = screen.getAllByTestId('star');
    fireEvent.click(stars[2]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('locks after select if lockAfterSelect is true', () => {
    const handleChange = jest.fn();
    renderRangStars({ onChange: handleChange, lockAfterSelect: true });
    const stars = screen.getAllByRole('button');
    fireEvent.click(stars[1]);
    expect(handleChange).toHaveBeenCalledWith(2);
    // Try to change again
    fireEvent.click(stars[3]);
    // Should not call again
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('toggles value to 0 if same star is clicked again', () => {
    let value = 2;
    const handleChange = (v: number) => {
      value = v;
    };
    const { rerender } = render(<RangStars value={value} onChange={handleChange} />);
    let stars = screen.getAllByRole('button');
    fireEvent.click(stars[1]); // value = 2, click again should reset to 0
    expect(value).toBe(0);
    rerender(<RangStars value={0} onChange={handleChange} />);
    stars = screen.getAllByRole('button');
    expect(stars[0].className).not.toMatch(/active/);
  });
});
