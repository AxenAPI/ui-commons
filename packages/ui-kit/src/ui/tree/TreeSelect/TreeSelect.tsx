import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { IconChevronDown, IconX } from '@tabler/icons-react';

import { Empty as AntdEmpty, TreeSelect as AntTreeSelect, Skeleton } from 'antd';
import { AntTreeNodeProps } from 'antd/es/tree/Tree';
import { DataNode as TDataNode } from 'antd/lib/tree';
import cn from 'classnames';
import { debounce } from 'lodash-es';

import { useTheme } from '@/providers/theme-provider';
import { DefaultTreeExpandIcon } from '@/ui/accordions/_common';
import { Tooltip } from '@/ui/tooltip/Tooltip.tsx';
import { Space } from '@/ui/utility';
import { Empty } from '@/ui/utility/empty/Empty.tsx';

import { NTreeSelect } from './models.ts';

import styles from './styles.module.css';

export const TreeSelect: FC<NTreeSelect.TProps> = ({
  compactAddonAfter,
  isAllowClear = false,
  isAutoClearSearchValue,
  isDebounceSearch,
  isDisabled,
  isFullContent = true,
  isLabelInValue,
  isLimitInputHeight,
  isLoading,
  isMultiple,
  isOpen,
  isPopupMatchSelectWidth,
  isShowSearch,
  isSubTitle,
  isTopContent,
  isTreeCheckStrictly,
  isTreeCheckable,
  isTreeDefaultExpandAll,
  isTreeIcon,
  isVirtual,
  maxLengthSearch,
  onSearch,
  onSearchFormat,
  optionsPage,
  placeholder = 'Выберите значение',
  removeIcon,
  suffixIcon,
  treeData,
  treeNodeLabelProp,
  switcherIcon,
  minWidth = '50px',
  ...props
}) => {
  const { theme } = useTheme();
  const [isLoadingScroll, setIsLoadingScroll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isMaxTag, setIsMaxTag] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>();

  let maxTagCount = props.maxTagCount;
  let maxTagTextLength = props.maxTagTextLength;

  if (isTopContent && !isMaxTag) {
    maxTagCount = 'responsive';

    if (!props.maxTagTextLength) {
      maxTagTextLength = 10;
    }
  }

  const selectElement = document.querySelector('.ant-select-focused')?.classList;
  useEffect(() => {
    if (!dropdownVisible && dropdownVisible !== undefined) {
      selectElement?.remove('ant-select-focused');
    } else {
      if (isTopContent) {
        setIsMaxTag(true);
      }
    }
  }, [selectElement, dropdownVisible, isTopContent]);

  const iconSize = theme?.components?.TreeSelect?.iconSize;
  const customClearIcon = typeof isAllowClear !== 'boolean' ? { clearIcon: isAllowClear?.clearIcon } : {};
  const styleFullContent = isFullContent ? { flex: 1, minWidth } : {};
  const selectStyle = {
    ...styleFullContent,
    ...props?.style,
  };

  const getTreeData = (tree: NTreeSelect.TTreeData[] = []): NTreeSelect.TTreeData[] =>
    tree?.map(tree => {
      const childrenData =
        tree?.children && tree?.children?.length > 0
          ? {
              children: getTreeData(tree?.children),
            }
          : {};
      return {
        ...tree,
        title: (data: TDataNode) => (
          <div className={styles.labelContent}>
            {tree?.iconLabel &&
              React.cloneElement(tree?.iconLabel as React.ReactElement, {
                className: styles.iconLabel,
              })}
            <div>
              <div>{tree?.label || (typeof tree?.title === 'function' ? tree?.title(data) : tree?.title)}</div>
              <div className={styles.treeSubtext}>{tree?.subLabel || tree?.value}</div>
            </div>
          </div>
        ),
        label: (
          <Tooltip placement={'topLeft'} title={tree?.titlePopup}>
            <div className={styles.labelContent}>
              {tree?.iconLabel && (
                <div className={styles.icon}>
                  {React.cloneElement(tree?.iconLabel as React.ReactElement, {
                    className: styles.iconLabel,
                  })}
                </div>
              )}
              <div className={styles.label} title={typeof tree?.label === 'string' ? tree?.label : undefined}>
                {tree?.label}
              </div>
            </div>
          </Tooltip>
        ),
        ...childrenData,
      };
    });

  const newTreeData = isSubTitle ? getTreeData(treeData) : treeData;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const isScroll =
      e?.currentTarget?.scrollHeight - (e?.currentTarget?.scrollTop + e?.currentTarget?.clientHeight) < 1;
    if (isScroll && optionsPage && optionsPage?.numberOfPages >= optionsPage?.pageNumber + 1) {
      setIsLoadingScroll(true);
      if (onSearch) {
        onSearch(searchValue, optionsPage?.pageNumber + 1);
      }
    }
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
        onSearch(newValueSearch, pageNumber);
      }
    },
    [onSearchFormat, maxLengthSearch, onSearch]
  );

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      handleSearch(value);
    };

    return debounce(loadOptions, 800);
  }, [handleSearch]);

  const handleDebounceSearch = (value: string) => {
    const newValueSearch = onSearchFormat ? onSearchFormat(value) : value;

    setSearchValue(newValueSearch);
    debounceFetcher(newValueSearch);
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setIsMaxTag(true);
    }
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    if (isTopContent) {
      setIsMaxTag(false);
    }
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <Space.Compact style={isFullContent ? { maxWidth: '100%', display: 'flex' } : {}}>
      <AntTreeSelect
        {...props}
        allowClear={
          isAllowClear && {
            clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
            ...customClearIcon,
          }
        }
        className={cn(props.className, {
          [styles.selectMultipleItm]: isMultiple,
          [styles.selectPosition]: isTopContent && isMaxTag,
          [styles.selectScroll]: isLimitInputHeight,
          [styles.selectScrollSm]: isLimitInputHeight && props.size === 'small',
          [styles.selectScrollLg]: isLimitInputHeight && props.size === 'large',
        })}
        popupClassName={cn(props.popupClassName, {
          [styles.popupSub]: isSubTitle,
        })}
        open={isOpen}
        popupMatchSelectWidth={isPopupMatchSelectWidth}
        listHeight={theme?.components?.TreeSelect?.menuMaxHeight}
        style={selectStyle}
        treeData={newTreeData}
        searchValue={searchValue}
        maxTagCount={maxTagCount}
        maxTagTextLength={maxTagTextLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={props.autoFocus || (dropdownVisible && isTopContent)}
        maxTagPlaceholder={omittedValues => (
          <Tooltip overlayStyle={{ pointerEvents: 'none' }} title={omittedValues.map(({ label }) => label).join(', ')}>
            <span>{`+${omittedValues?.length}`}</span>
          </Tooltip>
        )}
        notFoundContent={
          <>
            {props.notFoundContent ?? (
              <Empty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} description="Записи не найдены" />
            )}
          </>
        }
        /**TO_DO: Исправление бага в ant с потерей onBlur */
        onDropdownVisibleChange={visible => {
          if (!visible) {
            setIsMaxTag(false);
          }
          setDropdownVisible(visible);
          props?.onDropdownVisibleChange?.(visible);
        }}
        treeNodeLabelProp={isSubTitle ? treeNodeLabelProp || 'label' : treeNodeLabelProp}
        autoClearSearchValue={isAutoClearSearchValue}
        disabled={isDisabled}
        labelInValue={isLabelInValue}
        multiple={isMultiple}
        dropdownRender={menu => (
          <>
            {isLoading && !isLoadingScroll ? <Skeleton loading={isLoading && !isLoadingScroll} active /> : menu}
            {isLoadingScroll && isLoading && <Skeleton loading={isLoading && isLoadingScroll} active />}
          </>
        )}
        removeIcon={removeIcon ?? <IconX width={10} height={10} stroke={1.5} />}
        suffixIcon={
          suffixIcon !== null
            ? (suffixIcon ?? <IconChevronDown width={iconSize} height={iconSize} stroke={1.5} />)
            : null
        }
        switcherIcon={
          switcherIcon || ((props: AntTreeNodeProps) => <DefaultTreeExpandIcon expanded={props.expanded} />)
        }
        showSearch={isShowSearch}
        onPopupScroll={handleScroll}
        onSearch={isDebounceSearch ? handleDebounceSearch : handleSearch}
        placeholder={placeholder}
        treeCheckable={isTreeCheckable}
        treeCheckStrictly={isTreeCheckStrictly}
        treeDefaultExpandAll={isTreeDefaultExpandAll}
        treeIcon={isTreeIcon}
        virtual={isVirtual}
        filterTreeNode={isDebounceSearch ? false : props?.filterTreeNode}
      />
      {compactAddonAfter && <div className={styles.compactAfter}>{compactAddonAfter}</div>}
    </Space.Compact>
  );
};
