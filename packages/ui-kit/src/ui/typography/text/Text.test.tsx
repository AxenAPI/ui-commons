import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Text } from './Text';

describe('/ui/typography/text/Text.tsx', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Text>Default Text</Text>);
    expect(getByText('Default Text')).toBeInTheDocument();
  });

  it('renders with isEditable prop', () => {
    const { container } = render(<Text isEditable>Editable Text</Text>);
    expect(container.querySelector('button.ant-typography-edit')).toBeInTheDocument();
  });

  it('renders with isCopyable prop', () => {
    const { container } = render(<Text isCopyable>Copyable Text</Text>);
    expect(container.querySelector('button.ant-typography-copy')).toBeInTheDocument();
  });

  it('renders with isDisabled prop', () => {
    const { getByText } = render(<Text isDisabled>Disabled Text</Text>);
    expect(getByText('Disabled Text')).toHaveClass('ant-typography-disabled');
  });

  it('renders with isCode prop', () => {
    const { container } = render(<Text isCode>Code Text</Text>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders with isMark prop', () => {
    const { getByText } = render(<Text isMark>Marked Text</Text>);
    expect(getByText('Marked Text')).toHaveProperty('tagName', 'MARK');
  });

  it('renders with isDelete prop', () => {
    const { getByText } = render(<Text isDelete>Deleted Text</Text>);
    expect(getByText('Deleted Text')).toHaveProperty('tagName', 'DEL');
  });

  it('renders with isUnderline prop', () => {
    const { getByText } = render(<Text isUnderline>Underlined Text</Text>);
    expect(getByText('Underlined Text')).toHaveProperty('tagName', 'U');
  });

  it('renders with isKeyboard prop', () => {
    const { getByText } = render(<Text isKeyboard>Keyboard Text</Text>);
    expect(getByText('Keyboard Text')).toHaveProperty('tagName', 'KBD');
  });

  it('renders with isItalic prop', () => {
    const { getByText } = render(<Text isItalic>Italic Text</Text>);
    expect(getByText('Italic Text')).toHaveProperty('tagName', 'I');
  });

  it('renders with isStrong prop', () => {
    const { getByText } = render(<Text isStrong>Strong Text</Text>);
    expect(getByText('Strong Text')).toHaveProperty('tagName', 'STRONG');
  });
});
