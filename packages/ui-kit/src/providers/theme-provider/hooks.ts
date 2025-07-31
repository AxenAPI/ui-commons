import { useContext } from 'react';

import { TComponents } from './models';
import { ThemeContext } from './ThemeContext';

/**
 * Хук для использования контекста тем. Возвращает текущую тему и метод для выбора темы по `id`.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Хук, возвращающий токены указанного компонента.
 */
export const useComponentTokens = <T extends TComponents>(componentName: T): Partial<Record<string, string>> => {
  const { theme } = useTheme();
  const tokens = (theme?.components?.[componentName] ?? {}) as Partial<Record<string, string>>;

  return tokens;
};
