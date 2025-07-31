import { FC } from 'react';

import { Typography as AntdTypography } from 'antd';

import { NLabel } from './models';

export const Label: FC<NLabel.TProps> = ({ isDisabled, isStrong, isUnderline, isItalic, ...restProps }) => {
  return (
    <AntdTypography.Text
      {...restProps}
      disabled={isDisabled}
      strong={isStrong}
      underline={isUnderline}
      italic={isItalic}
    />
  );
};
