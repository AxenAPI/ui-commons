import { useState } from 'react';

import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';

import { Pagination as AntdPagination } from 'antd';

import { useTheme } from '@/providers';

import { Select } from '../form';
import { Col, Row } from '../utility';
import { NPagination } from './model';
import { getPaginationSizeOptions } from './pagination-constants';

import styles from './style.module.css';

export function Pagination(props: NPagination.TProps) {
  const {
    current,
    defaultPageSize = 10,
    isDisabled,
    isPageSizeChanger,
    isSimple,
    onChange,
    pageSizeOptions,
    shouldShowSizeChanger,
    itemRender,
    total,
    pageSize,
    className,
    style,
  } = props;

  const [pageSizeValue, setPageSizeValue] = useState<number>(defaultPageSize);

  const { theme } = useTheme();
  const iconSize = theme?.components?.Pagination?.fontSizeSM;
  const numberOfEntriesPerPage = 'Записей на странице';

  const customItem: NPagination.TCustomItem<NPagination.TRenderer> = {
    page: null,
    prev: <IconChevronLeft width={iconSize} height={iconSize} color={isDisabled || current === 1 ? 'gray' : 'black'} />,
    next: (
      <IconChevronRight
        width={iconSize}
        height={iconSize}
        color={isDisabled || current === Math.ceil(Number(total) / Number(pageSize || 10)) ? 'gray' : 'black'}
      />
    ),
    'jump-prev': <IconChevronsLeft width={iconSize} height={iconSize} />,
    'jump-next': <IconChevronsRight width={iconSize} height={iconSize} />,
  };

  const customItemRenderer: NPagination.TProps['itemRender'] = (_, type, element) => {
    return customItem[type] || element;
  };

  const handleSelect = (sizeValue: number) => {
    setPageSizeValue(sizeValue);
    if (onChange && current && total) {
      /**Высчитываем номер страницы, на которую перейдем при измнении pageSize */
      if (current > 1) {
        const pageNumber = Math.ceil(total / sizeValue);
        onChange(current > pageNumber ? pageNumber : current, sizeValue);
      } else {
        onChange(current, sizeValue);
      }
    }
  };

  return (
    <div className={`${styles.pagination} ${className}`} style={style}>
      <Row justify="space-between" align="middle">
        <Col>
          <AntdPagination
            {...props}
            disabled={isDisabled}
            simple={isSimple}
            showSizeChanger={isPageSizeChanger ? false : shouldShowSizeChanger}
            itemRender={itemRender ?? customItemRenderer}
          />
        </Col>
        {isPageSizeChanger && (
          <Col>
            <span style={{ margin: '0 8px' }}>{numberOfEntriesPerPage}</span>
            <Select
              defaultValue={defaultPageSize}
              isFullContent={false}
              value={pageSize || pageSizeValue}
              options={getPaginationSizeOptions(pageSizeOptions)}
              onSelect={handleSelect}
            />
          </Col>
        )}
      </Row>
    </div>
  );
}
