import { FC } from 'react';

import { CommonSelect } from './CommonSelect';
import { NSelect } from './models';

/**
 * Компонент селекта.
 * */
export const Select: FC<NSelect.TProps> = ({ children, ...restProps }) => (
  <CommonSelect {...restProps}>{children}</CommonSelect>
);
