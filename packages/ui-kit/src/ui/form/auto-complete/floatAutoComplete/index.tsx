import { useState } from 'react';

import cn from 'classnames';

import { useTheme } from '@/providers';

import { AutoComplete } from '../AutoComplete';
import { getLabelStylesFromSize } from './helpers.ts';
import { TFloatAutoCompleteProps } from './models.ts';

import styles from './styles.module.css';

export const FloatAutoComplete = ({ placeholder, title, ...props }: TFloatAutoCompleteProps) => {
  const { theme } = useTheme();

  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState<string | number | undefined>(props.value);
  const [search, setSearch] = useState('');

  const labelStyles = getLabelStylesFromSize(theme);
  const labelHeight = labelStyles.placeholderHeight;

  const isOccupied = Boolean(focus || (value && value.toString()?.length > 0) || search.length > 0);
  const labelClass = isOccupied ? styles.asLabel : styles.asPlaceholder;

  const onChange = (_value: string) => {
    props.onChange?.(_value);
    setValue(_value);
  };

  const onSearch = (_value: string) => {
    props.onSearch?.(_value);
    setSearch(_value);
  };

  return (
    <div onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} className={styles.floatLabel}>
      <AutoComplete {...props} onChange={onChange} onSearch={onSearch} placeholder="" />
      <label
        style={{
          fontSize: isOccupied ? theme.components?.Input?.labelFontSize : labelStyles.inputFontSize,
          color: isOccupied ? theme.components?.Input?.labelColor : theme.components?.Input?.colorTextPlaceholder,
          fontFamily: theme.token?.fontFamily,
          lineHeight: isOccupied ? 1 : theme.components?.Input?.lineHeight,
          top: isOccupied ? 'calc(-7px)' : `calc(50% - ${labelHeight / 2}px)`,
          left: labelStyles.left,
        }}
        className={cn(styles.label, labelClass)}
      >
        {!isOccupied && placeholder ? placeholder : title}
      </label>
    </div>
  );
};
