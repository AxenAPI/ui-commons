import type { Meta, StoryObj } from '@storybook/react';

import { Message } from '../Message';

const meta: Meta<typeof Message> = {
  title: 'Axenix UI/Message/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['normal', 'success', 'error', 'warning', 'loading'],
      description: `Тип сообщения (визуальное состояние):\n- 'normal' — информационное сообщение\n- 'success' — успешное действие\n- 'error' — ошибка\n- 'warning' — предупреждение\n- 'loading' — индикатор загрузки`,
      table: { defaultValue: { summary: 'normal' } },
    },
    content: {
      control: 'text',
      description: 'Основное содержимое сообщения (текст или React-элемент)',
      table: { type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS-класс для корневого элемента',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: 'object',
      description: 'Inline-стили для корневого элемента',
      table: { type: { summary: 'CSSProperties' } },
    },
    icon: {
      control: false,
      description: 'Кастомная иконка (по умолчанию используется иконка по типу)',
      table: { type: { summary: 'ReactNode' } },
    },
    duration: {
      control: 'number',
      description: 'Время (мс) автозакрытия сообщения. Если не указано — сообщение не исчезает автоматически',
      table: { type: { summary: 'number' } },
    },
    onClose: {
      control: false,
      description: 'Колбэк при закрытии сообщения (по таймеру или вручную)',
      table: { type: { summary: '() => void' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Message — компонент для отображения всплывающих сообщений с разными состояниями.',
      },
    },
  },
};

export default meta;
type TStory = StoryObj<typeof Message>;

export const Normal: TStory = {
  args: {
    type: 'normal',
    content: 'Информационное сообщение',
  },
};

export const Success: TStory = {
  args: {
    type: 'success',
    content: 'Успешная операция!',
  },
};

export const Error: TStory = {
  args: {
    type: 'error',
    content: 'Произошла ошибка',
  },
};

export const Warning: TStory = {
  args: {
    type: 'warning',
    content: 'Внимание: возможны проблемы',
  },
};

export const Loading: TStory = {
  args: {
    type: 'loading',
    content: 'Загрузка данных...',
  },
};
