import { RedoOutlined } from '@ant-design/icons';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/ui';

import { items } from '../_mock/FilterPanelItems';
import { Filter } from '../Filter';
import { NFilter } from '../models';

export default {
  title: 'Axenix UI/Tag/Filter',
  parameters: {
    layout: 'centered',
  },
  component: Filter,
} as Meta<typeof Filter>;

const Template: StoryFn<NFilter.TProps> = (args: NFilter.TProps) => <Filter {...args} />;

const PanelTemplate: StoryFn<NFilter.TProps> = (): JSX.Element => (
  <div style={{ display: 'flex', gap: '8px 0', flexWrap: 'wrap' }}>
    {items.map((item, index) => (
      <Filter key={index} items={item.value} label={item.label} isClosable controlMaxWidth={100} onClose={() => {}} />
    ))}
    <Button icon={<RedoOutlined />} size="small" onClick={() => {}} type="text">
      Сбросить
    </Button>
  </div>
);

export const DefaultFilter = Template.bind({});

export const OverflowFilter = Template.bind({});

export const LongFilterLabel = Template.bind({});

export const FilterLabelWithClick = Template.bind({});

export const FilterPanel = PanelTemplate.bind({});

DefaultFilter.args = {
  label: 'Лейбл',
  isClosable: true,
  controlMaxWidth: 320,
  items: ['Первое значение', 'Второе значение'],
};

OverflowFilter.args = {
  label: 'Лейбл',
  controlMaxWidth: 300,
  items: ['Константинопольский-Долгоруковский Константин', 'Константинович'],
};

LongFilterLabel.args = {
  label: 'Лейбл',
  controlMaxWidth: 100,
  items: ['Константинопольский-Долгоруковский Константин', 'Константинович'],
};

FilterLabelWithClick.args = {
  label: 'Лейбл',
  controlMaxWidth: 200,
  onLabelClick: () => {},
  items: ['Первое значение', 'Второе значение'],
};

FilterLabelWithClick.parameters = {
  docs: {
    description: { story: 'Лейбл фильтра с возможностью кастомной обработки клика.' },
  },
};

FilterPanel.parameters = {
  docs: {
    description: { story: 'Пример использования компонента Filter.' },
  },
};
