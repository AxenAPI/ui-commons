import { Key } from 'react';

import { NColumns } from '@/ui';

import { ColumnsSettings } from './ColumnsSettings';

type TColumnsSettingsCellProps<T extends NColumns.TColumnsSettingsCellOption> = {
  columns: T[];
  checkedColumns: Key[];
  setCheckedColumns: (value: Key[]) => void;
  iconSettings?: React.ReactNode;
  iconSettingsCheck?: React.ReactNode;
};

const MIN_VISIBLE_COLUMNS = 1;

export const ColumnsSettingsCell = <T extends NColumns.TColumnsSettingsCellOption>({
  columns,
  checkedColumns,
  setCheckedColumns,
  iconSettings,
  iconSettingsCheck,
}: TColumnsSettingsCellProps<T>) => {
  const handleOnOptionClick = (value: Key) => {
    if (checkedColumns?.includes(value)) {
      if (checkedColumns.length <= MIN_VISIBLE_COLUMNS) return;

      setCheckedColumns(checkedColumns?.filter(option => option !== value));
    } else {
      setCheckedColumns([...checkedColumns, value]);
    }
  };

  return (
    <ColumnsSettings
      columns={columns}
      checkedColumns={checkedColumns}
      iconSettingsCheck={iconSettingsCheck}
      iconSettings={iconSettings}
      onOptionClick={handleOnOptionClick}
    />
  );
};
