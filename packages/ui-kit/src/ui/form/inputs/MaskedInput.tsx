import React, { forwardRef, useEffect, useRef } from 'react';

import { InputRef } from 'antd';

import { Input } from './Input';
import { NInput } from './models';
import { useMask } from './useMask';

const MaskedInputComponent = (
  { mask, value = '', onChange, ...props }: NInput.TMaskedProps,
  ref: React.ForwardedRef<InputRef>
) => {
  const inputRef = useRef<InputRef | null>(null);
  const { maskedValue, handleChange, handleCursorChange } = useMask({ mask, initValue: value });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, selectionStart } = e.target;
    const newMaskedValue = handleChange(inputValue, selectionStart ?? 0);
    onChange?.(e, newMaskedValue);
  };

  useEffect(() => {
    if (inputRef.current?.input) {
      handleCursorChange(inputRef.current.input);
    }
  }, [maskedValue, handleCursorChange]);

  return (
    <Input
      {...props}
      ref={element => {
        inputRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }}
      value={maskedValue}
      onChange={onInputChange}
    />
  );
};

export const MaskedInput = forwardRef(MaskedInputComponent);
