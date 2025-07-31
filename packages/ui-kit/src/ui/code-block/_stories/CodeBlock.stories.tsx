import type { Meta, StoryFn } from '@storybook/react';

import { CodeBlock } from '../CodeBlock';
import { NCodeBlock } from '../models';

const meta = {
  title: 'Axenix UI/CodeBlock/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    code: { control: 'text' },
    language: { control: 'text' },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

const Template: StoryFn<NCodeBlock.TProps> = args => <CodeBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  code: 'default code here',
  language: 'JavaScript',
};

export const WithLanguage = Template.bind({});
WithLanguage.args = {
  ...Default.args,
  language: 'Python',
};

export const WithCode = Template.bind({});
WithCode.args = {
  ...Default.args,
  code: 'Your code here',
};
