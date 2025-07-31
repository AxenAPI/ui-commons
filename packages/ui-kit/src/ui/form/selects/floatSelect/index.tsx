import { useState } from 'react';

import { FloatLabel } from '@/ui/utility/floatLabel';

import { NSelect } from '../models.ts';
import { Select } from '../Select.tsx';
import { TFloatSelectProps } from './models.ts';

export const FloatSelect = ({ placeholder, size, title, ...props }: TFloatSelectProps) => {
  const [value, setValue] = useState<string | number | undefined>(props.value);

  const onChange: NSelect.TCommonProps['onChange'] = (_value, option) => {
    props.onChange?.(_value, option);
    setValue(_value);
  };

  return (
    <FloatLabel value={value} size={size} placeholder={placeholder as string} title={title}>
      <Select {...props} onChange={onChange} placeholder="" size={size} />
    </FloatLabel>
  );
};
