import { ReactNode } from 'react';

import type { Meta, StoryFn } from '@storybook/react';
import { IconDots, IconEdit, IconPlus, IconSettings } from '@tabler/icons-react';

import { Avatar } from 'antd';

import { Button, Input } from '@/ui';
import { Skeleton } from '@/ui/loading';
import { Space } from '@/ui/utility/space';

import { Card } from '../Card';
import { NCard } from '../model.ts';

const meta = {
  title: 'Axenix UI/Card/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    extra: { control: 'text' },
    style: { control: 'object' },
    isBordered: { control: 'boolean' },
    isInner: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'default'] },
    children: { control: 'object' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

const Template: StoryFn<NCard.TProps> = (args: NCard.TProps) => <Card {...args} />;

const DefaultContent = () => (
  <>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </>
);

export const Default = (argTypes: NCard.TProps): ReactNode => {
  return (
    <Space direction="vertical" size={16}>
      <Card title="Default size card" {...argTypes}>
        <DefaultContent />
      </Card>
      <Card size="small" title="Small size card" {...argTypes}>
        <DefaultContent />
      </Card>
    </Space>
  );
};

export const NoBorder = Template.bind({});
export const SimpleCard = Template.bind({});
export const CustomContent = Template.bind({});

export const Loading = (argTypes: NCard.TProps): ReactNode => {
  return (
    <>
      <Card {...argTypes}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Card
        style={argTypes.style}
        actions={[
          <IconSettings size={18} key="setting" />,
          <IconEdit size={18} key="edit" />,
          <IconDots size={18} key="ellipsis" />,
        ]}
      >
        <Skeleton isLoading={argTypes.isLoading} isAvatar isActive>
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </>
  );
};

export const Grid = (argTypes: NCard.TProps): ReactNode => {
  return (
    <Card title={argTypes.title}>
      <Card.Grid style={argTypes.style}>Content</Card.Grid>
      <Card.Grid hoverable={false} style={argTypes.style}>
        Content
      </Card.Grid>
      <Card.Grid style={argTypes.style}>Content</Card.Grid>
      <Card.Grid style={argTypes.style}>Content</Card.Grid>
      <Card.Grid style={argTypes.style}>Content</Card.Grid>
      <Card.Grid style={argTypes.style}>Content</Card.Grid>
      <Card.Grid style={argTypes.style}>Content</Card.Grid>
    </Card>
  );
};

export const Inner = (): ReactNode => {
  return (
    <Card title="Card title">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Card isInner title="Inner Card title" extra={<a href="#">More</a>}>
        Inner Card content
      </Card>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Card style={{ marginTop: 16 }} isInner title="Inner Card title" extra={<a href="#">More</a>}>
        Inner Card content
      </Card>
    </Card>
  );
};

export const InnerStyle = (argTypes: NCard.TProps): ReactNode => {
  return (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Card {...argTypes}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            border: '1px dashed #d9d9d9',
            padding: '77px 0',
          }}
        >
          Slot component
        </div>
      </Card>
    </div>
  );
};

Default.args = {
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  extra: <a href="#">More</a>,
  style: { width: 300 },
};

NoBorder.args = {
  ...Default.args,
  title: 'Card title',
  isBordered: false,
  children: DefaultContent(),
};

SimpleCard.args = {
  style: { width: 300 },
  children: DefaultContent(),
};

CustomContent.args = {
  isHoverable: true,
  style: { width: 240 },
  cover: <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />,
  children: <Card.Meta title="Europe Street beat" description="description" />,
};

Loading.args = {
  style: { width: 300, marginTop: 16 },
  isLoading: true,
};

Grid.args = {
  title: 'Card Title',
  style: {
    width: '25%',
    textAlign: 'center',
  },
};

InnerStyle.args = {
  title: 'Inner card title',
  style: { width: 539 },
  isInnerStyle: true,
  extra: (
    <>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Input placeholder="Поиск" />
        <Button
          icon={<IconPlus width={16} height={16} />}
          style={{
            minWidth: 32,
            minHeight: 32,
          }}
        />
      </div>
    </>
  ),
};
