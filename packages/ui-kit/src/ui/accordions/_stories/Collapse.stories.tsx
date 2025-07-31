import { ReactNode, useState } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconSettings } from '@tabler/icons-react';

import { Button } from '@/ui/buttons';
import { Drawer } from '@/ui/drawer';
import { Text } from '@/ui/typography';
import { DraggableContainer } from '@/ui/utility/draggableContainer';

import { Collapse, NCollapse } from '../collapse';
import { DEFAULT_DRAGGABLE_ITEMS, ITEMS, SIZE_TYPE } from '../consts';

const newItemsShowArrow = structuredClone(ITEMS);
newItemsShowArrow[0].showArrow = false;

const newItemsExtra = structuredClone(ITEMS);
newItemsExtra[0].extra = (
  <IconSettings
    stroke={1.5}
    onClick={event => {
      event.stopPropagation();
    }}
  />
);

export default {
  title: 'Axenix UI/Accordions/Collapse',
  args: {
    accordeon: false,
    onChange: fn(),
  },
  argTypes: {
    isGhost: { control: 'boolean' },
    collapsible: { control: 'select', options: ['header', 'icon', 'disabled'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    showArrow: { control: 'object' },
    onChange: () => {},
  },
  component: Collapse,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Collapse>;

export const Default = (argTypes: NCollapse.TProps): ReactNode => {
  return <Collapse {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const WithSomeOpened = (argTypes: NCollapse.TProps): ReactNode => {
  return <Collapse {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const SizeVariants = (argTypes: NCollapse.TProps): ReactNode => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {SIZE_TYPE.map(size => (
        <Collapse {...argTypes} key={size} items={ITEMS} size={size} style={{ width: 350 }} />
      ))}
    </div>
  );
};

export const IsGhost = (argTypes: NCollapse.TProps): ReactNode => {
  return <Collapse {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const Collapsible = (argTypes: NCollapse.TProps): ReactNode => {
  return <Collapse {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const CollapseDraggable = (): ReactNode => {
  const handleDragEnd = (activeIndex: number, overIndex: number) => {
    // eslint-disable-next-line no-console
    console.log('activeIndex', activeIndex);
    // eslint-disable-next-line no-console
    console.log('overIndex', overIndex);
  };
  return (
    <DraggableContainer items={DEFAULT_DRAGGABLE_ITEMS} gap={24} vertical={true} onDragEndIndices={handleDragEnd} />
  );
};

export const ShowArrow = (argTypes: NCollapse.TProps): ReactNode => {
  return <Collapse {...argTypes} items={newItemsShowArrow} style={{ width: 350 }} />;
};

export const ExtraArrow = (argTypes: NCollapse.TProps): ReactNode => {
  return <Collapse {...argTypes} items={newItemsExtra} style={{ width: 350 }} />;
};

export const Embedded = (argTypes: NCollapse.TProps): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text>Embedded collapse</Text>
        <Button onClick={() => setIsOpen(true)}>Click</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text>Default collapse</Text>
        <Collapse {...argTypes} isOutline={false} items={ITEMS} />
      </div>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Embedded Collapse" placement="left">
        <Collapse {...argTypes} items={ITEMS} />
      </Drawer>
    </div>
  );
};

WithSomeOpened.args = {
  defaultActiveKey: ['1', '2'],
};

IsGhost.args = {
  isGhost: true,
};

Collapsible.args = {
  collapsible: 'icon',
};

Embedded.args = {
  isOutline: true,
};
