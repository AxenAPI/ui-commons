import { ReactNode, useEffect, useState } from 'react';

import { DownCircleOutlined } from '@ant-design/icons';
import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { RadioChangeEvent } from 'antd';

import { TPlacement } from '@/models';
import { MultipleSelect, RadioButton, RadioGroup, Select } from '@/ui';

import { NTreeSelect } from '../TreeSelect/models.ts';
import { TreeSelect } from '../TreeSelect/TreeSelect.tsx';
import { OPTIONS_SELECT_ICON, TREE_SELECT_DATA, TREE_SELECT_SUBTITLE_DATA } from './consts.tsx';

export default {
  title: 'Axenix UI/Tree/TreeSelect',
  args: {
    onChange: fn(),
  },
  argTypes: {
    placement: { control: 'select', options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    status: { control: 'select', options: ['error', 'warning'] },
    treeData: { control: 'object' },
    isAllowClear: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    isTreeDefaultExpandAll: { control: 'boolean' },
    isMultiple: { control: 'boolean' },
  },
  component: TreeSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof TreeSelect>;

export const Default = (argTypes: NTreeSelect.TProps): ReactNode => {
  return (
    <div style={{ width: '300px' }}>
      <TreeSelect {...argTypes} style={{ width: '100%' }} />
    </div>
  );
};

export const MultipleSelection = (argTypes: NTreeSelect.TProps): ReactNode => {
  return (
    <div style={{ width: '300px' }}>
      <TreeSelect {...argTypes} style={{ width: '100%' }} />
    </div>
  );
};

export const WithCustomSwitcherIcon = (argTypes: NTreeSelect.TProps): ReactNode => {
  return (
    <div style={{ width: '300px' }}>
      <TreeSelect {...argTypes} style={{ width: '100%' }} />
    </div>
  );
};

export const Checkable = (argTypes: NTreeSelect.TProps): ReactNode => {
  const [value, setValue] = useState(['0-0-0']);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '300px' }}>
      <TreeSelect {...argTypes} style={{ width: '100%' }} value={value} onChange={onChange} />
    </div>
  );
};

export const Placement = (argTypes: NTreeSelect.TProps): ReactNode => {
  const [placement, SetPlacement] = useState<TPlacement>('topLeft');
  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  return (
    <div style={{ width: '400px', gap: '20px', display: 'flex', flexDirection: 'column' }}>
      <RadioGroup value={placement} onChange={placementChange}>
        <RadioButton value="topLeft">topLeft</RadioButton>
        <RadioButton value="topRight">topRight</RadioButton>
        <RadioButton value="bottomLeft">bottomLeft</RadioButton>
        <RadioButton value="bottomRight">bottomRight</RadioButton>
      </RadioGroup>
      <div style={{ width: '150px' }}>
        <TreeSelect {...argTypes} style={{ width: '100%' }} placement={placement} />
      </div>
    </div>
  );
};

export const Status = (argTypes: NTreeSelect.TProps): ReactNode => {
  return (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <TreeSelect {...argTypes} status="error" style={{ width: '100%' }} placeholder="Error" />
      <TreeSelect {...argTypes} status="warning" style={{ width: '100%' }} placeholder="Warning multiple" />
    </div>
  );
};

export const Subtitle = (argTypes: NTreeSelect.TProps): ReactNode => {
  return (
    <div style={{ width: '300px', flexDirection: 'row', gap: '20px' }}>
      <TreeSelect {...argTypes} style={{ width: '100%' }} />
    </div>
  );
};

