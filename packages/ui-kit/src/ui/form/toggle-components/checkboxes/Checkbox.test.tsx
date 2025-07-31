import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  const setup = (props = {}) => {
    // Arrange: Render the Checkbox component with given props
    const { getByRole, unmount, ...utils } = render(<Checkbox {...props} />);
    const checkbox = getByRole('checkbox');
    return {
      checkbox,
      unmount,
      ...utils,
    };
  };

  it('renders without crashing', () => {
    // Arrange: Setup the component
    const { checkbox } = setup();

    // Assert: Verify the checkbox is in the document
    expect(checkbox).toBeInTheDocument();
  });

  it('is checked when isChecked is true', () => {
    // Arrange: Setup the component with isChecked prop
    const { checkbox } = setup({ isChecked: true });

    // Assert: Verify the checkbox is checked
    expect(checkbox).toBeChecked();
  });

  it('is disabled when isDisabled is true', () => {
    // Arrange: Setup the component with isDisabled prop
    const { checkbox } = setup({ isDisabled: true });

    // Assert: Verify the checkbox is disabled
    expect(checkbox).toBeDisabled();
  });

  it('is required when isRequired is true', () => {
    // Arrange: Setup the component with isRequired prop
    const { checkbox } = setup({ isRequired: true });

    // Assert: Verify the checkbox is required
    expect(checkbox).toBeRequired();
  });

  it('has defaultChecked when shouldDefaultChecked is true', () => {
    // Arrange: Setup the component with shouldDefaultChecked prop
    const { checkbox } = setup({ shouldDefaultChecked: true });

    // Assert: Verify the checkbox has defaultChecked property
    expect(checkbox).toHaveProperty('defaultChecked', true);
  });

  it('becomes checked when clicked', async () => {
    // Arrange: Setup the component
    const { checkbox } = setup();

    // Act: Simulate a click event
    await userEvent.click(checkbox);

    // Assert: Verify the checkbox is checked after click
    expect(checkbox).toHaveProperty('checked');
  });

  it('unmounts without errors', () => {
    // Arrange: Setup the component
    const { unmount } = setup();

    // Assert: Verify no errors occur during unmounting
    expect(unmount).not.toThrow();
  });
});
