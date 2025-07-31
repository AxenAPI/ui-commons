import { Typography as AntdTypography } from 'antd';

import { NTypography } from '../models';

export function Paragraph(props: NTypography.TParagraphProps) {
  return (
    <AntdTypography.Paragraph
      {...props}
      editable={props?.isEditable}
      copyable={props?.isCopyable}
      disabled={props?.isDisabled}
      code={props?.isCode}
      mark={props?.isMark}
      delete={props?.isDelete}
      strong={props?.isStrong}
      underline={props?.isUnderline}
      keyboard={props?.isKeyboard}
      italic={props?.isItalic}
    >
      {props.children}
    </AntdTypography.Paragraph>
  );
}
