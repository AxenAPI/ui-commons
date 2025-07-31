import { FC } from 'react';

import { IconClock, IconX } from '@tabler/icons-react';

import { TimePicker as AntdTimePicker } from 'antd';
import cn from 'classnames';

import { useComponentTokens } from '@/providers';
import { FloatLabel } from '@/ui/utility/floatLabel';

import { SIZE_TO_BORDER_RADIUS_TOKEN_MAP } from '../_common/constants';
import { NTimePicker } from './models';

import styles from './styles.module.css';

export const TimePicker: FC<NTimePicker.TProps> = ({
  isAllowClear = false,
  isChangeOnScroll,
  isDisabled,
  isNeedConfirm,
  shouldUse12Hours,
  size,
  suffixIcon,
  className,
  isReadonly,
  placeholder,
  floatLabel = false,
  ...props
}) => {
  /**
   * Ниже используется токен от `DatePicker`, т. к. для `TimePicker` `fontSizeIcon` не определён.
   */
  const tokens = useComponentTokens('DatePicker');
  const iconSize = tokens?.fontSizeIcon;
  const customClearIcon = typeof isAllowClear === 'boolean' ? {} : { clearIcon: isAllowClear?.clearIcon };

  const TimePickerComponent = (
    <AntdTimePicker
      {...props}
      allowClear={
        isAllowClear && {
          clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
          ...customClearIcon,
        }
      }
      className={cn(className, {
        [styles.readonly]: isReadonly,
      })}
      readOnly={isReadonly}
      inputReadOnly={isReadonly}
      placeholder={isReadonly || floatLabel ? '' : placeholder}
      changeOnScroll={isChangeOnScroll}
      disabled={isDisabled}
      needConfirm={isNeedConfirm}
      size={size}
      style={{
        borderRadius: tokens[SIZE_TO_BORDER_RADIUS_TOKEN_MAP[size ?? 'default']],
      }}
      use12Hours={shouldUse12Hours}
      suffixIcon={isReadonly ? undefined : (suffixIcon ?? <IconClock height={iconSize} width={iconSize} />)}
    />
  );

  // Если floatLabel выключен, рендерим обычный InputPassword
  if (!floatLabel) return TimePickerComponent;

  return (
    <FloatLabel value={props.value} size={size} placeholder={placeholder as string} title={props.title as string}>
      {TimePickerComponent}
    </FloatLabel>
  );
};
