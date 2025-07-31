import { useEffect, useRef, useState } from 'react';

import { IconX } from '@tabler/icons-react';

import { Tag as AntdTag } from 'antd';

import { useTheme } from '@/providers';
import { Tooltip } from '@/ui/tooltip';
import { Text } from '@/ui/typography';

import { NFilter } from './models';

import styles from './styles.module.css';

export function Filter({ label, items, controlMaxWidth, closeIcon, ...props }: NFilter.TProps) {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const invisibleRef = useRef<HTMLDivElement>(null);

  const [remainingCount, setRemainingCount] = useState(0);
  const maxWidth = controlMaxWidth || (theme?.components?.Filter?.controlMaxWidth as number);

  useEffect(() => {
    const calculateVisibleItems = () => {
      const container = containerRef.current;
      const invisibleContainer = invisibleRef.current;
      if (!container) return;

      const children = Array.from(container.children);
      const invisibleChildren = invisibleContainer?.children ? Array.from(invisibleContainer.children) : [];
      const childrenItems = [...children, ...invisibleChildren];
      let accumulatedWidth = childrenItems[0]?.getBoundingClientRect()?.width || 0;

      let visibleItemsCount = 0;
      const totalCount = items.length;

      if (accumulatedWidth >= maxWidth) return setRemainingCount(totalCount);
      for (const [index, child] of childrenItems.entries()) {
        if (index === 0) continue;

        const childWidth = child?.getBoundingClientRect().width;

        if (accumulatedWidth + childWidth <= maxWidth || index === 1) {
          accumulatedWidth += childWidth;
          visibleItemsCount++;
        } else {
          break;
        }
      }
      setRemainingCount(totalCount - visibleItemsCount);
    };

    calculateVisibleItems();
  }, [items, maxWidth]);

  const style = {
    maxWidth: controlMaxWidth || theme?.components?.Filter?.controlMaxWidth,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const handleClick = (): void => props.onLabelClick?.(props.filterId);

  return (
    <Tooltip
      title={
        items.length > 0 && (
          <div className={styles.filterTooltip}>
            {items.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        )
      }
    >
      <AntdTag
        closeIcon={
          props.isClosable
            ? (closeIcon ?? (
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <IconX size={14} />
                </div>
              ))
            : null
        }
        {...props}
        closable={props.isClosable}
        bordered={props.isBordered}
        style={{ display: props.isClosable ? 'flex' : '', cursor: props.onLabelClick ? 'pointer' : '', ...props.style }}
        onClick={handleClick}
      >
        <div className={styles.filterContent}>
          <div style={style} ref={containerRef} className={styles.filters}>
            <Text isStrong>{label}: </Text>
            {items.length > 0 ? (
              <>
                {items.slice(0, items.length - remainingCount).map((item, index) => (
                  <Text key={item}>
                    {item}
                    {index === items.length - remainingCount - 1 ? '' : ', '}
                  </Text>
                ))}
              </>
            ) : (
              <Text>Значение</Text>
            )}
          </div>
          <div ref={invisibleRef} className={styles.invisibleItems}>
            {items.slice(items.length - remainingCount).map(item => (
              <span key={item} className={styles.invisibleItem}>
                {`, ${item}`}
              </span>
            ))}
          </div>
          {remainingCount > 0 && <div>+{remainingCount}</div>}
        </div>
      </AntdTag>
    </Tooltip>
  );
}