export const CompactAddonAfter = (argTypes: NTreeSelect.TProps): ReactNode => {
  const [mode, setMode] = useState<string>('1');

  const handleChange = (info: string) => {
    setMode(info);
  };

  return (
    <div style={{ width: '300px', height: '100px', flexDirection: 'row', gap: '20px' }}>
      {mode === '1' ? (
        <TreeSelect
          {...argTypes}
          suffixIcon={null}
          compactAddonAfter={
            <Select
              value={mode}
              isPopupMatchSelectWidth={false}
              optionLabelProp="labelRender"
              isFullContent={false}
              options={OPTIONS_SELECT_ICON}
              onChange={handleChange}
            />
          }
        />
      ) : (
        <MultipleSelect
          isSegmented
          showSearch
          suffixIcon={null}
          optionsSegmented={[
            { label: 'Имя', value: 'name' },
            { label: 'Код', value: 'code' },
          ]}
          options={[
            {
              label: 'Option with a very very very very very very long name',
              value: '1',
              optionsSegmentedValue: {
                name: 'Пакет 2',
                code: 'package2',
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
                name: 'Пакет 2',
                code: 'package2',
              },
            },
            {
              label: 'Option 4',
              value: '4',
              optionsSegmentedValue: {
                name: 'Пакет 2',
                code: 'package2',
              },
            },
          ]}
          compactAddonAfter={
            <Select
              value={mode}
              isPopupMatchSelectWidth={false}
              optionLabelProp="labelRender"
              isFullContent={false}
              options={OPTIONS_SELECT_ICON}
              onChange={handleChange}
            />
          }
        />
      )}
    </div>
  );
};

export const ScrollTreeSelect = (argTypes: NTreeSelect.TProps): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const data: NTreeSelect.TTreeData[] = TREE_SELECT_DATA;

  for (let i = 10; i < 36; i++) {
    data.push({
      key: i.toString(36) + i,
      title: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const [options, setOptions] = useState<any>(data);
  const [page, setPage] = useState<{ pageNumber: number; numberOfPages: number }>({
    pageNumber: 1,
    numberOfPages: 3,
  });

  const handleSearch = (_value: string, pageNumberValue: number = 1) => {
    setIsLoading(true);
    setTimeout(() => {
      const newDataPage = data?.map(dataValue => ({
        key: `${dataValue?.value}-${pageNumberValue}`,
        title: `${dataValue?.title}-${pageNumberValue}`,
        value: `${dataValue?.value}-${pageNumberValue}`,
      }));

      setOptions([...options, ...newDataPage]);
      setPage({ ...page, pageNumber: pageNumberValue });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <TreeSelect
        {...argTypes}
        isLoading={isLoading}
        optionsPage={page}
        treeData={options}
        style={{ width: 300 }}
        onSearch={handleSearch}
      />
    </div>
  );
};

export const SearchTreeSelect = (argTypes: NTreeSelect.TProps): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState(argTypes?.treeData);

  useEffect(() => {
    setOptions(argTypes?.treeData);
  }, [argTypes?.treeData]);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOptions = argTypes?.treeData?.filter(item =>
        typeof item?.title === 'string' ? item?.title?.toLowerCase().includes(value.toLowerCase()) : false
      );
      setIsLoading(false);
      setOptions(newOptions);
    }, 1000);
  };

  return (
    <div>
      <TreeSelect
        {...argTypes}
        treeData={options}
        style={{ width: 300 }}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  );
};

Default.args = {
  treeData: TREE_SELECT_DATA,
  isAllowClear: true,
  isShowSearch: true,
  isTreeDefaultExpandAll: true,
};

MultipleSelection.args = {
  ...Default.args,
  isMultiple: true,
  isAllowClear: true,
};

WithCustomSwitcherIcon.args = {
  ...Default.args,
  switcherIcon: <DownCircleOutlined />,
  isMultiple: true,
  isAllowClear: true,
};

Checkable.args = {
  ...Default.args,
  isTreeCheckable: true,
};

Placement.args = {
  ...Default.args,
  dropdownStyle: { maxHeight: 400, overflow: 'auto', minWidth: 300 },
};

Status.args = {
  ...Default.args,
};

Subtitle.args = {
  isSubTitle: true,
  treeData: TREE_SELECT_SUBTITLE_DATA,
  isMultiple: true,
  treeNodeFilterProp: 'label',
};

CompactAddonAfter.args = {
  treeData: TREE_SELECT_DATA,
};

ScrollTreeSelect.args = {
  isAllowClear: true,
};

SearchTreeSelect.args = {
  treeData: TREE_SELECT_DATA,
  isAllowClear: true,
  isMultiple: true,
  isDebounceSearch: true,
  isShowSearch: true,
};
