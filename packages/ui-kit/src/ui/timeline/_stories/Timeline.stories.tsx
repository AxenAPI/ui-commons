import type { Meta, StoryObj } from '@storybook/react';

import {
  TIMELINE_ALTERNATE_ITEMS,
  TIMELINE_BASE_ITEMS,
  TIMELINE_CUSTOM_COLORS_ITEMS,
  TIMELINE_CUSTOM_ICONS_ITEMS,
  TIMELINE_HORIZONTAL_ITEMS,
} from '../constants';
import { Timeline } from '../Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Axenix UI/Timeline/Timeline',
  component: Timeline,
  parameters: {
    docs: {
      description: {
        component: `Компонент Timeline отображает последовательность событий во времени.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['left', 'alternate', 'right'],
      description: `Режим позиционирования точек/контента:\n- 'left' — все точки слева\n- 'alternate' — точки чередуются слева/справа\n- 'right' — все точки справа`,
      table: { defaultValue: { summary: 'left' } },
    },
    items: {
      control: { type: 'object' },
      description: `**items** — это массив объектов, каждый из которых описывает элемент таймлайна.
      \n\n- color?: string — цвет head (dot)
      \n- dot?: ReactNode — кастомный dot (иконка, элемент)
      \n- children: ReactNode — содержимое (строка, JSX, фрагмент)
      \n- contentPosition: 'top' | 'bottom' — расположение контента относительно head (по умолчанию bottom)`,
    },
  },
};

export default meta;

type TStory = StoryObj<typeof Timeline>;

export const Left: TStory = {
  name: 'Позиционирование: left',
  args: { mode: 'left', items: TIMELINE_BASE_ITEMS },
  render: args => <Timeline {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'mode="left" — точки располагаются слева.',
      },
    },
  },
};

export const Right: TStory = {
  name: 'Позиционирование: right',
  args: { mode: 'right', items: TIMELINE_BASE_ITEMS },
  render: args => <Timeline {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'mode="right" — точки располагаются справа.',
      },
    },
  },
};

export const Alternate: TStory = {
  name: 'Позиционирование: alternate',
  args: {
    mode: 'alternate',
    items: TIMELINE_ALTERNATE_ITEMS,
  },
  render: args => <Timeline {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'mode="alternate" — элементы чередуются слева/справа.',
      },
    },
  },
};

export const CustomColors: TStory = {
  name: 'Пользовательские цвета',
  args: {
    mode: 'left',
    items: TIMELINE_CUSTOM_COLORS_ITEMS,
  },
  render: args => <Timeline {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Пользователь может задать цвет точки через свойство color.',
      },
    },
  },
};

export const CustomIcons: TStory = {
  name: 'Кастомные иконки',
  args: {
    mode: 'left',
    items: TIMELINE_CUSTOM_ICONS_ITEMS,
  },
  render: args => <Timeline {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Пользователь может передать кастомную иконку через свойство dot.',
      },
    },
  },
};

export const Horizontal: TStory = {
  name: 'Горизонтальный режим',
  args: {
    mode: 'horizontal',
    items: TIMELINE_HORIZONTAL_ITEMS,
  },
  render: args => <Timeline {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'mode="horizontal" — точка располагается слева, контент может быть сверху или снизу.',
      },
    },
  },
};
