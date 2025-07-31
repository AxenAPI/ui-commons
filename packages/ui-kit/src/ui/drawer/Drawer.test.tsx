import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import { Drawer, ResizableDragger } from './Drawer';
import { NDrawer } from './models';

describe('Drawer', () => {
  const defaultProps: Partial<NDrawer.TBaseProps> = {
    getContainer: false,
    isOpen: true,
  };

  const renderDrawer = (props: NDrawer.TProps) => render(<Drawer {...props} />);

  it('render with default props', () => {
    const { container } = renderDrawer({ ...defaultProps });

    expect(container).toBeInTheDocument();
  });

  it('does not render the drawer when isOpen is false', () => {
    const { container } = renderDrawer({ ...defaultProps, isOpen: false });

    expect(container).toBeEmptyDOMElement();
  });

  it('render with custom footer', () => {
    const Footer = () => <div className="customFooter">Custom footer</div>;
    const customFooter = <Footer />;

    const { getByText } = renderDrawer({ ...defaultProps, customFooter: customFooter });

    expect(getByText('Custom footer')).toBeInTheDocument();
  });

  it('render with custom class', () => {
    const customClass = 'custom-class';

    const { container } = renderDrawer({ ...defaultProps, className: customClass });

    expect(container.querySelector(`.${customClass}`)).toBeInTheDocument();
  });

  it('render without padding', () => {
    const { container } = renderDrawer({ ...defaultProps, withoutDrawerBodyPadding: '0' });

    expect(container.querySelector('.drawerBodyWithoutPadding')).toBeInTheDocument();
  });

  it('calling onClose for click to close icon', () => {
    const onClose = jest.fn();
    const { getByRole } = renderDrawer({ ...defaultProps, onClose: onClose });
    const closeIcon = getByRole('button', { name: /close/i });

    fireEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('render with custom close icon', () => {
    const customCloseIcon = <div>Custom icon</div>;

    const { getByText } = renderDrawer({ ...defaultProps, closeIcon: customCloseIcon });

    expect(getByText('Custom icon')).toBeInTheDocument();
  });

  it('render with custom size', () => {
    const size = 'large';

    const { container } = renderDrawer({ ...defaultProps, size: size });

    expect(container.querySelector('.ant-drawer-content-wrapper')).toHaveStyle('width: 800px;');
  });

  it('render with custom placement', () => {
    const placement = 'top';

    const { container } = renderDrawer({ ...defaultProps, placement: placement });

    expect(container.firstChild).toHaveClass(`ant-drawer-${placement}`);
  });

  it('should be rendered when isResizable is true', () => {
    renderDrawer({ ...defaultProps, isResizable: true, placement: 'left', isOpen: true });

    const resizer = document.body.querySelector('.dragger');

    expect(resizer).toBeInTheDocument();
  });

  it('should have a mouseDown event handler', () => {
    const mockOnMouseDown = jest.fn();
    const mockState = {
      drawerWidth: 500,
      initialWidth: 0,
      drawerHeight: 200,
      initialHeight: 0,
      initialX: 0,
      initialY: 0,
      isResizing: false,
    };
    const mockThemeConfig: any = {
      colors: {
        primary: '#3498db',
      },
    };

    render(
      <ResizableDragger
        onMouseDown={mockOnMouseDown}
        placement="left"
        state={mockState}
        isOpen={true}
        theme={mockThemeConfig}
      />
    );

    const dragger = document.body.querySelector('.dragger');

    if (dragger) {
      fireEvent.mouseDown(dragger);

      expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
    }
  });
});
