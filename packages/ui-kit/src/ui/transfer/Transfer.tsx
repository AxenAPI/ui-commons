import { ChangeEventHandler, ElementRef, useEffect, useRef, useState } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

import { Transfer as AntdTransfer } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers';
import { Input, InputSearch } from '@/ui/form/inputs';

import { Empty } from '../utility';
import { useTablerIcons } from './hooks/useTablerIcons';
import { NTransfer } from './models';

import styles from './styles.module.css';

export const Transfer = <TCustomData extends NTransfer.TRecordBaseType = NTransfer.TRecordType>({
  isDisabled,
  isOneWay,
  isShowSearch,
  isShowSelectAll,
  isFilterOption,
  children,
  listsWidths,
  customNotFoundImage,
  customNotFoundText,
  customSearchNotFoundImage,
  customSearchNotFoundText,
  locale,
  withDefaultSelectionActions = false,
  withSearchButton,
  ...restProps
}: NTransfer.TProps<TCustomData>) => {
  const { theme } = useTheme();
  const hiddenAntDefaultSearchesRefs = useRef<Array<Element>>([]);
  const [isLeftSearch, setIsLeftSearch] = useState(false);
  const [isRightSearch, setIsRightSearch] = useState(false);

  useEffect(() => {
    if (transferWrapperRef.current) {
      const transferHeaders = transferWrapperRef.current.querySelectorAll('.ant-transfer-list-header');
      transferHeaders.forEach(header => {
        (header as HTMLElement).style.background = theme.components?.Transfer?.headerBg as string;
      });

      const inputWrappers = transferWrapperRef.current.querySelectorAll('.ant-transfer-list-body-search-wrapper');

      inputWrappers.forEach(searchEl => {
        searchEl.classList.add(styles.hidden);

        const defaultTransferInput = searchEl.querySelector('.ant-input');

        if (defaultTransferInput) {
          hiddenAntDefaultSearchesRefs.current.push(defaultTransferInput);
        }
      });

      /**
       * Изменение ширин списков
       */
      const transferLists = transferWrapperRef.current.querySelectorAll('.ant-transfer-list');
      const panelsWidths = listsWidths?.length
        ? listsWidths.length === 1
          ? [listsWidths[0], theme.components?.Transfer?.panelRightMaxWidth]
          : listsWidths
        : [theme.components?.Transfer?.panelLeftMaxWidth, theme.components?.Transfer?.panelRightMaxWidth];

      if (transferLists.length) {
        transferLists.forEach((el, i) => {
          const panelWidth = panelsWidths[i];
          const element = el as HTMLElement;

          if (typeof panelWidth === 'number') {
            element.style.width = `${panelWidth}px`;
          } else if (typeof panelWidth === 'string') {
            element.style.width = panelWidth;
          }
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch: ChangeEventHandler<HTMLInputElement> = e => {
    /**
     * Метод, чтобы задействовать поиск Transfer-a по умолчанию
     */
    const searchPosition = e.target.id === 'left' ? 0 : 1;

    if (e.target.id === 'left') {
      setIsLeftSearch(!!e.target.value);
    } else {
      setIsRightSearch(!!e.target.value);
    }

    hiddenAntDefaultSearchesRefs.current[searchPosition].setAttribute('value', e.target.value);

    const event = new Event('input', { bubbles: true });
    hiddenAntDefaultSearchesRefs.current[searchPosition].dispatchEvent(event);
  };

  const handleSearchByClick = (value: string, position: 'left' | 'right') => {
    /**
     * Метод для поиска по нажатию кнопки
     */
    const searchPosition = position === 'left' ? 0 : 1;

    if (position === 'left') {
      setIsLeftSearch(!!value);
    } else {
      setIsRightSearch(!!value);
    }

    hiddenAntDefaultSearchesRefs.current[searchPosition].setAttribute('value', value);

    const event = new Event('input', { bubbles: true });
    hiddenAntDefaultSearchesRefs.current[searchPosition].dispatchEvent(event);
  };

  const renderSearch = (position: 'left' | 'right') => {
    const inputMaxWidth = theme.components?.Transfer?.inputMaxWidth;
    if (withSearchButton) {
      return (
        <InputSearch
          placeholder="Поиск"
          id={position}
          onSearch={value => {
            handleSearchByClick(value, position);
          }}
          style={{ maxWidth: inputMaxWidth }}
        />
      );
    }

    return <Input placeholder="Поиск" id={position} onChange={handleSearch} style={{ maxWidth: inputMaxWidth }} />;
  };

  const transferWrapperRef = useRef<ElementRef<'div'>>(null);
  useTablerIcons(transferWrapperRef);

  return (
    <div
      ref={transferWrapperRef}
      className={cn(styles.transferWrapper, { [styles.transferNoSelectionActions]: !withDefaultSelectionActions })}
    >
      <AntdTransfer<TCustomData>
        {...restProps}
        listStyle={{ maxHeight: theme.components?.Transfer?.maxHeight, ...restProps.listStyle }}
        disabled={isDisabled}
        oneWay={isOneWay}
        showSearch={isShowSearch}
        showSelectAll={isShowSelectAll}
        filterOption={isFilterOption}
        selectionsIcon={<IconChevronDown width={16} height={16} />}
        titles={[
          <div className={styles.titles} key="first-list">
            {isShowSearch && renderSearch('left')}
            {restProps.titles && restProps.titles[0]}
          </div>,
          <div className={styles.titles} key="second-list">
            {isShowSearch && renderSearch('right')}
            {restProps.titles && restProps.titles[1]}
          </div>,
        ]}
        locale={{
          ...locale,
          notFoundContent: [
            <Empty
              key={'left'}
              image={
                isLeftSearch
                  ? customSearchNotFoundImage || Empty.PRESENTED_IMAGE_SIMPLE
                  : customNotFoundImage || Empty.PRESENTED_IMAGE_DEFAULT
              }
              description={
                isLeftSearch ? customSearchNotFoundText || 'Записи не найдены' : customNotFoundText || 'Добавьте записи'
              }
            />,
            <Empty
              key={'right'}
              image={
                isRightSearch
                  ? customSearchNotFoundImage || Empty.PRESENTED_IMAGE_SIMPLE
                  : customNotFoundImage || Empty.PRESENTED_IMAGE_DEFAULT
              }
              description={
                isRightSearch
                  ? customSearchNotFoundText || 'Записи не найдены'
                  : customNotFoundText || 'Добавьте записи'
              }
            />,
          ],
        }}
      >
        {children}
      </AntdTransfer>
    </div>
  );
};
