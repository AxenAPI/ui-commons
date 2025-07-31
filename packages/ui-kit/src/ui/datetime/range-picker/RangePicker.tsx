import React, { FC } from 'react';

import { IconArrowNarrowRight, IconX } from '@tabler/icons-react';

import { DatePicker as AntdDatePicker, InputRef } from 'antd';
import cn from 'classnames';

import { useComponentTokens } from '@/providers';
import { MaskedInput } from '@/ui/form/inputs';
import { FloatLabel } from '@/ui/utility/floatLabel';

import { SIZE_TO_BORDER_RADIUS_TOKEN_MAP } from '../_common/constants';
import { NRangePicker } from './models';

import styles from './styles.module.css';

const { RangePicker: AntdRangePicker } = AntdDatePicker;

export const RangePicker: FC<NRangePicker.TProps> = ({
  isDisabled,
  isDisabledDate,
  isOpen,
  isReadonly,
  separator,
  isAllowClear = false,
  format,
  size,
  className,
  floatLabel = false,
  ...props
}) => {
  /**
   * Ниже используется токен от `DatePicker`, т. к. для `TimePicker` `fontSizeIcon` не определён.
   */
  const tokens = useComponentTokens('DatePicker');
  const iconSize = tokens?.fontSizeIcon;
  const separatorSize = tokens?.fontSizeLG;
  const customClearIcon = typeof isAllowClear === 'boolean' ? {} : { clearIcon: isAllowClear?.clearIcon };

  const InputComponent = React.forwardRef((propsInput, ref: any) => {
    const maskRef = (inputRef: InputRef) => {
      if (inputRef) {
        ref.current = inputRef.input;
      }
    };

    return <MaskedInput {...propsInput} ref={maskRef} mask={props.mask ?? []} />;
  });

  InputComponent.displayName = 'InputComponent';

  const RangePicker = (
    <AntdRangePicker
      {...props}
      disabled={isDisabled}
      disabledDate={isDisabledDate}
      open={isOpen}
      readOnly={isReadonly}
      className={cn(className, {
        [styles.readonly]: isReadonly,
      })}
      inputReadOnly={isReadonly}
      format={typeof format === 'string' && props.mask ? { format, type: 'mask' } : format}
      //TODO: починить компонент MaskedInput и useMask, тогда вернуть эту реализацию
      // components={
      //   rest.mask
      //     ? {
      //         input: InputComponent,
      //       }
      //     : undefined
      // }
      separator={separator ?? <IconArrowNarrowRight height={separatorSize} stroke={1} />}
      allowClear={
        isAllowClear && {
          clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
          ...customClearIcon,
        }
      }
      size={size}
      style={{
        borderRadius: tokens[SIZE_TO_BORDER_RADIUS_TOKEN_MAP[size ?? 'default']],
      }}
    />
  );

  // Если floatLabel выключен, рендерим обычный RangePicker
  if (!floatLabel) return RangePicker;

  return (
    <FloatLabel value={props.value} size={size} placeholder={''} title={props.title as string}>
      {RangePicker}
    </FloatLabel>
  );
};
