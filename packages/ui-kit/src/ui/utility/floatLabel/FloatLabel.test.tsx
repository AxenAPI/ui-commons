import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { FloatLabel } from './FloatLabel';

describe('FloatLabel Component', () => {
  it('renders with placeholder and title correctly', () => {
    render(
      <FloatLabel value="" size="middle" placeholder="Enter text" title="Title">
        <input />
      </FloatLabel>
    );

    expect(screen.getByText('Enter text')).toBeInTheDocument();
  });

  it('renders with title when focused', () => {
    render(
      <FloatLabel value="" size="middle" placeholder="Enter text" title="Title">
        <input />
      </FloatLabel>
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders with title when value is provided', () => {
    render(
      <FloatLabel value="Some value" size="middle" placeholder="Enter text" title="Title">
        <input />
      </FloatLabel>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('unmounts correctly', () => {
    const { unmount } = render(
      <FloatLabel value="" size="middle" placeholder="Enter text" title="Title">
        <input />
      </FloatLabel>
    );

    expect(() => unmount()).not.toThrow();
  });
});
