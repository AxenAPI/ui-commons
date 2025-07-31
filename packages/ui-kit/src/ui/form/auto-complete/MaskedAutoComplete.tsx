import { forwardRef, useEffect, useRef } from 'react';

import { BaseSelectRef } from 'rc-select';

import { AutoComplete, NAutoComplete } from '@/ui';

import { useMask } from '../inputs/useMask';

const MaskedAutoCompleteComponent = (
  { mask, value, onChange, onSelect, ...props }: NAutoComplete.TMaskedProps,
  ref: React.ForwardedRef<BaseSelectRef>
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { maskedValue, handleChange, handleCursorChange, cursorPositionRef } = useMask({ mask, initValue: value });

  const handleInputChange = (value: string) => {
    const newMaskedValue = handleChange(value, inputRef?.current?.selectionStart ?? 0);
    onChange?.(newMaskedValue);
  };

  const handleSelect = (value: string) => {
    const newMaskedValue = handleChange(value, maskedValue.length);
    cursorPositionRef.current = newMaskedValue.length;
    onSelect?.(newMaskedValue);
  };

  useEffect(() => {
    if (inputRef.current) {
      handleCursorChange(inputRef.current);
    }
  }, [maskedValue, handleCursorChange]);

  return (
    <AutoComplete
      {...props}
      ref={element => {
        const input = element?.nativeElement.querySelector('input');
        if (input) {
          inputRef.current = input;
        }
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }}
      value={maskedValue}
      onChange={handleInputChange}
      onSelect={handleSelect}
    />
  );
};

export const MaskedAutoComplete = forwardRef(MaskedAutoCompleteComponent);
