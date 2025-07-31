import React, { useCallback, useEffect, useState } from 'react';

import { IconStar24 } from '@axenix/icons/src/icon/custom';

import clsx from 'clsx';

import { NRangStars } from './models';

import styles from './rang-stars.module.css';

export const RangStars: React.FC<NRangStars.TProps> = ({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  className,
  style,
  lockAfterSelect = false,
}) => {
  const [locked, setLocked] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const isReadOnly = readOnly || (lockAfterSelect && locked);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClick = useCallback(
    (idx: number) => {
      if (isReadOnly) return;

      const newValue = idx + 1 === localValue ? 0 : idx + 1;
      setLocalValue(newValue);

      if (onChange) {
        onChange(newValue);
      }

      if (lockAfterSelect && newValue > 0) {
        setLocked(true);
      }
    },
    [isReadOnly, onChange, lockAfterSelect, localValue]
  );

  return (
    <div className={clsx(styles.root, className)} style={style}>
      {Array.from({ length: max }).map((_, idx) => {
        const isActive = idx < localValue;
        return (
          <span
            key={idx}
            data-testid="star"
            className={clsx(styles.star, {
              [styles.active]: isActive,
              [styles.readOnly]: isReadOnly,
            })}
            {...(!isReadOnly && {
              onClick: () => handleClick(idx),
              onKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick(idx);
                }
              },
              role: 'button',
              tabIndex: 0,
            })}
          >
            <IconStar24 />
          </span>
        );
      })}
    </div>
  );
};
