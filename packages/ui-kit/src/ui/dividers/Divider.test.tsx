import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { NDivider } from '@/ui';

import { DIVIDER_ORIENTATION, DIVIDER_TYPE } from './_stories/consts';
import { Divider } from './Divider';

const renderDivider = (props?: NDivider.TProps, children = 'Divider') => {
  return render(<Divider {...props}>{children}</Divider>);
};
describe('/ui/dividers/Divider.tsx', () => {
  test('renders default', () => {
    renderDivider();

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  test('renders with custom class', () => {
    renderDivider({ className: 'custom-class' });

    expect(screen.getByRole('separator')).toHaveClass('custom-class');
  });

  test('renders with both isDashed and isPlain props', () => {
    renderDivider({ isDashed: true, isPlain: true });
    const divider = screen.getByRole('separator');

    expect(divider).toHaveClass('ant-divider-dashed ant-divider-plain');
  });

  test('renders with different types', () => {
    DIVIDER_TYPE.forEach(type => {
      const { unmount } = renderDivider({ type: type });
      const divider = screen.getByRole('separator');

      expect(divider).toHaveClass(`ant-divider-${type}`);
      unmount();
    });
  });

  test('renders with different orientation', () => {
    DIVIDER_ORIENTATION.forEach(orientation => {
      const { unmount } = renderDivider({
        orientation: orientation,
      });
      const divider = screen.getByRole('separator');

      expect(divider).toHaveClass(`ant-divider-with-text-${orientation}`);
      unmount();
    });
  });
});
