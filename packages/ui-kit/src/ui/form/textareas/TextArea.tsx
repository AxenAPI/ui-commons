import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { IconX } from '@tabler/icons-react';

import { Input as AntdInput } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import cn from 'classnames';

import { useTheme } from '@/providers/theme-provider';
import { NTextArea } from '@/ui/form/textareas/models.ts';
import { FloatLabel } from '@/ui/utility/floatLabel';

import styles from './styles.module.css';

/**
 * Текстовая область (обертка текстовой области из Ant Design)
 */
export const TextAreaComponent = (
  {
    isAllowClear = false,
    isDisabled,
    isTopContent,
    inputValueClassName,
    placeholder = 'Введите значение',
    value,
    readOnly,
    floatLabel = false,
    ...props
  }: NTextArea.TProps,
  ref: React.LegacyRef<TextAreaRef>
) => {
  const { theme } = useTheme();

  const [isMaxTag, setIsMaxTag] = useState<boolean>(false);
  const [inputValue, setValue] = useState<string>();
  const currRef = useRef<any>(null);

  const iconSize = theme?.components?.Input?.fontSizeIcon;
  const customClearIcon = typeof isAllowClear === 'boolean' ? {} : { clearIcon: isAllowClear?.clearIcon };

  useEffect(() => {
    isTopContent && setValue(value);
  }, [value, isTopContent]);

  const autoSize = isTopContent ? (props.autoSize ?? { maxRows: 10 }) : props.autoSize;

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setIsMaxTag(true);
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setIsMaxTag(false);
    }
    props.onBlur?.(e);
  };

  const handleChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setValue(e.target.value);
    }
    props.onChange?.(e);
  };

  const TextArea = (ref: React.LegacyRef<TextAreaRef> | undefined, placeholder: string | undefined) => {
    return (
      <div className={cn(styles.textAreaContent)}>
        <AntdInput.TextArea
          {...props}
          value={value}
          autoSize={!isMaxTag && isTopContent ? { maxRows: 1 } : autoSize}
          disabled={isDisabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
          allowClear={
            isAllowClear && {
              clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
              ...customClearIcon,
            }
          }
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          readOnly={readOnly}
          className={cn(props.className, {
            [styles.inputPosition]: isTopContent,
            [styles.inputRowOne]: !isMaxTag && isTopContent,
            [styles.inputResize]: isTopContent && isMaxTag,
            [styles.readonly]: readOnly,
          })}
        />
        {isTopContent && inputValue && (
          <div
            className={cn(inputValueClassName, styles.overlay, { [styles.overlayNone]: isMaxTag })}
            style={{
              padding: `${theme.components?.Input?.paddingBlockLG}px ${theme.components?.Input?.paddingInline}px`,
            }}
          >
            {inputValue}
          </div>
        )}
      </div>
    );
  };

  // Если floatLabel выключен, рендерим обычный TextArea
  if (!floatLabel) return TextArea(ref, placeholder);

  return (
    <FloatLabel
      value={value}
      size={props.size}
      placeholder={placeholder}
      title={props.title as string}
      placeholderPosition="top"
    >
      {TextArea(currRef, '')}
    </FloatLabel>
  );
};

export const TextArea = forwardRef(TextAreaComponent);
