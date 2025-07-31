import { createContext } from 'react';

import { TExtendedThemeConfig } from './models';
import { ThemeRegistry } from './theme-registry';

/**
 * Контекст темы.
 * Возвращает текущую тему и функцию для выбора темы по её `id`.
 */
export const ThemeContext = createContext<{
  theme: TExtendedThemeConfig;
  setTheme: (theme: string) => void;
}>({
  theme: ThemeRegistry.getInstance().theme,
  setTheme: () => {},
});
