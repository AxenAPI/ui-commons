import { FC } from 'react';

import { useTheme } from '@/providers/theme-provider';

import { NSelect } from './models';

/**
 * Компонент селекта.
 * */
export const Option: FC<NSelect.TOptionProps> = props => {
  const { theme } = useTheme();

  if (props?.customRenderOption) {
    return props?.customRenderOption(props);
  }
  if (props?.optionsSegmentedValue) {
    return (
      props.optionsSegmentedValue &&
      Object.entries(props.optionsSegmentedValue)?.map(([key, value], index: number) => {
        const subtextFontSize = index > 0 ? { fontSize: theme?.components?.Select?.subtextFontSize } : {};
        const menuItemColor =
          props.segmentedValue !== key
            ? { color: theme?.components?.Select?.menuItemSubtleColor }
            : { color: theme?.components?.Select?.menuItemDefaultColor };
        return (
          <div
            key={key}
            style={{
              ...subtextFontSize,
              ...menuItemColor,
            }}
          >
            {value}
          </div>
        );
      })
    );
  }
  return <div>{props.label}</div>;
};
