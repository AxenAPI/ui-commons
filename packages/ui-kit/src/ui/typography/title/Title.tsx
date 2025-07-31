import { Typography as AntdTypography } from 'antd';

import { NTypography } from '../models';

export function Title({
  isEditable,
  isCopyable,
  isDisabled,
  isCode,
  isMark,
  isDelete,
  isUnderline,
  isKeyboard,
  isItalic,
  isRemoveAllMargins,
  ...props
}: NTypography.TTitleProps) {
  return (
    <AntdTypography.Title
      {...props}
      editable={isEditable}
      copyable={isCopyable}
      disabled={isDisabled}
      code={isCode}
      mark={isMark}
      delete={isDelete}
      underline={isUnderline}
      keyboard={isKeyboard}
      italic={isItalic}
      style={{ margin: isRemoveAllMargins ? '0' : undefined, ...props.style }}
    >
      {props.children}
    </AntdTypography.Title>
  );
}
