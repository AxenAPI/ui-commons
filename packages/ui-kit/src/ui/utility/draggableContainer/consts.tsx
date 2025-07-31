import { Card } from '@/ui/utility/card/Card';

import { NDraggableContainer } from './models';

export const DEFAULT_DRAGGABLE_ITEMS: NDraggableContainer.TItem[] = [
  { id: '1', key: '1-key', children: 'Item 1' },
  { id: '2', key: '2-key', children: 'Item 2' },
  { id: '3', key: '3-key', children: 'Item 3' },
];

export const CUSTOM_DRAGGABLE_ITEMS = [
  {
    id: 'card1',
    key: 'card1',
    children: (
      <Card title="Card 1" style={{ width: 180 }}>
        Card content 1
      </Card>
    ),
  },
  {
    id: 'card2',
    key: 'card2',
    children: (
      <Card title="Card 2" style={{ width: 180 }}>
        Card content 2
      </Card>
    ),
  },
  {
    id: 'card3',
    key: 'card3',
    children: (
      <Card title="Card 3" style={{ width: 180 }}>
        Card content 3
      </Card>
    ),
  },
];

export const SENSOR_DISTANCE = 8;
