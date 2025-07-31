import { ReactNode, useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconAlertCircle, IconCircleDashedCheck, IconLoader2, IconMinus, IconPlus, IconX } from '@tabler/icons-react';

import { NTag } from '../models';
import { Tag } from '../Tag';
import { TAG_COLORS } from './consts';

const meta: Meta<NTag.TProps> = {
  title: 'Axenix UI/Tag/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  args: { onClose: fn() },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Текст для отображения внутри тэга (альтернатива children)',
    },
    showTooltip: {
      description: 'Показывать тултип при обрезке текста',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

const handleOnClose = () => {
  return action('onClose');
};

export const DefaultTag = (args: NTag.TProps) => {
  return <Tag {...args}>Tag</Tag>;
};

export const BorderTag = (): ReactNode => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Tag>Tag</Tag>
    <Tag isBordered={false}>Tag</Tag>
    <Tag icon={<IconPlus />} isDashed>
      Tag
    </Tag>
    <Tag icon={<IconPlus />} isBordered={false}>
      Tag
    </Tag>
    <Tag closeIcon={<CloseOutlined />} onClose={handleOnClose}>
      Tag
    </Tag>
    <Tag isBordered={false} closeIcon={<CloseOutlined />}>
      Tag
    </Tag>
  </div>
);

export const ColorfulTag = (): ReactNode => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {TAG_COLORS.map((color, i) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Tag key={`${i}-border`} color={color}>
            {color}
          </Tag>
          <Tag key={`${i}-borderless`} color={color} isBordered={false}>
            {color}
          </Tag>
        </div>
      ))}
    </div>
  );
};

export const CheckableTag = (): ReactNode => {
  const [isChecked, setIsChecked] = useState(false);
  const [isTagChecked, setIsTagChecked] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tag isCheckable isChecked={isChecked} onCheck={() => setIsChecked(!isChecked)}>
        Click
      </Tag>
      <Tag isCheckableBorder isChecked={isTagChecked} onCheck={() => setIsTagChecked(!isTagChecked)}>
        Click
      </Tag>
    </div>
  );
};

export const StatusTag = (): ReactNode => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tag status="default" icon={<IconMinus />}>
        Default
      </Tag>
      <Tag status="error" icon={<IconX />}>
        Error
      </Tag>
      <Tag status="processing" icon={<IconLoader2 />}>
        Processing
      </Tag>
      <Tag status="success" icon={<IconCircleDashedCheck />}>
        Success
      </Tag>
      <Tag status="warning" icon={<IconAlertCircle />}>
        Waring
      </Tag>
    </div>
  );
};

export const EllipsisTag = (): ReactNode => (
  <div style={{ display: 'flex', gap: 16, flexDirection: 'column', maxWidth: 300 }}>
    <Tag>Очень длинный текст, который не помещается в одну строку</Tag>
  </div>
);

export const EllipsisTagWithTooltip = (): ReactNode => (
  <div style={{ display: 'flex', gap: 16, flexDirection: 'column', maxWidth: 300 }}>
    <Tag showTooltip>Очень длинный текст, который не помещается в одну строку</Tag>
  </div>
);

DefaultTag.storyName = 'Default tag';
DefaultTag.args = {
  color: undefined,
};

EllipsisTag.storyName = 'Tag с обрезкой текста';

EllipsisTagWithTooltip.storyName = 'Tag с обрезкой текста и тултипом';
