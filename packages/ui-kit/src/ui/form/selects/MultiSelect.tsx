/* eslint-disable jsx-a11y/no-autofocus */
import React, { FC, useEffect, useState } from 'react';

import cn from 'classnames';

import { Tooltip } from '@/ui/tooltip';

import { CommonSelect } from './CommonSelect';
import { NSelect } from './models';

import styles from './styles.module.css';

/**
 * Компонент мультиселекта.
 * */
export const MultipleSelect: FC<NSelect.TMultipleProps> = ({
  mode = 'multiple',
  isTopContent,
  isLimitInputHeight,
  isReadonly,
  ...props
}) => {
  const [isMaxTag, setIsMaxTag] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>();

  let maxTagCount = props.maxTagCount;
  let maxTagTextLength = props.maxTagTextLength;

  if (isTopContent && !isMaxTag) {
    maxTagCount = 'responsive';

    if (!props.maxTagTextLength) {
      maxTagTextLength = 10;
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setIsMaxTag(true);
    }
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setIsMaxTag(false);
    }
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  /**TO_DO: Исправление бага в ant с потерей onBlur, если maxTagCount = 'responsive', изменяемый динамически */
  const selectElement = document.querySelector('.ant-select-focused')?.classList;
  useEffect(() => {
    if (!dropdownVisible && dropdownVisible !== undefined) {
      selectElement?.remove('ant-select-focused');
    } else {
      if (isTopContent) {
        setIsMaxTag(true);
      }
    }
  }, [selectElement, dropdownVisible, isTopContent]);

  return (
    <CommonSelect
      {...props}
      className={cn('select', props.className, {
        [styles.selectPosition]: isTopContent && isMaxTag,
        [styles.selectScroll]: isLimitInputHeight,
        [styles.selectScrollSm]: isLimitInputHeight && props.size === 'small',
        [styles.selectScrollLg]: isLimitInputHeight && props.size === 'large',
      })}
      isReadonly={isReadonly}
      maxTagCount={maxTagCount}
      maxTagTextLength={maxTagTextLength}
      mode={mode}
      onFocus={handleFocus}
      autoFocus={props.autoFocus || (dropdownVisible && isTopContent)}
      onBlur={handleBlur}
      maxTagPlaceholder={omittedValues => (
        <Tooltip overlayStyle={{ pointerEvents: 'none' }} title={omittedValues.map(({ label }) => label).join(', ')}>
          <span>{`+${omittedValues?.length}`}</span>
        </Tooltip>
      )}
      /**TO_DO: Исправление бага в ant с потерей onBlur */
      onDropdownVisibleChange={visible => {
        if (!visible) {
          setIsMaxTag(false);
        }
        setDropdownVisible(visible);
        props?.onDropdownVisibleChange?.(visible);
      }}
    >
      {props.children}
    </CommonSelect>
  );
};
