import { FC, ReactNode } from 'react';

import { Input, InputSearch, NInput } from '../../../../form/inputs';
import { Flex } from '../../../../utility';
import styles from '../styles.module.css';

type TProps = {
  onSearch: ((search: string) => Promise<void> | void) | undefined;
  overallQuantity: number;
  selectedQuantity: number;
  title: ((selectedQuantity: number, overallQuantity: number) => ReactNode) | null;
  extra: ((selectedQuantity: number, overallQuantity: number) => ReactNode) | null;
  withSearchButton: boolean;
  maxLengthSearch?: number;
};

export const CardTitle: FC<TProps> = ({
  extra,
  onSearch,
  overallQuantity,
  selectedQuantity,
  title,
  withSearchButton,
  maxLengthSearch,
}) => {
  const handleSearch: NInput.TProps['onChange'] = e => {
    onSearch?.(e.target.value);
  };

  return (
    <Flex align="center" className={styles.searchWrapper} justify="space-between">
      {title ? title(selectedQuantity, overallQuantity) : `${selectedQuantity}/${overallQuantity}`}
      {onSearch &&
        (withSearchButton ? (
          <InputSearch maxLength={maxLengthSearch} className={styles.search} onSearch={onSearch} placeholder="Поиск" />
        ) : (
          <Input maxLength={maxLengthSearch} className={styles.search} onChange={handleSearch} placeholder="Поиск" />
        ))}
      {extra && extra(selectedQuantity, overallQuantity)}
    </Flex>
  );
};
