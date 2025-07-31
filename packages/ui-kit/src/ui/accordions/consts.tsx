import { TSize } from '@/models';

import { NCommonAccordion } from './_common/models';
import { Collapse } from './collapse';

export const SIZE_TYPE: TSize[] = ['small', 'middle', 'large'];
export const ITEMS: NCommonAccordion.TCollapseItem[] = [
  {
    key: '1',
    label: 'Это панель 1',
    children: 'Содержимое панели 1...',
  },
  {
    key: '2',
    label: 'Это панель 2',
    children: 'Содержимое панели 2...',
  },
  {
    key: '3',
    label: 'Это панель 3',
    children: 'Содержимое панели 3...',
  },
];
export const DEFAULT_DRAGGABLE_ITEMS = [
  { id: '1', key: '1', children: <Collapse items={[ITEMS[0]]} style={{ width: 550 }} /> },
  { id: '2', key: '2', children: <Collapse items={[ITEMS[1]]} style={{ width: 550 }} /> },
  { id: '3', key: '3', children: <Collapse items={[ITEMS[2]]} style={{ width: 550 }} /> },
];
