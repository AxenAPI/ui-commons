import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Link } from './Link';

describe('/ui/typography/link/Link.tsx', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Link>Default Link</Link>);
    expect(getByText('Default Link')).toBeInTheDocument();
  });

  it('renders with isEditable prop', () => {
    const { container } = render(<Link isEditable>Editable Link</Link>);
    expect(container.querySelector('button.ant-typography-edit')).toBeInTheDocument();
  });

  it('renders with isCopyable prop', () => {
    const { container } = render(<Link isCopyable>Copyable Link</Link>);
    expect(container.querySelector('button.ant-typography-copy')).toBeInTheDocument();
  });

  it('renders with isDisabled prop', () => {
    const { getByText } = render(<Link isDisabled>Disabled Link</Link>);
    expect(getByText('Disabled Link')).toHaveClass('ant-typography-disabled');
  });

  it('renders with isEllipsis prop', () => {
    const { getByText } = render(<Link isEllipsis>Ellipsis Link</Link>);
    expect(getByText('Ellipsis Link')).toHaveClass('ant-typography-ellipsis');
  });

  it('renders with isCode prop', () => {
    const { container } = render(<Link isCode>Code Link</Link>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders with isMark prop', () => {
    const { getByText } = render(<Link isMark>Marked Link</Link>);
    expect(getByText('Marked Link')).toHaveProperty('tagName', 'MARK');
  });

  it('renders with isDelete prop', () => {
    const { getByText } = render(<Link isDelete>Deleted Link</Link>);
    expect(getByText('Deleted Link')).toHaveProperty('tagName', 'DEL');
  });

  it('renders with isUnderline prop', () => {
    const { getByText } = render(<Link isUnderline>Underlined Link</Link>);
    expect(getByText('Underlined Link')).toHaveProperty('tagName', 'U');
  });

  it('renders with isKeyboard prop', () => {
    const { getByText } = render(<Link isKeyboard>Keyboard Link</Link>);
    expect(getByText('Keyboard Link')).toHaveProperty('tagName', 'KBD');
  });

  it('renders with isItalic prop', () => {
    const { getByText } = render(<Link isItalic>Italic Link</Link>);
    expect(getByText('Italic Link')).toHaveProperty('tagName', 'I');
  });

  it('renders with isStrong prop', () => {
    const { getByText } = render(<Link isStrong>Strong Link</Link>);
    expect(getByText('Strong Link')).toHaveProperty('tagName', 'STRONG');
  });
});
