import { ReactNode } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconCheck, IconLink } from '@tabler/icons-react';

import { Button } from '@/ui/buttons/Button';
import { Divider } from '@/ui/dividers/Divider';
import { Popover } from '@/ui/popover/Popover';

import { NPopover } from '../models';
import styles from '../styles.module.css';

export default {
  title: 'Axenix UI/Popover/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  args: {
    onOpenChange: fn(),
  },
  argTypes: {
    style: { control: 'object' },
    content: { control: 'text' },
    className: { control: 'text' },
    placement: {
      control: 'select',
      options: [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
    },
    trigger: {
      control: 'inline-check',
      options: ['hover', 'focus', 'click', 'contextMenu'],
    },
    title: { control: 'text' },
    children: { control: 'text' },
    isOpen: { control: 'boolean' },
    showHeaderButtons: { control: 'boolean' },
    showCloseIcon: { control: 'boolean' },
  },
} as Meta<typeof Popover>;

export const Default = (argTypes: NPopover.TProps): ReactNode => {
  return <Popover {...argTypes} />;
};

export const CustomTitle = (argTypes: NPopover.TProps): ReactNode => {
  return <Popover {...argTypes} />;
};

export const ShowCloseIcon = (argTypes: NPopover.TProps): ReactNode => {
  return <Popover {...argTypes} />;
};

export const Triggered = (argTypes: NPopover.TProps): ReactNode => {
  return <Popover {...argTypes} />;
};

export const Placements = (argTypes: NPopover.TProps): ReactNode => {
  const buttonWidth = 80;
  const buttonStyle = { width: buttonWidth, margin: 4 };

  return (
    <div className="demo">
      <div style={{ marginInlineStart: buttonWidth, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" {...argTypes}>
          <Button style={buttonStyle}>TL</Button>
        </Popover>
        <Popover placement="top" {...argTypes}>
          <Button style={buttonStyle}>Top</Button>
        </Popover>
        <Popover placement="topRight" {...argTypes}>
          <Button style={buttonStyle}>TR</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, float: 'inline-start' }}>
        <Popover placement="leftTop" {...argTypes}>
          <Button style={buttonStyle}>LT</Button>
        </Popover>
        <Popover placement="left" {...argTypes}>
          <Button style={buttonStyle}>Left</Button>
        </Popover>
        <Popover placement="leftBottom" {...argTypes}>
          <Button style={buttonStyle}>LB</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, marginInlineStart: buttonWidth * 4 + 24 }}>
        <Popover placement="rightTop" {...argTypes}>
          <Button style={buttonStyle}>RT</Button>
        </Popover>
        <Popover placement="right" {...argTypes}>
          <Button style={buttonStyle}>Right</Button>
        </Popover>
        <Popover placement="rightBottom" {...argTypes}>
          <Button style={buttonStyle}>RB</Button>
        </Popover>
      </div>
      <div style={{ marginInlineStart: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" {...argTypes}>
          <Button style={buttonStyle}>BL</Button>
        </Popover>
        <Popover placement="bottom" {...argTypes}>
          <Button style={buttonStyle}>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" {...argTypes}>
          <Button style={buttonStyle}>BR</Button>
        </Popover>
      </div>
    </div>
  );
};

Default.args = {
  title: 'Список уведомлений',
  content: (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%' }}>
        <p>Ant Design System for Figma</p>
        <p>12.01.2024 10:00:21</p>
        <Divider style={{ margin: 0 }} />
      </div>
      <div style={{ width: '100%' }}>
        <p>Ant Design System for Figma</p>
        <p>12.01.2024 10:00:21</p>
        <Divider style={{ margin: 0 }} />
      </div>
      <div style={{ width: '100%' }}>
        <p>Ant Design System for Figma</p>
        <p>12.01.2024 10:00:21</p>
        <Divider style={{ margin: 0 }} />
      </div>
      <Button type="text" size="small" style={{ marginTop: '8px', padding: '0 7px', lineHeight: 0 }}>
        Показать все
      </Button>
    </div>
  ),
  children: <Button>Hover me</Button>,
};

CustomTitle.args = {
  ...Default.args,
  headerButton: (
    <>
      <Button type="text" className={styles.button} icon={<IconLink />} />
      <Button type="text" className={styles.button} icon={<IconCheck />} />
    </>
  ),
  showHeaderButtons: true,
  isOpen: true,
};

ShowCloseIcon.args = {
  ...Default.args,
  showCloseIcon: true,
  trigger: 'click',
  children: <Button>Click me</Button>,
};

Triggered.args = {
  ...Default.args,
  trigger: 'click',
  children: <Button>Click me</Button>,
};

Placements.args = {
  ...Default.args,
};
