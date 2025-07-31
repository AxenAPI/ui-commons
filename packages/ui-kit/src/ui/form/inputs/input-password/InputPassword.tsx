import React, { forwardRef, useRef } from 'react';

import { IconX } from '@tabler/icons-react';

import { Input as AntdInput, InputRef } from 'antd';

import { useTheme } from '@/providers';
import { NInput } from '@/ui';
import { FloatLabel } from '@/ui/utility/floatLabel';

export const InputPasswordComponent = (
  { isDisabled, isReadOnly, isAllowClear = false, floatLabel = false, ...props }: NInput.TInputPasswordProps,
  ref: React.LegacyRef<InputRef>
) => {
  const { theme } = useTheme();
  const currRef = useRef<any>(null);

  const iconSize = theme?.components?.Input?.fontSizeIcon;
  const customClearIcon = typeof isAllowClear === 'boolean' ? {} : { clearIcon: isAllowClear?.clearIcon };

  // Если floatLabel выключен, рендерим обычный InputPassword
  if (!floatLabel) {
    return (
      <AntdInput.Password
        {...props}
        readOnly={isReadOnly}
        disabled={isDisabled}
        ref={ref}
        allowClear={
          isAllowClear && {
            clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
            ...customClearIcon,
          }
        }
      />
    );
  }

  return (
    <FloatLabel
      value={props.value}
      size={props.size}
      placeholder={props.placeholder as string}
      title={props.title as string}
    >
      <AntdInput.Password {...props} readOnly={isReadOnly} disabled={isDisabled} ref={currRef} placeholder="" />
    </FloatLabel>
  );
};

export const InputPassword = forwardRef(InputPasswordComponent);
