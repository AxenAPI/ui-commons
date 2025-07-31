import { useState } from 'react';

import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CommonModal } from './CommonModal';

describe('/ui/modals/CommonModal.tsx', () => {
  const defaultProps = {
    isOpen: true,
    onCancel: jest.fn(),
    onOk: jest.fn(),
    title: 'Test Modal',
    children: <div>Modal Content</div>,
    cancelText: 'Cancel',
    okText: 'OK',
    className: 'custom-modal-class',
  };

  test('renders the modal with the transmitted title and content', () => {
    render(<CommonModal {...defaultProps} />);

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('renders the modal with cancel and ok buttons', () => {
    render(<CommonModal {...defaultProps} />);

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('handles onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(<CommonModal {...defaultProps} onCancel={onCancel} />);

    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('handles onOk when ok button is clicked', async () => {
    const onOk = jest.fn();
    render(<CommonModal {...defaultProps} onOk={onOk} />);

    await userEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  test('renders the modal with an icon if provided', () => {
    const icon = '🔥';
    render(<CommonModal {...defaultProps} icon={icon} />);

    expect(screen.getByText(icon)).toBeInTheDocument();
  });

  test('renders the modal with custom footer if provided', () => {
    const customFooter = <footer role="contentinfo">Custom Footer</footer>;
    render(<CommonModal {...defaultProps} footer={customFooter} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('does not render the modal when isOpen is false', () => {
    render(<CommonModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('applies custom class to the modal', () => {
    render(<CommonModal {...defaultProps} />);

    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toHaveClass('custom-modal-class');
  });

  test('closes the modal when onCancel is triggered', async () => {
    function TestWrapper() {
      const [isOpen, setIsOpen] = useState(true);

      return <CommonModal isOpen={isOpen} onCancel={() => setIsOpen(false)} cancelText="Cancel" okText="OK" />;
    }

    render(<TestWrapper />);

    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  test('unmounts without errors', () => {
    const { unmount } = render(<CommonModal {...defaultProps} />);

    expect(() => unmount()).not.toThrow();
  });
});
