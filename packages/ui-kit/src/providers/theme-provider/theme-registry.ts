import { MappingAlgorithm, theme } from 'antd';

import { DEFAULT_THEME, THEME_LOCAL_STORAGE_PROP_DEFAULT_NAME } from './consts';
import { TComponentsThemeConfig, TExtendedThemeConfig } from './models';

export type TThemeRegistryStatic<T extends ThemeRegistry> = {
  instance?: T;
  new (): T;
};

export type TTheme = {
  algorithm: string;
  id: string;
  components: TComponentsThemeConfig;
} & Pick<TExtendedThemeConfig, 'token'>;

/**
 * Класс регистра тем. Позволяет регистрировать тему по её идентификатору и устанавливать
 * значение выбранной темы, сохраняя её `id` в локальное хранилище.
 */
export class ThemeRegistry {
  static instance: ThemeRegistry;

  /**
   * Имя свойства локального хранилища, в котором хранится `id` выбранной темы.
   * @default 'theme'
   */
  static themeLocalStoragePropertyName = THEME_LOCAL_STORAGE_PROP_DEFAULT_NAME;

  /**
   * Маппинг алгоритмов темы по имени, указанному в её конфиге.
   * Поддерживает два варианта: тёмная тема и светлая.
   */
  static readonly ALGORITHM_MAP: Record<string, MappingAlgorithm> = {
    dark: theme.darkAlgorithm,
    light: theme.defaultAlgorithm,
  };

  /**
   * Таблица тем с идентификаторами в роли ключей.
   */
  protected themes: Record<string, TExtendedThemeConfig> = {};

  /**
   * Возвращает инстанс регистра тем.
   */
  static getInstance<T extends ThemeRegistry>(this: TThemeRegistryStatic<T>): T {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  constructor() {
    const { algorithm, id, token, components } = DEFAULT_THEME;
    this.registerTheme(id, algorithm as 'dark' | 'light', token, components);
  }

  /**
   * Получает значение `id` выбранной темы из локального хранилища.
   */
  get selectedId() {
    return localStorage.getItem(ThemeRegistry.themeLocalStoragePropertyName) || DEFAULT_THEME.id;
  }

  /**
   * Сохраняет значение `id` выбранной темы в локальное хранилище.
   */
  set selectedId(id: string) {
    localStorage.setItem(ThemeRegistry.themeLocalStoragePropertyName, id);
  }

  /**
   * Readonly-геттер, возвращающий выбранную тему.
   */
  get theme() {
    return this.themes[this.selectedId];
  }

  /**
   * Сохраняет алгоритм и значения токенов выбранной темы по её `id`.
   */
  registerTheme(id: string, algorithm: string, token: TTheme['token'], components: TComponentsThemeConfig) {
    this.themes[id] = {
      algorithm: ThemeRegistry.ALGORITHM_MAP[algorithm],
      token,
      components,
    };
  }

  /**
   * Возвращает значение темы по её `id`.
   */
  getTheme(id: string) {
    return this.themes[id];
  }
}
