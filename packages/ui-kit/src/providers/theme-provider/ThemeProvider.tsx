import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { StyleProvider } from '@ant-design/cssinjs';
import { HashPriority } from '@ant-design/cssinjs/lib/StyleContext';

import { ConfigProvider, ThemeConfig } from 'antd';
import { Locale } from 'antd/es/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { globalLocale } from '@/locales';

import { useThemeRegistry } from './api';
import { ThemeContext } from './ThemeContext';

dayjs.locale('ru');

//TODO: namespace ThemeProviderProps
type TProps = {
  theme?: ThemeConfig;
  children: ReactNode;
  shouldUseLayer?: boolean;
  hashPriority?: HashPriority;
};

export function ThemeProvider({ children, shouldUseLayer, hashPriority }: TProps) {
  const [theme, setTheme] = useThemeRegistry();
  const { t } = useTranslation();

  theme.cssVar = true;

  // Локаль для ConfigProvider
  const globalBuddhistLocale: Locale = globalLocale(t);

  return (
    <StyleProvider layer={shouldUseLayer} hashPriority={hashPriority}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ConfigProvider locale={globalBuddhistLocale} theme={theme}>
          {children}
        </ConfigProvider>
      </ThemeContext.Provider>
    </StyleProvider>
  );
}
