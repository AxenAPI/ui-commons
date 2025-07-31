import { IconCheck, IconX } from '@tabler/icons-react';

import { Text } from '../typography';
import { Icon } from '../utility';

/**
 * Функция для обработки значений для вывода в таблицу
 */
export const renderWithColumn = (value: string | boolean, defaultValue: string) => {
  if (typeof value === 'boolean') {
    return <Icon size={16} icon={value ? <IconCheck /> : <IconX />} />;
  }

  return value !== null && value !== undefined && value !== '' ? value : defaultValue;
};

export const renderColumn = (value: string | boolean, defaultValue: string) => (
  <Text style={{ display: 'block' }} isEllipsis={{ tooltip: value }}>
    {renderWithColumn(value, defaultValue)}
  </Text>
);
