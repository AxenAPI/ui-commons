import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('/ui/buttons/Button.tsx', () => {
  test('rendered with the transmitted text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('handles onClick', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('disabled when isDisabled', async () => {
    const onClick = jest.fn();
    render(
      <Button isDisabled onClick={onClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('displays the icon', () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(<Button icon={icon}>With Icon</Button>);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('displays the countBadge', () => {
    render(<Button countBadge={5}>With Badge</Button>);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('displays the tooltip', async () => {
    render(<Button tooltip="Tooltip text">Hover me</Button>);

    const button = screen.getByRole('button', { name: /hover me/i });
    await userEvent.hover(button);

    expect(await screen.findByText('Tooltip text')).toBeInTheDocument();
  });
});
