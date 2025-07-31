import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

// Расширенные matchers для Jest
import { Label } from './Label';

// const
describe('Label Component', () => {
  it('renders default label correctly', () => {
    const { getByText } = render(<Label>Test Label</Label>);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('renders disabled label correctly', () => {
    const { getByText } = render(<Label isDisabled={true}>Disabled Label</Label>);
    expect(getByText('Disabled Label')).toHaveStyle('color: rgba(0, 0, 0, 0.25)');
  });

  it('renders strong label correctly', () => {
    const { getByText } = render(<Label isStrong={true}>Strong Label</Label>);
    expect(getByText('Strong Label')).toHaveStyle('font-weight: 600');
  });

  it('renders underline label correctly', () => {
    const { getByText } = render(<Label isUnderline={true}>Underlined Label</Label>);
    expect(getByText('Underlined Label')).toHaveStyle('text-decoration: underline');
  });

  it('renders italic label correctly', () => {
    const { getByText } = render(<Label isItalic={true}>Italic Label</Label>);
    expect(getByText('Italic Label')).toHaveStyle('font-style: italic');
  });

  it('unmounts correctly', () => {
    const { unmount } = render(<Label>Test Label</Label>);
    expect(() => unmount()).not.toThrow();
  });
});
