import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { nanoid } from 'nanoid';

import { FormItem } from './FormItem';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'unique-id'),
}));

describe('FormItem Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders required label', () => {
    const { getByText } = render(<FormItem isRequired={true} requiredMarkPosition="left" label="Test Label" />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('applies custom label color', () => {
    const { getByText } = render(<FormItem isRequired={true} requiredMarkPosition="right" label="Test Label" />);
    expect(getByText('*')).toBeInTheDocument();
  });

  it('generates unique id', () => {
    render(<FormItem label="Test Label" />);
    expect(nanoid).toHaveBeenCalled();
  });

  it('uses default required mark position', () => {
    const { getByText } = render(<FormItem isRequired={true} label="Test Label" />);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('*')).toBeInTheDocument();
  });

  it('unmounts without errors', () => {
    const { unmount } = render(<FormItem label="Test Label" />);
    expect(() => unmount()).not.toThrow();
  });
});
