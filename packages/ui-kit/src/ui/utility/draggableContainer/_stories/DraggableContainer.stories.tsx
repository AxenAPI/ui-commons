import { restrictToHorizontalAxis, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Meta, StoryObj } from '@storybook/react';

import { CUSTOM_DRAGGABLE_ITEMS, DEFAULT_DRAGGABLE_ITEMS } from '../consts';
import DraggableContainer from '../DraggableContainer';

export default {
  title: 'Axenix UI/DraggableContainer/DraggableContainer',
  component: DraggableContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: { control: 'object', description: 'Массив элементов для перетаскивания' },
    gap: { control: 'number', description: 'Отступы между элементами (flex)' },
    vertical: { control: 'boolean', description: 'Вертикальное расположение элементов (flex)' },
    justify: { control: 'text', description: 'Выравнивание по главной оси (flex)' },
    align: { control: 'text', description: 'Выравнивание по поперечной оси (flex)' },
    onDragEndIndices: { action: 'onDragEndIndices', description: 'Колбэк при завершении перетаскивания' },
    strategy: { control: false, description: 'Тип сортировки (горизонтальная или вертикальная)' },
    style: { control: 'object' },
    restrictToVerticalAxis: {
      control: false,
      description: 'Ограничение перетаскивания по вертикали (модификатор dnd-kit)',
    },
    restrictToHorizontalAxis: {
      control: false,
      description: 'Ограничение перетаскивания по горизонтали (модификатор dnd-kit)',
    },
  },
  args: {
    items: DEFAULT_DRAGGABLE_ITEMS,
    gap: 24,
    vertical: true,
  },
} as Meta<typeof DraggableContainer>;

type TStory = StoryObj<typeof DraggableContainer>;

export const Default: TStory = {
  args: {
    onDragEndIndices: (from: number, to: number) => {
      // eslint-disable-next-line no-console
      console.log('Перетащили с', from, 'на', to);
    },
  },
};

export const HorizontalContainer: TStory = {
  args: {
    items: CUSTOM_DRAGGABLE_ITEMS,
    gap: 16,
    vertical: false,
    justify: 'center',
    align: 'center',
    style: { width: 600 },
    restrictToHorizontalAxis,
    onDragEndIndices: (from: number, to: number) => {
      // eslint-disable-next-line no-console
      console.log('Перетащили карточку с', from, 'на', to);
    },
  },
};

export const VerticalContainer: TStory = {
  args: {
    items: CUSTOM_DRAGGABLE_ITEMS,
    gap: 20,
    vertical: true,
    justify: 'flex-start',
    align: 'stretch',
    style: { width: 350 },
    restrictToVerticalAxis,
    onDragEndIndices: (from: number, to: number) => {
      // eslint-disable-next-line no-console
      console.log('Перетащили select с', from, 'на', to);
    },
  },
};
