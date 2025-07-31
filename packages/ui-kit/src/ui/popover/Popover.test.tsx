import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Button } from '../buttons';
import { BUTTON_ROLE, POPOVER_CONTENT, POPOVER_TITLE, TEST_BUTTON, TOOLTIP_ROLE } from './_mock';
import { NPopover } from './models';
import { Popover } from './Popover';

const renderPopover = (props?: NPopover.TProps & { withoutChildren?: boolean }) => {
  return render(
    <div>
      <Popover {...props}>{!props?.withoutChildren ? <Button>{TEST_BUTTON}</Button> : null}</Popover>
    </div>
  );
};

describe('/ui/dividers/Popover.tsx', () => {
  test('renders default', () => {
    renderPopover({ isOpen: true });

    expect(screen.getByRole(TOOLTIP_ROLE)).toBeInTheDocument();
  });

  it('renders with custom title and content', () => {
    const { getByText } = renderPopover({
      title: POPOVER_TITLE,
      content: POPOVER_CONTENT,
      isOpen: true,
    });

    expect(getByText(POPOVER_CONTENT)).toBeInTheDocument();
    expect(getByText(POPOVER_TITLE)).toBeInTheDocument();
  });

  it('renders on hover', async () => {
    const { getByRole, unmount, queryByRole } = renderPopover();
    expect(queryByRole(TOOLTIP_ROLE)).not.toBeInTheDocument();

    const popoverTrigger = getByRole(BUTTON_ROLE);
    fireEvent.mouseEnter(popoverTrigger);

    await waitFor(() => {
      expect(getByRole(TOOLTIP_ROLE)).toBeInTheDocument();
    });
    unmount();

    expect(queryByRole(TOOLTIP_ROLE)).not.toBeInTheDocument();
    expect(queryByRole(BUTTON_ROLE)).not.toBeInTheDocument();
  });

  it('unmount on mouseLeave', async () => {
    const { getByRole, unmount, queryByRole } = renderPopover();

    expect(queryByRole(TOOLTIP_ROLE)).not.toBeInTheDocument();

    const popoverTrigger = getByRole(BUTTON_ROLE);
    fireEvent.mouseEnter(popoverTrigger);

    await waitFor(() => {
      expect(getByRole(TOOLTIP_ROLE)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(popoverTrigger);

    await waitFor(
      () => {
        expect(queryByRole(TOOLTIP_ROLE)).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    unmount();

    expect(queryByRole(TOOLTIP_ROLE)).not.toBeInTheDocument();
    expect(queryByRole(BUTTON_ROLE)).not.toBeInTheDocument();
  });

  it('should open and close popover', () => {
    const { queryByRole, getByRole } = renderPopover({ trigger: 'click' });
    const triggerButton = getByRole(BUTTON_ROLE);

    fireEvent.click(triggerButton);

    expect(getByRole(TOOLTIP_ROLE)).toBeInTheDocument();

    fireEvent.click(triggerButton);

    expect(queryByRole(TOOLTIP_ROLE)).not.toBeInTheDocument();
  });

  it('render with header buttons', () => {
    const { getByText } = renderPopover({
      showHeaderButtons: true,
      headerButton: <Button>headerButton</Button>,
      isOpen: true,
    });

    expect(getByText('headerButton')).toBeInTheDocument();
  });

  it('should call onOpenChange callback when popover is opened or closed', () => {
    const onOpenChange = jest.fn();
    const { getByText } = renderPopover({ trigger: 'click', onOpenChange });

    const triggerButton = getByText(TEST_BUTTON);

    fireEvent.click(triggerButton);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(triggerButton);

    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should render popover with styles', () => {
    const style = { backgroundColor: 'red' };
    const { getByRole } = renderPopover({ isOpen: true, style });
    const popover = getByRole(TOOLTIP_ROLE);
    const parentElement = popover.parentElement?.parentElement;

    expect(parentElement).toHaveStyle(style);
  });

  it('should render popover with maxWidth', () => {
    const maxWidth = 350;
    const { getByRole } = renderPopover({ isOpen: true, maxWidth });
    const popover = getByRole(TOOLTIP_ROLE);
    const parentElement = popover.parentElement?.parentElement;

    expect(parentElement).toHaveStyle({ maxWidth: `${maxWidth}px` });
  });

  it('should render popover with minWidth', () => {
    const minWidth = 300;
    const { getByRole } = renderPopover({ isOpen: true, minWidth, withoutChildren: true });
    const popover = getByRole(TOOLTIP_ROLE);
    const parentElement = popover.parentElement?.parentElement;

    expect(parentElement).toHaveStyle({ minWidth: `${minWidth}px` });
  });
});
