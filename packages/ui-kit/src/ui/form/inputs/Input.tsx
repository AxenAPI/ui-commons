import React, { forwardRef, useMemo } from 'react';

import { IconX } from '@tabler/icons-react';

import { Input as AntdInput, InputRef } from 'antd';

import { useTheme } from '@/providers';

import { NInput } from './models';

import './styles.module.css';

/**
 * Поле формы (обертка поля из Ant Design)
 */
export const InputComponent = (
  { placeholder = 'Введите значение', isAllowClear = false, ...props }: NInput.TProps,
  ref: React.LegacyRef<InputRef>
) => {
  const { theme } = useTheme();
  const iconSize = theme?.components?.Input?.fontSizeIcon;
  const customClearIcon = typeof isAllowClear !== 'boolean' ? { clearIcon: isAllowClear?.clearIcon } : {};

  const inputVariant = useMemo(() => {
    if (props.isReadOnly) {
      return 'borderless';
    }

    return props.variant;
  }, [props.isReadOnly, props.variant]);

  return (
    <AntdInput
      {...props}
      disabled={props.isDisabled}
      placeholder={placeholder}
      readOnly={props.isReadOnly}
      variant={inputVariant}
      ref={ref}
      allowClear={
        isAllowClear && {
          clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
          ...customClearIcon,
        }
      }
    />
  );
};

export const Input = forwardRef(InputComponent);
