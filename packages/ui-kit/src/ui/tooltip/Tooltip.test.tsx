import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NTooltip } from '@/ui/tooltip';

import { Tooltip } from './Tooltip';

const combinedProps = {
  combined: {
    type: 'single' as const,
    rows: [
      { label: 'Title', value: 'Combined Title' },
      { label: 'Description', value: 'Combined Description' },
    ],
  },
};

const renderTooltip = (props: NTooltip.TProps, buttonText = 'Hover me') => {
  render(
    <Tooltip {...props}>
      <button>{buttonText}</button>
    </Tooltip>
  );

  return screen.getByRole('button', { name: new RegExp(buttonText, 'i') });
};

describe('/ui/tooltip/Tooltip.tsx', () => {
  test('rendered with the transmitted text', async () => {
    const button = renderTooltip({ title: 'Tooltip text' });

    await userEvent.hover(button);

    expect(await screen.findByText('Tooltip text')).toBeInTheDocument();
  });

  test('rendered with a combined header', async () => {
    const button = renderTooltip(combinedProps);

    await userEvent.hover(button);

    expect(await screen.findByText('Combined Title')).toBeInTheDocument();
    expect(await screen.findByText('Combined Description')).toBeInTheDocument();
  });

  test('it is not displayed if isDisabled', async () => {
    const button = renderTooltip({ title: 'Tooltip text', isDisabled: true });

    await userEvent.hover(button);

    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  test('displayed by default if isDefaultOpen', () => {
    renderTooltip({ title: 'Tooltip text', isDefaultOpen: true });

    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  test('caches the contents of the tooltip when hiding if shouldDestroyTooltipOnHide=false or not passed', async () => {
    const button = renderTooltip({ title: 'Tooltip content' });

    await userEvent.hover(button);

    expect(await screen.findByText('Tooltip content')).toBeInTheDocument();

    await userEvent.unhover(button);

    expect(screen.queryByText('Tooltip content')).toBeInTheDocument();
  });

  test('applies the passed overlayStyle and width', async () => {
    const overlayStyle = { backgroundColor: 'red' };
    const width = '200px';
    const button = renderTooltip({ title: 'Tooltip content', overlayStyle, width });

    await userEvent.hover(button);

    const tooltip = await screen.findByText('Tooltip content');
    const tooltipWrapper = tooltip.closest('.ant-tooltip');

    expect(tooltipWrapper).toHaveStyle('max-width: 200px');
    expect(tooltipWrapper).toHaveStyle('background-color: red');
  });

  test('does not render tooltip when title is undefined', async () => {
    const button = renderTooltip({ title: undefined });

    await userEvent.hover(button);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('does not render tooltip when title is empty', async () => {
    const buttonEmpty = renderTooltip({ title: '' });

    await userEvent.hover(buttonEmpty);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
