import React from 'react';

import { TExtendedThemeConfig } from './models';
import { ThemeRegistry, TTheme } from './theme-registry';

/**
 * Регистрирует тему для её дальнейшего использования.
 */
export const registerTheme = ({ id, algorithm, token, components }: TTheme): void => {
  ThemeRegistry.getInstance().registerTheme(id, algorithm, token, components);
};

/**
 * Хук для взаимодействия с регистром тем.
 */
export const useThemeRegistry = (): [TExtendedThemeConfig, (id: string, isStrict?: boolean) => void] => {
  const [themeId, setThemeId] = React.useState<string>(ThemeRegistry.getInstance().selectedId);

  return [
    ThemeRegistry.getInstance().getTheme(themeId),
    /**
     * Помечает выбранную тему в качестве активной.
     *
     * @param {string} id - Идентификатор темы.
     * @param {boolean} [isStrict] - Флаг строгости проверки.
     *
     * @throws {ReferenceError} Если флаг `strict` явно не отмечен как false, а тема не зарегистрирована.
     */
    (id: string, isStrict: boolean = true) => {
      setThemeId(() => {
        if (isStrict && !ThemeRegistry.getInstance().getTheme(id)) {
          throw new ReferenceError(`Theme '${id}' is not registered!`);
        }
        ThemeRegistry.getInstance().selectedId = id;

        return id;
      });
    },
  ];
};
