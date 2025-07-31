import { TAnyObject } from '@/models';

/**
 * Утилита для нормализации массива объектных данных - [{ foo: 'bar' }] => { bar: { foo: 'bar' } }
 */
export const normalize = <T extends TAnyObject>(arr: T[], key: keyof T) =>
  arr.reduce((acc: Record<string, T>, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});
