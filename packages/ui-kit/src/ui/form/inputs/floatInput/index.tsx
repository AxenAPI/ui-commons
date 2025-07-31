import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { Input as AntdInput } from 'antd';

import { NInput } from '@/ui';
import { FloatLabel } from '@/ui/utility/floatLabel/FloatLabel.tsx';

type TFloatInputRef = {
  input: HTMLInputElement | null;
};

const FloatInputComponent = (
  { placeholder, size, value, defaultValue, type, title, ...props }: NInput.TProps,
  ref: React.Ref<TFloatInputRef>
) => {
  const currRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    input: currRef.current?.input || null,
  }));

  return (
    <FloatLabel value={value} size={size} placeholder={placeholder as string} title={title as string}>
      <AntdInput
        {...props}
        defaultValue={defaultValue}
        onChange={props.onChange}
        ref={(ref as any) || currRef}
        size={size}
        type={type}
        value={value}
      />
    </FloatLabel>
  );
};

export const FloatInput = forwardRef(FloatInputComponent);
