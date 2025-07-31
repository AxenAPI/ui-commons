import { Badge } from '@/ui/badge';
import { NDescriptions } from '@/ui/descriptions';

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
