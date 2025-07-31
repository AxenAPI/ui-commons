import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';
import { NAvatar } from './model';

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

describe('/ui/avatar/Avatar.tsx', () => {
  test('does not throw an error when no props are passed', () => {
    expect(() => render(<Avatar />)).not.toThrow();
  });

  test('renders with alt text when src is provided', () => {
    const alt = 'User Avatar';
    const src = 'https://example.com/avatar.jpg';

    render(<Avatar alt={alt} src={src} />);
    const image = screen.getByAltText(alt);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', src);
  });

  test('renders with icon when icon prop is provided', () => {
    const iconText = 'I';
    render(<Avatar icon={<span>{iconText}</span>} />);
    expect(screen.getByText(iconText)).toBeInTheDocument();
  });

  test('applies shape and size props', () => {
    const shapes: NAvatar.TProps['shape'][] = ['circle', 'square'];
    const sizes: NAvatar.TProps['size'][] = ['small', 'default', 'large'];

    shapes.forEach(shape => {
      sizes.forEach(size => {
        const { container, unmount } = render(<Avatar shape={shape} size={size} />);
        const avatar = container.querySelector('.ant-avatar');

        expect(avatar).toHaveClass(`ant-avatar-${shape}`);
        unmount();
      });
    });
  });

  test('calls onError when image fails to load', () => {
    const onError = jest.fn();
    const alt = 'Bad Avatar';

    const { container } = render(<Avatar src="bad-url.jpg" alt={alt} onError={onError} />);
    const image = container.querySelector('img');

    expect(image).toBeInTheDocument();

    // Симулируем ошибку загрузки изображения
    image?.dispatchEvent(new Event('error'));

    expect(onError).toHaveBeenCalled();
  });

  test('renders with custom styles', () => {
    const style = { backgroundColor: 'red', borderRadius: '10px' };
    const { container } = render(<Avatar style={style} />);
    const avatar = container.querySelector('.ant-avatar');

    expect(avatar).toHaveStyle('background-color: red');
    expect(avatar).toHaveStyle('border-radius: 10px');
  });
});
