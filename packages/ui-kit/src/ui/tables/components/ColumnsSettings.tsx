import { Key } from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { IconSettings } from '@tabler/icons-react';

import cn from 'classnames';

import { useTheme } from '@/providers/theme-provider';
import { Button, Icon, NColumns, Popover, Tooltip } from '@/ui';

import style from './style.module.css';

type TColumnsSettingsCellProps<T extends NColumns.TColumnsSettingsCellOption> = {
  columns: T[];
  checkedColumns: Key[];
  iconSettings?: React.ReactNode;
  iconSettingsCheck?: React.ReactNode;
  onOptionClick: (value: Key) => void;
};

const SETTINGS_TEXT = 'Выбор колонок';

export const ColumnsSettings = <T extends NColumns.TColumnsSettingsCellOption>(props: TColumnsSettingsCellProps<T>) => {
  const { theme } = useTheme();
  const {
    columnChooserOptionIconColor: color,
    columnChooserOptionIconWidth: width,
    columnChooserOptionIconHeight: height,
  } = theme?.components?.Table || {};

  const renderPopoverContent = () => {
    return (
      <div className="css-var-r0 ant-table-css-var">
        {props.columns?.map(option => {
          return (
            <div // eslint-disable-line jsx-a11y/no-static-element-interactions
              key={option.value}
              className={style.optionRow}
              onClick={() => props.onOptionClick(option.value)}
              onKeyDown={() => props.onOptionClick(option.value)}
            >
              <span
                className={cn(style.optionTitle, {
                  [style.optionChecked]: props.checkedColumns?.includes(option.value),
                })}
              >
                {option.label}
              </span>
              {props.checkedColumns?.includes(option.value) ? (
                <Icon
                  icon={props.iconSettingsCheck ?? <CheckOutlined />}
                  style={{
                    color,
                    width,
                    height,
                    fontSize: height,
                  }}
                />
              ) : (
                <span className={style.optionIconSize}></span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Popover
      content={renderPopoverContent()}
      trigger="click"
      className={style.settingBtn}
      placement="topRight"
      isArrow={false}
      maxHeight={theme?.components?.Table?.columnChooserMaxHeight}
      rootClassName={cn('css-var-r0 ant-table-css-var', style.optionContent)}
    >
      <Tooltip title={SETTINGS_TEXT}>
        <Button type="text" icon={props.iconSettings ?? <IconSettings />} />
      </Tooltip>
    </Popover>
  );
};
