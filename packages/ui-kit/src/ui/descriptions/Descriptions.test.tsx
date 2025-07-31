import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Badge, Descriptions, NDescriptions } from '@/ui';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

export const ITEMS: NDescriptions.TDescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Имя',
    children: <span>Иван Васильев</span>,
  },
  {
    key: '2',
    label: 'Телефон',
    children: <span>+79881654888</span>,
  },
  {
    key: '3',
    label: 'Почта',
    children: <span>ivan@list.com</span>,
  },
  {
    key: '4',
    label: 'Прошлое место работы',
    children: <span>-</span>,
  },
  {
    key: '5',
    label: 'Адрес',
    children: <span>г. Саратов, ул. Строителей, д. 123</span>,
  },
];
export const STATUS_ITEMS: NDescriptions.TDescriptionsProps['items'] = [
  ...ITEMS,
  {
    key: '6',
    label: 'Статус',
    children: <Badge text="В работе" status={'processing'} />,
  },
];
const Template = (args: NDescriptions.TDescriptionsProps) => {
  return <Descriptions items={ITEMS} {...args} />;
};

const Default = Template.bind({});

const MiddleSize = Template.bind({});
const SmallSize = Template.bind({});
export const Vertical = Template.bind({});
export const WithStatus = Template.bind({});

describe('/ui/descriptions/Descriptions.tsx', () => {
  test('render default', () => {
    const { container } = render(Default({}));
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Иван Васильев')).toBeInTheDocument();
    const descriptionElement = container.querySelector('.ant-descriptions');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('render middle', () => {
    const { container } = render(MiddleSize({ size: 'middle' }));
    expect(screen.getByText('Телефон')).toBeInTheDocument();
    expect(screen.getByText('+79881654888')).toBeInTheDocument();
    const descriptionElement = container.querySelector('.ant-descriptions-middle');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('render small', () => {
    const { container } = render(SmallSize({ size: 'small' }));
    expect(screen.getByText('Почта')).toBeInTheDocument();
    expect(screen.getByText('ivan@list.com')).toBeInTheDocument();
    const descriptionElement = container.querySelector('.ant-descriptions-small');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('render vertical', () => {
    const { container } = render(Vertical({ layout: 'vertical' }));
    expect(screen.getByText('Почта')).toBeInTheDocument();
    expect(screen.getByText('ivan@list.com')).toBeInTheDocument();
    const descriptionElement = container.querySelector('.ant-descriptions-row>th');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('render WithStatus', () => {
    const { container } = render(WithStatus({ items: STATUS_ITEMS }));
    expect(screen.getByText('В работе')).toBeInTheDocument();
    const descriptionElement = container.querySelector('.ant-badge-status');
    expect(descriptionElement).toBeInTheDocument();
  });
});
