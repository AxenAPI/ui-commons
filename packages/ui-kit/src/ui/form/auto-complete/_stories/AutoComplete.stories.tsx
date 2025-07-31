import type { Meta, StoryFn } from '@storybook/react';

import { AutoComplete } from '../AutoComplete';
import { FloatAutoComplete } from '../floatAutoComplete';
import { TFloatAutoCompleteProps } from '../floatAutoComplete/models';
import { NAutoComplete } from '../models';
import { ARG_TYPES, DEFAULT_ARGS } from './consts';

const meta = {
  title: 'Axenix UI/Forms/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  args: DEFAULT_ARGS,
} satisfies Meta<typeof AutoComplete>;

export default meta;

const Template: StoryFn<NAutoComplete.TProps> = (args: NAutoComplete.TProps) => <AutoComplete {...args} />;
const FloatAutoCompleteTemplate: StoryFn<TFloatAutoCompleteProps> = (args: TFloatAutoCompleteProps) => (
  <FloatAutoComplete {...args} />
);

export const Default = Template.bind({});

export const WithCustomPlaceholder = Template.bind({});

export const WithDisabled = Template.bind({});

export const WithCustomNotFoundText = Template.bind({});

export const WithErrorState = Template.bind({});

export const WithWarningState = Template.bind({});

export const WithOpenByDefault = Template.bind({});

export const FloatAutoCompleteDefault = FloatAutoCompleteTemplate.bind({});

Default.args = {
  options: [{ value: 'ab' }, { value: 'abc' }],
  style: { width: 200 },
};

WithCustomPlaceholder.args = {
  ...Default.args,
  placeholder: 'Search here...',
};

WithDisabled.args = {
  ...Default.args,
  isDisabled: true,
};

WithCustomNotFoundText.args = {
  ...Default.args,
  notFoundContent: 'Try different keywords',
  options: [],
};

WithErrorState.args = {
  ...Default.args,
  status: 'error',
};

WithWarningState.args = {
  ...Default.args,
  status: 'warning',
};

WithOpenByDefault.args = {
  ...Default.args,
  isDefaultOpen: true,
};

FloatAutoCompleteDefault.args = {
  ...Default.args,
  title: 'FloatAutoCompleteDefault',
};
