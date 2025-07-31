import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Title } from './Title';

describe('/ui/typography/title/Title.tsx', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Title>Default title</Title>);
    expect(getByText('Default title')).toBeInTheDocument();
  });

  it('renders with isEditable prop', () => {
    const { container } = render(<Title isEditable>Editable title</Title>);
    expect(container.querySelector('button.ant-typography-edit')).toBeInTheDocument();
  });

  it('renders with isCopyable prop', () => {
    const { container } = render(<Title isCopyable>Copyable title</Title>);
    expect(container.querySelector('button.ant-typography-copy')).toBeInTheDocument();
  });

  it('renders with isDisabled prop', () => {
    const { getByText } = render(<Title isDisabled>Disabled title</Title>);
    expect(getByText('Disabled title')).toHaveClass('ant-typography-disabled');
  });

  it('renders with isCode prop', () => {
    const { container } = render(<Title isCode>Code title</Title>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('renders with isMark prop', () => {
    const { getByText } = render(<Title isMark>Marked title</Title>);
    expect(getByText('Marked title')).toHaveProperty('tagName', 'MARK');
  });

  it('renders with isDelete prop', () => {
    const { getByText } = render(<Title isDelete>Deleted title</Title>);
    expect(getByText('Deleted title')).toHaveProperty('tagName', 'DEL');
  });

  it('renders with isUnderline prop', () => {
    const { getByText } = render(<Title isUnderline>Underlined title</Title>);
    expect(getByText('Underlined title')).toHaveProperty('tagName', 'U');
  });

  it('renders with isKeyboard prop', () => {
    const { getByText } = render(<Title isKeyboard>Keyboard title</Title>);
    expect(getByText('Keyboard title')).toHaveProperty('tagName', 'KBD');
  });

  it('renders with isItalic prop', () => {
    const { getByText } = render(<Title isItalic>Italic title</Title>);
    expect(getByText('Italic title')).toHaveProperty('tagName', 'I');
  });

  it('renders with isRemoveAllMargins prop', () => {
    const { getByText } = render(<Title isRemoveAllMargins>Marginless title</Title>);
    expect(getByText('Marginless title')).toHaveProperty('style.margin', '0px');
  });

  it('renders with level prop', () => {
    const { getByText } = render(<Title level={3}>Title with level</Title>);
    expect(getByText('Title with level')).toHaveProperty('tagName', `H3`);
  });
});
