import { ReactNode, useState } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { RadioButton } from '@/ui';

import { NCommonToggleComponents } from '../../_common/models.ts';
import { SIZE_TYPE } from '../consts';
import { NRadio } from '../models';
import { RadioGroup } from '../RadioGroup';

import './styles.module.css';

export default {
  title: 'Axenix UI/Form/Toggle Components/Radio/Radio Group',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    isDisabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    buttonStyle: { control: 'select', options: ['outline', 'solid'] },
    optionType: { control: 'select', options: ['button', 'link'] },
    onChange: fn(),
    isReadonly: { control: 'boolean' },
  },
  args: { onChange: fn() },
} as Meta<typeof RadioGroup>;

export const Default = (argTypes: NRadio.TRadioGroupProps): ReactNode => {
  return <RadioGroup {...argTypes} />;
};

export const Disabled = (argTypes: NRadio.TRadioGroupProps) => {
  return <RadioGroup {...argTypes} />;
};

export const SizeVariants = (argTypes: NRadio.TRadioGroupProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      {SIZE_TYPE.map(size => (
        <RadioGroup {...argTypes} key={size} size={size} />
      ))}
    </div>
  );
};

export const Solid = (argTypes: NRadio.TRadioGroupProps) => {
  return <RadioGroup {...argTypes} />;
};

export const ChangeColorFromTheSelectedValue = (argTypes: NRadio.TRadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleClick = (value: string) => {
    setSelectedValue(value);
  };

  const customOptionRender = (option: NCommonToggleComponents.TCheckboxOption<string>) => {
    const selectedColor = selectedValue === option.value ? option.style?.borderColor : '';

    return (
      <RadioButton
        key={option.value}
        value={option.value}
        style={{
          ...option.style,
          borderColor: selectedColor,
          color: selectedColor,
        }}
        onClick={() => handleClick(option.value)}
      >
        {option.label}
      </RadioButton>
    );
  };

  return (
    <RadioGroup value={selectedValue} optionType={argTypes.optionType}>
      {argTypes.options?.map(option => {
        if (typeof option === 'string' || typeof option === 'number') {
          return customOptionRender({
            label: String(option),
            value: String(option),
          });
        }
        return customOptionRender(option as NCommonToggleComponents.TCheckboxOption<string>);
      })}
    </RadioGroup>
  );
};

export const Readonly = (argTypes: NRadio.TRadioGroupProps): ReactNode => {
  return <RadioGroup {...argTypes} />;
};

Default.args = {
  options: ['Radio 1', 'Radio 2', 'Radio 3'],
  isChecked: false,
};

Disabled.args = {
  ...Default.args,
  isDisabled: true,
};

SizeVariants.args = {
  ...Default.args,
  optionType: 'button',
  isChecked: false,
};

Solid.args = {
  options: ['Solid Radio 1', 'Solid Radio 2', 'Solid Radio 3'],
  optionType: 'button',
  buttonStyle: 'solid',
  isChecked: false,
};

ChangeColorFromTheSelectedValue.args = {
  options: [
    { label: 'Да', value: 'Да', style: { borderColor: 'green', color: 'green' } },
    { label: 'Нет', value: 'Нет', style: { borderColor: 'red', color: 'red' } },
  ],
  optionType: 'button',
};

Readonly.args = {
  options: ['Radio 1', 'Radio 2', 'Radio 3'],
  defaultValue: 'Radio 2',
  isReadonly: true,
};
