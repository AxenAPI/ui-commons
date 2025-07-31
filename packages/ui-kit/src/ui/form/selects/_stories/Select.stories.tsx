import { ReactNode, useState } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { SELECT_SIZES } from '../consts.ts';
import { FloatSelect } from '../floatSelect';
import { TFloatSelectProps } from '../floatSelect/models.ts';
import { NSelect } from '../models.ts';
import { Select } from '../Select';

export default {
  title: 'Axenix UI/Form/Selects/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isAllowClear: { control: 'boolean' },
    isReadonly: { control: 'boolean' },
    options: { control: 'object' },
    isDisabled: { control: 'boolean' },
    mode: { control: 'select', options: ['tags', 'multiple'] },
    onSearch: fn(),
    onSelect: fn(),
  },
  args: {
    onSearch: fn(),
    onSelect: fn(),
  },
} as Meta<typeof Select>;

export const DefaultSelect = (argTypes: NSelect.TProps): ReactNode => {
  return <Select {...argTypes} />;
};

export const DisabledSelect = (argTypes: NSelect.TProps): ReactNode => {
  return <Select {...argTypes} />;
};

export const SelectWithSearch = (argTypes: NSelect.TProps): ReactNode => {
  return <Select {...argTypes} />;
};

export const SelectSizes = (argTypes: NSelect.TProps): ReactNode => {
  return SELECT_SIZES.map(size => <Select key={size} {...argTypes} size={size} />);
};

export const SegmentSelect = (argTypes: NSelect.TProps): ReactNode => {
  return <Select {...argTypes} showSearch style={{ width: 300 }} />;
};

export const SmallFloatSelect = (argTypes: TFloatSelectProps): ReactNode => {
  return (
    <FloatSelect
      {...argTypes}
      options={floatSelectOptions}
      size="small"
      title="SmallFloatSelect"
      placeholder="Выберите значение"
      style={{ width: 300 }}
    />
  );
};

export const MiddleFloatSelect = (argTypes: TFloatSelectProps): ReactNode => {
  return (
    <FloatSelect
      {...argTypes}
      options={floatSelectOptions}
      size="middle"
      title="MiddleFloatSelect"
      placeholder="Выберите значение"
      style={{ width: 300 }}
    />
  );
};

export const LargeFloatSelectSM = (argTypes: TFloatSelectProps): ReactNode => {
  return (
    <FloatSelect
      {...argTypes}
      options={floatSelectOptions}
      size="large"
      title="LargeFloatSelect"
      placeholder="Выберите значение"
      style={{ width: 300 }}
    />
  );
};

export const SearchSelect = (argTypes: NSelect.TProps): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const data = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ];
  const [options, setOptions] = useState<{ label: string; value: string }[]>(data);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOptions = data.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
      setIsLoading(false);
      setOptions(newOptions);
    }, 1000);
  };

  return (
    <div>
      <Select {...argTypes} options={options} style={{ width: 300 }} onSearch={handleSearch} isLoading={isLoading} />
    </div>
  );
};

