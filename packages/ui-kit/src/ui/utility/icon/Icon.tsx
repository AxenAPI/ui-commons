import { CSSProperties, ReactNode, useMemo } from 'react';

import { useTheme } from '@/providers/theme-provider';

type TType = 'default' | 'primary';

/**
 * Модель пропсов компонента Icon.
 *
 * @property {React.ReactNode} [icon] - Отображаемая иконка.
 * @property {number} [size] - Размер иконки.
 * @property {CSSProperties} [style] - Стили.
 * @property {string} [className] - Классы стилей.
 * */
export type TIconProps = {
  icon: ReactNode;
  size?: number;
  style?: CSSProperties;
  className?: string;
  type?: TType;
};

export const Icon = ({ icon, size = 24, style, className, type = 'default' }: TIconProps) => {
  const { theme } = useTheme();

  const baseColor = theme?.components?.Icon?.[`${type}Color`];
  const iconColor = style?.color ? style?.color : baseColor;

  const combinedStyle: CSSProperties = useMemo(
    () => ({
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size,
      color: iconColor,
      ...style,
    }),
    [style, size, iconColor]
  );

  return (
    <span className={className} style={combinedStyle}>
      {icon}
    </span>
  );
};
