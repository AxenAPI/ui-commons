import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NAlert } from '@/ui';

import { Alert } from './Alert.tsx';

const alertMessage = 'Alert message';
const alertTypes: NAlert.TProps['type'][] = ['info', 'error', 'warning', 'success'];

describe('/ui/alerts/Alerts.tsx', () => {
  test('does not throw an error when no props are passed', () => {
    expect(() => render(<Alert />)).not.toThrow();
  });

  test('renders with transmitted message', () => {
    const { getByText } = render(<Alert message={alertMessage} />);
    expect(getByText(alertMessage)).toBeInTheDocument();
  });

  test('renders with a description', () => {
    const description = 'This is a description';
    render(<Alert message={alertMessage} description={description} />);

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders with different types', () => {
    alertTypes.forEach(type => {
      const { unmount } = render(<Alert message={alertMessage} type={type} />);
      const alertContainer = screen.getByRole('alert');
      expect(alertContainer).toHaveClass(`ant-alert-${type}`);
      unmount();
    });
  });

  test('renders a closable Alert and closes it on click', async () => {
    const user = userEvent.setup();
    render(<Alert message={alertMessage} closable />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(() => screen.getByRole('alert')).toThrow();
  });

  test('calls the onClose callback when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByRole } = render(<Alert message={alertMessage} closable onClose={onClose} />);

    fireEvent.click(getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('does not render close button when closable is false', () => {
    render(<Alert message={alertMessage} closable={false} />);

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  test('renders with custom styles', () => {
    const customStyle = { backgroundColor: 'lightblue', color: 'darkblue', border: '2px solid darkblue' };

    render(<Alert message={alertMessage} style={customStyle} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveStyle('background-color: lightblue');
    expect(alertElement).toHaveStyle('color: darkblue');
    expect(alertElement).toHaveStyle('border: 2px solid darkblue');
  });
});
