import React, { ReactNode, useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/ui/buttons';
import { Divider } from '@/ui/dividers';
import { Space } from '@/ui/utility';

import { NTooltip } from '../models';
import { Tooltip } from '../Tooltip';
import { ARG_TYPES, COLORS, CUSTOM_COLORS } from './consts';

export default {
  title: 'Axenix UI/Tooltip/Tooltip',
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  component: Tooltip,
  tags: ['autodocs'],
} as Meta<typeof Tooltip>;

export const Default = (argTypes: NTooltip.TProps): ReactNode => {
  return (
    <Tooltip {...argTypes}>
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  );
};

const Template: StoryFn<NTooltip.TProps> = (argTypes: NTooltip.TProps) => {
  const buttonWidth = 80;
  const buttonStyle = { width: buttonWidth, margin: 4 };

  return (
    <>
      <div className="demo">
        <div style={{ marginInlineStart: buttonWidth, whiteSpace: 'nowrap' }}>
          <Tooltip placement="topLeft" {...argTypes}>
            <Button style={buttonStyle}>TL</Button>
          </Tooltip>
          <Tooltip placement="top" {...argTypes}>
            <Button style={buttonStyle}>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" {...argTypes}>
            <Button style={buttonStyle}>TR</Button>
          </Tooltip>
        </div>
        <div style={{ width: buttonWidth, float: 'inline-start' }}>
          <Tooltip placement="leftTop" {...argTypes}>
            <Button style={buttonStyle}>LT</Button>
          </Tooltip>
          <Tooltip placement="left" {...argTypes}>
            <Button style={buttonStyle}>Left</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" {...argTypes}>
            <Button style={buttonStyle}>LB</Button>
          </Tooltip>
        </div>
        <div style={{ width: buttonWidth, marginInlineStart: buttonWidth * 4 + 24 }}>
          <Tooltip placement="rightTop" {...argTypes}>
            <Button style={buttonStyle}>RT</Button>
          </Tooltip>
          <Tooltip placement="right" {...argTypes}>
            <Button style={buttonStyle}>Right</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" {...argTypes}>
            <Button style={buttonStyle}>RB</Button>
          </Tooltip>
        </div>
        <div style={{ marginInlineStart: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Tooltip placement="bottomLeft" {...argTypes}>
            <Button style={buttonStyle}>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" {...argTypes}>
            <Button style={buttonStyle}>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" {...argTypes}>
            <Button style={buttonStyle}>BR</Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export const Placement = Template.bind({});

export const Arrow = Template.bind({});

export const Colorful = (argTypes: NTooltip.TProps): ReactNode => (
  <>
    <Divider orientation="start">Presets</Divider>
    <Space wrap>
      {COLORS.map(color => (
        <Tooltip {...argTypes} color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </Space>
    <Divider orientation="start">Custom</Divider>
    <Space wrap>
      {CUSTOM_COLORS.map(color => (
        <Tooltip {...argTypes} color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </Space>
  </>
);

export const Disabled: React.FC = (argTypes: NTooltip.TProps) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Space>
      <Button onClick={() => setDisabled(!disabled)}>{disabled ? 'Enable' : 'Disable'}</Button>
      <Tooltip {...argTypes} title={disabled ? '' : 'prompt text'}>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </Space>
  );
};

export const CombinedTooltipSingleRow = (argTypes: NTooltip.TProps): ReactNode => {
  return (
    <Space>
      <Tooltip {...argTypes} combined={{ type: argTypes.combined?.type, rows: argTypes.combined?.rows }}>
        <span>Combined tooltip.</span>
      </Tooltip>
    </Space>
  );
};

export const CombinedTooltipDoubleRow = CombinedTooltipSingleRow.bind({});

Default.args = {
  title:
    'Когда поднимается одна пылинка, в ней содержится вся земля, когда распускается один цветок, раскрывается целый мир',
};

Placement.args = Default.args;

Arrow.args = {
  ...Default.args,
  arrow: true,
};

Colorful.args = {
  ...Default.args,
};

CombinedTooltipSingleRow.args = {
  ...Default.args,
  width: '315px',
  combined: {
    type: 'single',
    rows: [
      {
        label: 'Product:',
        value: <span style={{ whiteSpace: 'nowrap' }}>Ant Design System</span>,
      },
      {
        label: 'Product Name:',
        value: <span style={{ whiteSpace: 'nowrap' }}>Ant Design System for Figma</span>,
      },
      {
        label: 'Product Name:',
        value: <span style={{ whiteSpace: 'nowrap' }}>Ant Design System for Figma</span>,
      },
    ],
  },
};

CombinedTooltipDoubleRow.args = {
  ...CombinedTooltipSingleRow.args,
  combined: {
    rows: CombinedTooltipSingleRow.args.combined.rows,
    type: 'double',
  },
};
