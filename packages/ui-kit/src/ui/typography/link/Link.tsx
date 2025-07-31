import { Typography as AntdTypography } from 'antd';

import { NTypography } from '../models';

export function Link(props: NTypography.TLinkProps) {
  return (
    <AntdTypography.Link
      {...props}
      editable={props?.isEditable}
      copyable={props?.isCopyable}
      disabled={props?.isDisabled}
      ellipsis={props?.isEllipsis}
      code={props?.isCode}
      mark={props?.isMark}
      delete={props?.isDelete}
      strong={props?.isStrong}
      underline={props?.isUnderline}
      keyboard={props?.isKeyboard}
      italic={props?.isItalic}
    >
      {props.children}
    </AntdTypography.Link>
  );
}
