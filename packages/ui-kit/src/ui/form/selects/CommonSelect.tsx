import { FC, useCallback, useMemo, useState } from 'react';

import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-react';

import { Empty as AntdEmpty, Select as AntdSelect, Skeleton } from 'antd';
import cn from 'classnames';
import { debounce } from 'lodash-es';

import { useTheme } from '@/providers/theme-provider';
import { Segmented } from '@/ui/segmented';
import { Empty, Space } from '@/ui/utility';

import { NSelect } from './models';
import { Option } from './Option';

import styles from './styles.module.css';

/**
 * Компонент селекта.
 */
export const CommonSelect: FC<NSelect.TCommonProps> = ({
  isAllowClear = false,
  compactAddonAfter,
  isAddOption,
  isDebounceSearch,
  isDisabled,
  isFullContent = true,
  isLoading,
  isOpen,
  isPopupMatchSelectWidth,
  isSegmented,
  maxLengthSearch,
  menuItemSelectedIcon,
  onAddOption,
  onSearch,
  onSearchFormat,
  optionLabelProp,
  options,
  optionsPage,
  optionsSegmented,
  placeholder = 'Выберите значение',
  removeIcon,
  suffixIcon,
  isReadonly,
  ...props
}) => {
  const { theme } = useTheme();

  const [searchValue, setSearchValue] = useState<string>('');
  const [segmentedValue, setSegmentedValue] = useState<string | number | undefined>(optionsSegmented?.[0]?.value);
  const [isLoadingScroll, setIsLoadingScroll] = useState<boolean>(false);

  const iconSize = theme?.components?.Select?.fontSizeIcon;
  const optionsIconSize = theme?.components?.Select?.optionFontSizeIcon;

  const styleFullContent = isFullContent ? { width: '100%' } : {};
  const selectStyle = {
    ...styleFullContent,
    ...props?.style,
  };

  const handleSearch = useCallback(
    (value: string, pageNumber?: number) => {
      let newValueSearch = value;

      setIsLoadingScroll(false);
      if (onSearchFormat) {
        newValueSearch = onSearchFormat(value);
      }

      if (maxLengthSearch && newValueSearch) {
        newValueSearch = newValueSearch?.slice(0, maxLengthSearch);
      }
      setSearchValue(newValueSearch);
      if (onSearch) {
        onSearch(newValueSearch, pageNumber, segmentedValue);
      }
    },
    [segmentedValue, onSearch, onSearchFormat, maxLengthSearch]
  );

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      handleSearch(value);
    };

    return debounce(loadOptions, 800);
  }, [handleSearch]);

  const handleDebounceSearch = (value: string) => {
    let newValueSearch = value;
    newValueSearch = onSearchFormat ? onSearchFormat(value) : value;

    if (maxLengthSearch && newValueSearch) {
      newValueSearch = newValueSearch?.slice(0, maxLengthSearch);
    }

    setSearchValue(newValueSearch);
    debounceFetcher(newValueSearch);
  };

  const handleChangeSegmented = (value: string | number) => {
    setSegmentedValue(value);
    if (onSearch && searchValue) {
      onSearch(searchValue, 1, value);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const isScroll =
      e?.currentTarget?.scrollHeight - (e?.currentTarget?.scrollTop + e?.currentTarget?.clientHeight) < 1;
    if (isScroll && optionsPage && optionsPage?.numberOfPages >= optionsPage?.pageNumber + 1) {
      setIsLoadingScroll(true);
      if (onSearch) {
        onSearch(searchValue, optionsPage?.pageNumber + 1, segmentedValue);
      }
    }
  };

  const handleAddOption = () => {
    if (searchValue) {
      onAddOption?.(searchValue);
      setSearchValue('');
    }
  };

  const handleDropdownVisibleChange = (open: boolean) => {
    props.onDropdownVisibleChange?.(open);
    if (!open && searchValue) {
      setSearchValue('');
      handleSearch('');
    }
  };

  const handleChange: NSelect.TCommonProps['onChange'] = (value, option) => {
    if (props.mode === 'tags') {
      setSearchValue('');
    }
    props.onChange?.(value, option);
  };

  const customClearIcon = typeof isAllowClear !== 'boolean' ? { clearIcon: isAllowClear?.clearIcon } : {};

  return (
    <Space.Compact style={isFullContent ? { width: '100%' } : {}}>
      <AntdSelect
        {...props}
        popupMatchSelectWidth={isPopupMatchSelectWidth}
        searchValue={searchValue}
        placeholder={isReadonly ? undefined : placeholder}
        listHeight={theme?.components?.Select?.menuMaxHeight}
        style={selectStyle}
        open={isOpen}
        optionLabelProp={optionLabelProp || 'label'}
        optionFilterProp={props.optionFilterProp ?? 'label'}
        filterOption={isDebounceSearch ? false : props?.filterOption}
        onSearch={isDebounceSearch ? handleDebounceSearch : handleSearch}
        disabled={isDisabled}
        popupClassName={styles.popupItem}
        className={cn(styles.iconOptions, props.className, {
          [styles.readonly]: isReadonly,
        })}
        onChange={handleChange}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        onPopupScroll={handleScroll}
        removeIcon={removeIcon ?? <IconX width={10} height={10} stroke={1.5} />}
        suffixIcon={
          suffixIcon !== null && !isReadonly
            ? (suffixIcon ?? <IconChevronDown width={iconSize} height={iconSize} stroke={1.5} />)
            : null
        }
        allowClear={
          isAllowClear &&
          !isReadonly && {
            clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
            ...customClearIcon,
          }
        }
        menuItemSelectedIcon={
          menuItemSelectedIcon ?? <IconCheck width={optionsIconSize} height={optionsIconSize} stroke={1.5} />
        }
        dropdownRender={menu => (
          <>
            {isSegmented && optionsSegmented && (
              <Segmented
                options={optionsSegmented}
                block
                style={{ marginBottom: 4, width: '100%' }}
                onChange={handleChangeSegmented}
              />
            )}
            {isLoading && !isLoadingScroll ? <Skeleton loading={isLoading && !isLoadingScroll} active /> : menu}
            {isAddOption && !isSegmented && (
              <div className={styles.selectNewValueBorder}>
                <div
                  role="presentation"
                  className={cn(styles.selectNewValueContent, {
                    [styles.selectNewValue]: searchValue,
                  })}
                  onClick={handleAddOption}
                >
                  <div style={{ color: theme.components?.Select?.customValueDescriptionColor }}>
                    Добавить собственное значение
                  </div>
                  {searchValue ? (
                    <div style={{ color: theme.components?.Select?.customValueDefaultColor }}>{searchValue}</div>
                  ) : (
                    <div style={{ color: theme.components?.Select?.customValueDescriptionColor }}>
                      Введите значение в поле
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        notFoundContent={
          <>
            {props.notFoundContent ?? (
              <Empty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} description="Записи не найдены" />
            )}
          </>
        }
      >
        {options?.map((option: NSelect.TSelectOption) => {
          if (NSelect.isOptionGroup(option)) {
            // Это группа опций
            return (
              <AntdSelect.OptGroup
                key={String(option.key ?? option.label)}
                label={option.label}
                className={option.className}
                disabled={option.isDisabled}
              >
                {option.options.map((opt: NSelect.TOption) => (
                  <AntdSelect.Option
                    {...opt}
                    className={opt.className}
                    disabled={isReadonly ?? opt.isDisabled}
                    label={opt.label}
                    key={opt.value}
                    title={opt?.title || opt.label}
                    value={opt.value}
                    optionsSegmentedValue={opt.optionsSegmentedValue}
                  >
                    <Option {...opt} segmentedValue={segmentedValue} />
                  </AntdSelect.Option>
                ))}
              </AntdSelect.OptGroup>
            );
          }
          // Обычная опция
          const opt = option;
          return (
            <AntdSelect.Option
              {...opt}
              className={opt.className}
              disabled={isReadonly ?? opt.isDisabled}
              label={opt.label}
              key={opt.value}
              title={opt?.title || opt.label}
              value={opt.value}
              optionsSegmentedValue={opt.optionsSegmentedValue}
            >
              <Option {...opt} segmentedValue={segmentedValue} />
            </AntdSelect.Option>
          );
        })}
        {isLoadingScroll && isLoading && (
          <AntdSelect.Option disabled>
            <Skeleton loading={isLoading && isLoadingScroll} active />
          </AntdSelect.Option>
        )}
        {props.children}
      </AntdSelect>
      {compactAddonAfter && <div className={styles.compactAfter}>{compactAddonAfter}</div>}
    </Space.Compact>
  );
};
