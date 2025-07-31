import React, { FC, useState } from 'react';

import {
  IconCalendarEvent,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconX,
} from '@tabler/icons-react';

import { DatePicker as AntdDatePicker } from 'antd';
import cn from 'classnames';

import { useComponentTokens } from '@/providers';
import { FloatLabel } from '@/ui/utility/floatLabel';

import { SIZE_TO_BORDER_RADIUS_TOKEN_MAP } from '../_common/constants';
import { NDatePicker } from './models';

import styles from './styles.module.css';

export const DatePicker = <T extends NDatePicker.TDateValue>({
  // autoSize,
  isTopContent,
  isDisabled,
  isDisabledDate,
  isOpen,
  isReadonly,
  suffixIcon,
  nextIcon,
  superNextIcon,
  prevIcon,
  superPrevIcon,
  isAllowClear = false,
  className,
  format,
  size,
  style,
  placeholder,
  floatLabel = false,
  ...props
}: NDatePicker.TProps<T>): ReturnType<FC<NDatePicker.TProps<T>>> => {
  const tokens = useComponentTokens('DatePicker');
  const iconSize = tokens?.fontSizeIcon;
  const [isMaxTag, setIsMaxTag] = useState<boolean>();
  // const dateRef = useRef<HTMLTextAreaElement | null>(null);

  const customClearIcon = typeof isAllowClear === 'boolean' ? {} : { clearIcon: isAllowClear?.clearIcon };

  const handleFocus = () => {
    if (isTopContent) {
      setIsMaxTag(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (isTopContent) {
      setIsMaxTag(false);
    }
    props?.onBlur?.(event);
  };

  //TODO: починить компонент MaskedInput и useMask, тогда вернуть эту реализацию

  // const InputComponent = React.forwardRef((propsInput, ref: any) => {
  //   const maskRef = (inputRef: InputRef) => {
  //     if (inputRef) {
  //       ref.current = inputRef.input;
  //     }
  //   };
  //   const maskRefTextArea = (inputRef: TextAreaRef) => {
  //     if (inputRef && inputRef.resizableTextArea) {
  //       ref.current = inputRef?.resizableTextArea.textArea;
  //       dateRef.current = inputRef?.resizableTextArea.textArea;
  //     }
  //   };

  //   return isTopContent ? (
  //     <MaskedTextArea
  //       {...propsInput}
  //       ref={maskRefTextArea}
  //       mask={rest.mask ?? []}
  //       autoSize={!isMaxTag && isTopContent ? { maxRows: 1 } : autoSize}
  //       className={cn({
  //         [styles.inputRowOne]: !isMaxTag && isTopContent,
  //       })}
  //       style={{
  //         border: 'initial',
  //         boxShadow: 'initial',
  //         minHeight: 22,
  //         padding: 0,
  //       }}
  //     />
  //   ) : (
  //     <MaskedInput {...propsInput} ref={maskRef} mask={rest.mask ?? []} />
  //   );
  // });

  // InputComponent.displayName = 'InputComponent';
  const DatePicker = (
    <AntdDatePicker
      {...props}
      size={size}
      disabled={isDisabled}
      className={cn(className, {
        [styles.dateInputPosition]: isTopContent && isMaxTag,
        [styles.readonly]: isReadonly,
      })}
      style={{
        borderRadius: tokens[SIZE_TO_BORDER_RADIUS_TOKEN_MAP[size ?? 'default']],
        ...style,
      }}
      inputReadOnly={isReadonly}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabledDate={isDisabledDate}
      open={isOpen}
      readOnly={isReadonly}
      placeholder={isReadonly || floatLabel ? '' : placeholder}
      format={typeof format === 'string' && props.mask ? { format, type: 'mask' } : format}
      // components={
      //   isTopContent
      //     ? {
      //         input: InputComponent,
      //       }
      //     : undefined
      // }
      suffixIcon={isReadonly ? undefined : (suffixIcon ?? <IconCalendarEvent width={iconSize} height={iconSize} />)}
      nextIcon={nextIcon ?? <IconChevronRight width={iconSize} height={iconSize} />}
      superNextIcon={superNextIcon ?? <IconChevronsRight width={iconSize} height={iconSize} />}
      prevIcon={prevIcon ?? <IconChevronLeft width={iconSize} height={iconSize} />}
      superPrevIcon={superPrevIcon ?? <IconChevronsLeft width={iconSize} height={iconSize} />}
      allowClear={
        isAllowClear && {
          clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
          ...customClearIcon,
        }
      }
    />
  );

  if (!floatLabel) return DatePicker;

  return (
    <FloatLabel value={props.value} size={size} placeholder={placeholder as string} title={props.title as string}>
      {DatePicker}
    </FloatLabel>
  );
};
