import { InboxOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';

import { ModalDocument } from './ModalDocument';
import { NModalDocument } from './model';

jest.mock('@/providers/theme-provider', () => ({
  useTheme: jest.fn(() => ({ theme: {} })),
}));

describe('ModalDocument', () => {
  const props: NModalDocument.TModalDocument = {
    fileSettings: {},
    descriptionFileModal: 'Описание файла',
    titleFileModal: 'Заголовок файла',
    iconFileModal: <InboxOutlined />,
    isOpen: true,
  };

  const renderModal = (props?: NModalDocument.TModalDocument, dataTestId?: string, children?: JSX.Element) => {
    return render(
      <ModalDocument {...props} data-testid={dataTestId}>
        {children}
      </ModalDocument>
    );
  };

  it('render with default props', () => {
    const { getByTestId } = renderModal({ ...props }, 'ant-modal-testid');
    const modal = getByTestId('ant-modal-testid');

    expect(modal).not.toBeNull();
  });

  it('does not render the drawer when isOpen is false', () => {
    const { queryByTestId } = renderModal({ ...props, isOpen: false }, 'ant-modal-testid');
    const modal = queryByTestId('ant-modal-testid');

    expect(modal).toBeNull();
  });

  it('render file icon', () => {
    const { getByRole } = renderModal({ ...props }, 'ant-modal-testid');

    expect(getByRole('img')).not.toBeNull();
  });

  it('renders with children', () => {
    const children = <div data-testid={'ant-modal-children-testid'}>Дочерний элемент</div>;
    const { getByTestId } = renderModal({ ...props }, 'ant-modal-testid', children);
    const childrenElement = getByTestId('ant-modal-children-testid');

    expect(childrenElement).not.toBeNull();
  });

  it('input unmounts without errors', () => {
    const { unmount } = renderModal({ ...props }, 'ant-modal-testid');

    expect(() => unmount()).not.toThrow();
  });
});
