import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Empty } from './Empty.tsx';

const emptyDescription = 'No Data';
const imageSrc = '/axenix-logo.svg';
const imageAlt = 'test custom img';
const customImage = <img src={imageSrc} alt={imageAlt} />;

describe('/ui/utility/empty/Empty.tsx', () => {
  test('does not throw an error when no props are passed', () => {
    expect(() => render(<Empty />)).not.toThrow();
  });

  test('does not throw an error when children as null are passed', () => {
    expect(() => render(<Empty>{null}</Empty>)).not.toThrow();
  });

  test('renders with a description', () => {
    render(<Empty description={emptyDescription} />);

    expect(screen.getByText(emptyDescription)).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    const childContent = 'Child Content';
    const children = <div>{childContent}</div>;
    render(<Empty>{children}</Empty>);

    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  test('renders with a custom image', () => {
    render(<Empty image={customImage} />);
    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', imageSrc);
    expect(imageElement).toHaveAttribute('alt', imageAlt);
  });

  test('renders with a custom imageStyle', () => {
    const imageStyle = {
      width: '100px',
      height: '100px',
    };

    render(<Empty image={customImage} imageStyle={imageStyle} />);

    const image = screen.getByRole('img');
    expect(image.parentElement).toHaveStyle(`width: ${imageStyle.width}`);
    expect(image.parentElement).toHaveStyle(`height: ${imageStyle.height}`);
  });

  test('renders with custom style', () => {
    const customStyle = {
      backgroundColor: 'red',
      padding: '20px',
    };
    render(<Empty style={customStyle} data-testid="empty-component" />);
    const emptyElement = screen.getByTestId('empty-component');

    expect(emptyElement).toHaveStyle(`background-color: ${customStyle.backgroundColor}`);
    expect(emptyElement).toHaveStyle(`padding: ${customStyle.padding}`);
  });

  test('unmounts without errors', () => {
    const { unmount } = render(<Empty data-testid="empty-component" />);

    expect(() => unmount()).not.toThrow();
  });
});
