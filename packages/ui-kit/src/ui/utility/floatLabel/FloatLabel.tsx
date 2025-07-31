import { ReactNode, useState } from 'react';

import { SizeType } from 'antd/es/config-provider/SizeContext';
import cn from 'classnames';

import { useTheme } from '@/providers';
import { getLabelStylesFromSize } from '@/ui/form/inputs/helpers/helpers';

import styles from './styles.module.css';

export type TProps<TValue, TSize extends SizeType> = {
  value: TValue;
  size: TSize;
  placeholder: string;
  title: string;
  children: ReactNode;
  placeholderPosition?: 'center' | 'top';
};

export const FloatLabel = <TValue, TSize extends SizeType>({
  value,
  size,
  placeholder,
  title,
  children,
  placeholderPosition = 'center',
}: TProps<TValue, TSize>) => {
  const { theme } = useTheme();

  const [focus, setFocus] = useState(false);

  const labelStyles = getLabelStylesFromSize(theme, size);
  const labelHeight = labelStyles.placeholderHeight;

  const isOccupied = Boolean(focus || value);

  const labelClass = cn(styles.label, {
    [styles.asLabel]: isOccupied,
    [styles.asPlaceholder]: !isOccupied,
  });

  const labelStyle = {
    fontSize: isOccupied ? theme.components?.Input?.labelFontSize : labelStyles.inputFontSize,
    color: isOccupied ? theme.components?.Input?.labelColor : theme.components?.Input?.colorTextPlaceholder,
    fontFamily: theme.token?.fontFamily,
    lineHeight: isOccupied ? 1 : theme.components?.Input?.lineHeight,
    top: isOccupied ? 'calc(-7px)' : `calc(${placeholderPosition === 'center' ? '50%' : '30%'} - ${labelHeight / 2}px)`,
    left: labelStyles.left,
  };

  return (
    <div style={{ position: 'relative' }} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {children}
      <label style={labelStyle} className={labelClass}>
        {isOccupied ? title : placeholder}
      </label>
    </div>
  );
};
