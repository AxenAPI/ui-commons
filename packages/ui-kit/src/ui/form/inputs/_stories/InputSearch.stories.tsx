import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { NInput } from '@/ui';

import { InputSearch } from '../InputSearch';

const meta: Meta<typeof InputSearch> = {
  title: 'Axenix UI/Form/Inputs/InputSearch', // Название группы и компонента
  component: InputSearch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSearch: fn(),
    onClick: fn(),
  },
  args: { onSearch: fn(), onClick: fn(), isAllowClear: true },
};

export default meta;

export const Default: StoryObj<NInput.TInputSearchProps> = {
  args: {
    placeholder: 'Введите текст для поиска',
  },
};

export const WithEnterButton: StoryObj<NInput.TInputSearchProps> = {
  args: {
    placeholder: 'Введите текст для поиска',
    enterButton: true,
  },
};

// TODO: попросили временно убрать
// export const WithAddon: StoryObj<NInput.TInputSearchProps> = {
//   args: {
//     placeholder: 'Введите текст для поиска',
//     addonBefore: 'https://',
//   },
// };

export const Loading: StoryObj<NInput.TInputSearchProps> = {
  args: {
    placeholder: 'Введите текст для поиска',
    loading: true,
  },
};

export const Disabled: StoryObj<NInput.TInputSearchProps> = {
  args: {
    placeholder: 'Введите текст для поиска',
    isDisabled: true,
  },
};

export const CustomEnterButton: StoryObj<NInput.TInputSearchProps> = {
  args: {
    placeholder: 'Введите текст для поиска',
    enterButton: 'Search',
  },
};
