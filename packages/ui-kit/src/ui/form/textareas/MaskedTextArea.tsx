import React, { forwardRef, useEffect, useState } from 'react';

import { TextAreaRef } from 'antd/es/input/TextArea';

import { NTextArea } from '@/ui/form/textareas/models';
import { TextArea } from '@/ui/form/textareas/TextArea';

import { conversionMaskedValue } from '../inputs';

const MaskedTextAreaComponent = (
  { mask, placeholder, value, onChange, ...props }: NTextArea.TMaskedProps,
  ref: React.ForwardedRef<TextAreaRef>
) => {
  const [maskedValue, setMaskedValue] = useState<string>();

  useEffect(() => {
    const maskedValue = conversionMaskedValue(value, mask);
    setMaskedValue(maskedValue);
  }, [value, mask]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const maskedValue = conversionMaskedValue(e.target.value, mask);
    setMaskedValue(maskedValue);
    onChange?.(e, maskedValue);
  }

  return <TextArea {...props} ref={ref} value={maskedValue} placeholder={placeholder} onChange={handleChange} />;
};

export const MaskedTextArea = forwardRef(MaskedTextAreaComponent);