export const ScrollSelect = (argTypes: NSelect.TProps): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const data = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
    {
      label: 'Option 5',
      value: '5',
    },
    {
      label: 'Option 6',
      value: '6',
    },
    {
      label: 'Option 7',
      value: '7',
    },
    {
      label: 'Option 8',
      value: '8',
    },
    {
      label: 'Option 8',
      value: '9',
    },
    {
      label: 'Option 8',
      value: '10',
    },
    {
      label: 'Option 8',
      value: '11',
    },
  ];
  const [options, setOptions] = useState<{ label: string; value: string }[]>(data);
  const [page, setPage] = useState<{ pageNumber: number; numberOfPages: number }>({
    pageNumber: 1,
    numberOfPages: 3,
  });

  const handleSearch = (_value: string, pageNumberValue: number = 1) => {
    setIsLoading(true);
    setTimeout(() => {
      const newDataPage = data?.map(dataValue => ({
        label: `${dataValue?.label}-${pageNumberValue}`,
        value: `${dataValue?.value}-${pageNumberValue}`,
      }));

      setOptions([...options, ...newDataPage]);
      setPage({ ...page, pageNumber: pageNumberValue });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Select
        {...argTypes}
        isLoading={isLoading}
        optionsPage={page}
        options={options}
        style={{ width: 300 }}
        onSearch={handleSearch}
      />
    </div>
  );
};

export const AddItmSelect = (argTypes: NSelect.TProps): ReactNode => {
  const [options, setOptions] = useState(argTypes.options || []);
  const handleAddOption = (value: string) => {
    setOptions([
      ...options,
      {
        label: value,
        value: value,
      },
    ]);
  };

  return (
    <div>
      <Select {...argTypes} options={options} style={{ width: 300 }} onAddOption={handleAddOption} />
    </div>
  );
};

export const AddNumberItmSelect = (argTypes: NSelect.TProps): ReactNode => {
  const [options, setOptions] = useState(argTypes.options || []);
  const handleAddOption = (value: string) => {
    setOptions([
      ...options,
      {
        label: value,
        value: value,
      },
    ]);
  };

  return (
    <div>
      <Select
        {...argTypes}
        options={options}
        style={{ width: 300 }}
        onAddOption={handleAddOption}
        onSearchFormat={(value: string) => value?.replace(/\D/g, '')}
      />
    </div>
  );
};

export const ReadonlySelect = (argTypes: NSelect.TProps): ReactNode => {
  return <Select {...argTypes} />;
};

export const GroupedOptionsSelect = (argTypes: NSelect.TProps): ReactNode => {
  const groupedOptions: NSelect.TSelectOption[] = [
    {
      label: 'Группа 1',
      options: [
        { label: 'Опция 1', value: '1' },
        { label: 'Опция 2', value: '2' },
      ],
    },
    {
      label: 'Группа 2',
      options: [
        { label: 'Опция 3', value: '3' },
        { label: 'Опция 4', value: '4' },
      ],
    },
    { label: 'Без группы', value: '5' },
  ];
  return <Select {...argTypes} options={groupedOptions} style={{ width: 300 }} />;
};

DefaultSelect.args = {
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ],
  defaultValue: '1',
  isAllowClear: false,
};

DisabledSelect.args = {
  ...DefaultSelect.args,
  isDisabled: true,
};

SelectWithSearch.args = {
  ...DefaultSelect.args,
  onSearch: fn(),
  defaultValue: '',
  optionFilterProp: 'label',
  showSearch: true,
  value: 'Search',
};

SelectSizes.args = {
  ...DefaultSelect.args,
};

SegmentSelect.args = {
  options: [
    {
      label: 'Option 1',
      value: '1',
      optionsSegmentedValue: {
        name: 'Пакет 1',
        code: 'package1',
      },
    },
    {
      label: 'Option 2',
      value: '2',
      optionsSegmentedValue: {
        name: 'Пакет 2',
        code: 'package2',
      },
    },
    {
      label: 'Option 3',
      value: '3',
      optionsSegmentedValue: {
        name: 'Пакет 3',
        code: 'package3',
      },
    },
  ],
  isSegmented: true,
  showSearch: true,
  optionsSegmented: [
    { label: 'Имя', value: 'name' },
    { label: 'Код', value: 'code' },
  ],
};

SearchSelect.args = {
  isDebounceSearch: true,
  showSearch: true,
  options: [],
};

ScrollSelect.args = {
  options: [],
};

AddItmSelect.args = {
  showSearch: true,
  isAddOption: true,
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ],
};

AddNumberItmSelect.args = {
  showSearch: true,
  isAddOption: true,
  options: [],
};

const floatSelectOptions = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
  {
    label: 'Option 3',
    value: '3',
  },
];

SmallFloatSelect.args = {
  options: floatSelectOptions,
  size: 'small',
  title: 'SmallFloatSelect',
};
MiddleFloatSelect.args = {
  options: floatSelectOptions,
  title: 'MiddleFloatSelect',
};
LargeFloatSelectSM.args = {
  options: floatSelectOptions,
  size: 'large',
  title: 'LargeFloatSelectSM',
};

ReadonlySelect.args = {
  ...DefaultSelect.args,
  defaultValue: 'Выбранное значение',
  isReadonly: true,
};
