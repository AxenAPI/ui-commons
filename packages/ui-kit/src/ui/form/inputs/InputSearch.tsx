import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { IconX } from '@tabler/icons-react';

import { Input as AntdInput, InputRef } from 'antd';

import { useTheme } from '@/providers';

import { NInput } from './models';

export const InputSearchComponent = (
  { placeholder, isAllowClear = false, ...props }: NInput.TInputSearchProps,
  ref: React.LegacyRef<InputRef>
) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const iconSize = theme?.components?.Input?.fontSizeIcon;
  const customClearIcon = typeof isAllowClear !== 'boolean' ? { clearIcon: isAllowClear?.clearIcon } : {};

  return (
    <AntdInput.Search
      {...props}
      ref={ref}
      placeholder={placeholder ?? t('input.placeholder', { ns: 'input' })}
      readOnly={props.isReadOnly}
      disabled={props.isDisabled}
      allowClear={
        isAllowClear && {
          clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
          ...customClearIcon,
        }
      }
    />
  );
};

export const InputSearch = forwardRef(InputSearchComponent);
