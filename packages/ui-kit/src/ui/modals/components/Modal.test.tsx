import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '@/providers';

import { NCommonModal } from '../common/models';
import { Modal } from './Modal';

jest.mock('../common', () => ({
  CommonModal: jest.fn(({ children, closeIcon }) => (
    <div data-testid="common-modal">
      {closeIcon && <div data-testid="close-icon">{closeIcon}</div>}
      {children}
    </div>
  )),
}));

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };

  const renderModal = (defaultProps?: NCommonModal.TModalProps) => {
    return render(
      <ThemeProvider>
        <Modal {...defaultProps} />
      </ThemeProvider>
    );
  };

  it('renders correctly with default props', () => {
    renderModal({ ...defaultProps });

    expect(screen.getByTestId('common-modal')).not.toBeNull();
  });

  it('uses custom close icon when provided', () => {
    const closeIcon = <div data-testid="custom-close-icon">X</div>;
    renderModal({ ...defaultProps, closeIcon });

    expect(screen.getByTestId('custom-close-icon')).not.toBeNull();
  });

  it('uses default IconX when closeIcon is not provided', () => {
    const { getByTestId } = renderModal({ ...defaultProps });

    const iconX = getByTestId('close-icon');
    expect(iconX).not.toBeNull();
    const svg = iconX.getElementsByClassName('tabler-icon-x');
    expect(svg).not.toBeNull();
  });

  it('renders without footer when footer is null', () => {
    renderModal({ ...defaultProps, footer: null });

    expect(screen.queryByTestId('modal-footer')).toBeFalsy();
  });

  it('input unmounts without errors', () => {
    const { unmount } = renderModal({ ...defaultProps });

    expect(() => unmount()).not.toThrow();
  });
});
