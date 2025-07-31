import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Image } from './Image';

describe('/ui/image/Image.tsx', () => {
  test('renders image with default preview mask', () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    const mask = screen.getByText('Предпросмотр');
    expect(mask).toBeInTheDocument();
    expect(mask).toBeVisible();
  });

  test('hides preview mask when isMaskHidden is true', () => {
    render(<Image src="test.jpg" alt="Test Image" preview={{ isMaskHidden: true }} />);
    const mask = screen.queryByText('Предпросмотр');
    expect(mask).not.toBeInTheDocument();
  });

  test('hides preview text when isMaskTextHidden is true', () => {
    render(<Image src="test.jpg" alt="Test Image" preview={{ isMaskTextHidden: true }} />);
    const text = screen.queryByText('Предпросмотр');
    expect(text).not.toBeInTheDocument();
  });

  test('handles onError event', () => {
    const onError = jest.fn();
    render(<Image src="test.jpg" alt="Test Image" onError={onError} />);
    const image = screen.getByAltText('Test Image');

    // Simulate an error event
    fireEvent.error(image);
    expect(onError).toHaveBeenCalledTimes(1);
  });
});
