import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Paragraph } from './Paragraph';

describe('/ui/typography/paragraph/Paragraph.tsx', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Paragraph>Default Paragraph</Paragraph>);
    expect(getByText('Default Paragraph')).toBeInTheDocument();
  });

  it('renders with isEditable prop', () => {
    const { container } = render(<Paragraph isEditable>Editable Paragraph</Paragraph>);
    expect(container.querySelector('button.ant-typography-edit')).toBeInTheDocument();
  });

  it('renders with isCopyable prop', () => {
    const { container } = render(<Paragraph isCopyable>Copyable Paragraph</Paragraph>);
    expect(container.querySelector('button.ant-typography-copy')).toBeInTheDocument();
  });

  it('renders with isDisabled prop', () => {
    const { getByText } = render(<Paragraph isDisabled>Disabled Paragraph</Paragraph>);
    expect(getByText('Disabled Paragraph')).toHaveClass('ant-typography-disabled');
  });

  it('renders with isCode prop', () => {
    const { container } = render(<Paragraph isCode>Code Paragraph</Paragraph>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders with isMark prop', () => {
    const { getByText } = render(<Paragraph isMark>Marked Paragraph</Paragraph>);
    expect(getByText('Marked Paragraph')).toHaveProperty('tagName', 'MARK');
  });

  it('renders with isDelete prop', () => {
    const { getByText } = render(<Paragraph isDelete>Deleted Paragraph</Paragraph>);
    expect(getByText('Deleted Paragraph')).toHaveProperty('tagName', 'DEL');
  });

  it('renders with isUnderline prop', () => {
    const { getByText } = render(<Paragraph isUnderline>Underlined Paragraph</Paragraph>);
    expect(getByText('Underlined Paragraph')).toHaveProperty('tagName', 'U');
  });

  it('renders with isKeyboard prop', () => {
    const { getByText } = render(<Paragraph isKeyboard>Keyboard Paragraph</Paragraph>);
    expect(getByText('Keyboard Paragraph')).toHaveProperty('tagName', 'KBD');
  });

  it('renders with isItalic prop', () => {
    const { getByText } = render(<Paragraph isItalic>Italic Paragraph</Paragraph>);
    expect(getByText('Italic Paragraph')).toHaveProperty('tagName', 'I');
  });

  it('renders with isStrong prop', () => {
    const { getByText } = render(<Paragraph isStrong>Strong Paragraph</Paragraph>);
    expect(getByText('Strong Paragraph')).toHaveProperty('tagName', 'STRONG');
  });
});
