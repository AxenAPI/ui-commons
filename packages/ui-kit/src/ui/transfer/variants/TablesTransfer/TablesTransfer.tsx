import { useEffect, useState } from 'react';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { TAnyObject } from '@/models';

import { Button } from '../../../buttons';
import { Card, Flex } from '../../../utility';
import { CardTitle, TransferTable } from './components';
import { NTablesTransfer } from './models';
import { normalize } from './utils';

import styles from './styles.module.css';

type TBusyType = 'forward' | 'backward';

export const TablesTransfer = <T extends TAnyObject = TAnyObject>({
  className = '',
  customNotFoundImage,
  customNotFoundText,
  customSearchNotFoundImage,
  customSearchNotFoundText,
  extra = [null, null],
  isDisabled,
  isOneWay,
  leftCardClassNames,
  leftSelected,
  leftTableProps,
  leftTransfered,
  maxLengthSearch,
  onAddedSearch,
  onSelectLeft,
  onSelectRight,
  onTransfer,
  rightCardClassNames,
  rightSelected,
  rightTableProps,
  rightTransfered,
  rowKey = 'id',
  titles = [null, null],
  withSearchButton = false,
}: NTablesTransfer.TProps<T>) => {
  const [busyType, setBusyType] = useState<TBusyType | null>(null);

  const [leftTransferedCache, setLeftTransferedCache] = useState<Record<string, T>>({});
  const [rightTransferedCache, setRightTransferedCache] = useState<Record<string, T>>({});

  const [leftTransferedCacheSearch, setLeftTransferedCacheSearch] = useState<Record<string, T>>({});
  const [rightTransferedCacheSearch, setRightTransferedCacheSearch] = useState<Record<string, T>>({});

  const [leftSelectedCache, setLeftSelectedCache] = useState<Record<string, T>>({});
  const [rightSelectedCache, setRightSelectedCache] = useState<Record<string, T>>({});

  const [isLeftSearch, setIsLeftSearch] = useState(false);
  const [isRightSearch, setIsRightSearch] = useState(false);

  useEffect(() => {
    if (leftTransfered) {
      const transfered = normalize(leftTransfered, rowKey as string);
      setLeftTransferedCache(transfered);
      setLeftTransferedCacheSearch(transfered);
    }
  }, [leftTransfered, rowKey]);
  useEffect(() => {
    if (rightTransfered) {
      const transfered = normalize(rightTransfered, rowKey as string);
      setRightTransferedCache(transfered);
      setRightTransferedCacheSearch(transfered);
    }
  }, [rightTransfered, rowKey]);

  useEffect(() => {
    if (rightSelected) {
      const transfered = normalize(rightSelected, rowKey as string);
      setRightSelectedCache(transfered);
    }
  }, [rightSelected, rowKey]);

  useEffect(() => {
    if (leftSelected) {
      const transfered = normalize(leftSelected, rowKey as string);
      setLeftSelectedCache(transfered);
    }
  }, [leftSelected, rowKey]);

  const handleSelectLeft = (_: unknown, rows: any[]) => {
    setLeftSelectedCache(normalize(rows, rowKey as string));
    onSelectLeft?.(rows);
  };
  const handleSelectRight = (_: unknown, rows: any[]) => {
    setRightSelectedCache(normalize(rows, rowKey as string));
    onSelectRight?.(rows);
  };

  const handleForwardBtnClick = async () => {
    const left = (leftTransfered || []).filter(el => !leftSelectedCache[el[rowKey]]);
    const right = (rightTransfered || []).concat(
      Object.values(leftSelectedCache).filter(el => !leftTransferedCache[el[rowKey]])
    );

    setBusyType('forward');
    await onTransfer(left, right);
    setBusyType(null);
    setLeftSelectedCache({});
    onSelectLeft?.([]);
  };
  const handleBackBtnClick = async () => {
    const left = (leftTransfered || []).concat(
      Object.values(rightSelectedCache).filter(el => !rightTransferedCache[el[rowKey]])
    );
    const right = (rightTransfered || []).filter(el => !rightSelectedCache[el[rowKey]]);

    setBusyType('backward');
    await onTransfer(left, right);
    setBusyType(null);
    setRightSelectedCache({});
    onSelectRight?.([]);
  };

  const leftSelectedQuantity = Object.keys(leftSelectedCache).length;
  const rightSelectedQuantity = Object.keys(rightSelectedCache).length;

  const { onSearch: onSearchLeft, ...restLeftTableProps } = leftTableProps;
  const { onSearch: onSearchRight, ...restRightTableProps } = rightTableProps;

  const handleSearchLeft = onSearchLeft
    ? (search: string) => {
        onSearchLeft?.(search);
        setIsLeftSearch(!!search);
        onAddedSearch &&
          setLeftTransferedCacheSearch(
            Object.fromEntries(
              Object.entries(leftTransferedCache).filter(([_, value]) => onAddedSearch?.(value, search))
            )
          );
      }
    : undefined;

  const handleSearchRight = onSearchRight
    ? (search: string) => {
        onSearchRight?.(search);
        setIsRightSearch(!!search);
        onAddedSearch &&
          setRightTransferedCacheSearch(
            Object.fromEntries(
              Object.entries(rightTransferedCache).filter(([_, value]) => onAddedSearch?.(value, search))
            )
          );
      }
    : undefined;

  const [leftTitle, rightTitle] = titles;
  const [leftExtra, rightExtra] = extra;

  return (
    <Flex className={className} gap={8}>
      <Card
        className={styles.card}
        classNames={{
          ...leftCardClassNames,
          body: `${styles.cardBody} ${leftCardClassNames?.body || ''}`,
          header: `${styles.cardHead} ${leftCardClassNames?.header || ''}`,
        }}
        title={
          <CardTitle
            onSearch={handleSearchLeft}
            overallQuantity={
              (leftTableProps.data?.length || 0) + (leftTransfered?.length || 0) - (rightTransfered?.length || 0)
            }
            withSearchButton={withSearchButton}
            maxLengthSearch={maxLengthSearch}
            selectedQuantity={leftSelectedQuantity}
            title={leftTitle}
            extra={leftExtra}
          />
        }
      >
        <TransferTable
          {...restLeftTableProps}
          added={leftTransferedCacheSearch}
          onSelect={handleSelectLeft}
          removed={rightTransferedCache}
          rowKey={rowKey as string}
          selected={leftSelectedCache}
          customNotFoundImage={customNotFoundImage}
          customNotFoundText={customNotFoundText}
          isSearch={isLeftSearch}
          customSearchNotFoundText={customSearchNotFoundText}
          customSearchNotFoundImage={customSearchNotFoundImage}
        />
      </Card>

      <Flex justify="center" gap={4} vertical>
        <Button
          isDisabled={!leftSelectedQuantity || isDisabled}
          isLoading={busyType === 'forward'}
          onClick={handleForwardBtnClick}
          size="small"
          icon={<IconChevronRight />}
        />
        {!isOneWay && (
          <Button
            isDisabled={!rightSelectedQuantity || isDisabled}
            isLoading={busyType === 'backward'}
            onClick={handleBackBtnClick}
            size="small"
            icon={<IconChevronLeft />}
          />
        )}
      </Flex>

      <Card
        className={styles.card}
        classNames={{
          ...rightCardClassNames,
          body: `${styles.cardBody} ${rightCardClassNames?.body || ''}`,
          header: `${styles.cardHead} ${rightCardClassNames?.header || ''}`,
        }}
        title={
          <CardTitle
            onSearch={handleSearchRight}
            overallQuantity={
              (rightTableProps.data?.length || 0) + (rightTransfered?.length || 0) - (leftTransfered?.length || 0)
            }
            withSearchButton={withSearchButton}
            maxLengthSearch={maxLengthSearch}
            selectedQuantity={rightSelectedQuantity}
            title={rightTitle}
            extra={rightExtra}
          />
        }
      >
        <TransferTable
          {...restRightTableProps}
          added={rightTransferedCacheSearch}
          onSelect={handleSelectRight}
          removed={leftTransferedCache}
          rowKey={rowKey as string}
          selected={rightSelectedCache}
          customNotFoundImage={customNotFoundImage}
          customNotFoundText={customNotFoundText}
          customSearchNotFoundText={customSearchNotFoundText}
          customSearchNotFoundImage={customSearchNotFoundImage}
          isSearch={isRightSearch}
        />
      </Card>
    </Flex>
  );
};
