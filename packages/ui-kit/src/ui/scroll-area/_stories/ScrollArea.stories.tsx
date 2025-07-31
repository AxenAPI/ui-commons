import { ReactNode } from 'react';

import type { Meta } from '@storybook/react';

import { NScrollArea } from '../models';
import { ScrollArea } from '../ScrollArea';

import styles from './styles.module.css';

const meta: Meta<NScrollArea.TProps> = {
  title: 'Axenix UI/ScrollArea/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

export const DefaultScrollArea = (argTypes: NScrollArea.TProps): ReactNode => (
  <ScrollArea orientation="vertical" className={styles.verticalContainer} {...argTypes}>
    <ul>
      {Array.from({ length: 100 }, (_, i) => (
        <li key={i}>{`item ${i}`}</li>
      ))}
    </ul>
  </ScrollArea>
);

export const HorizontalScrollArea = (argTypes: NScrollArea.TProps): ReactNode => (
  <ScrollArea orientation="horizontal" className={styles.horizontalContainer} {...argTypes}>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque pariatur aut temporibus nisi debitis molestiae
    ab, quo ratione tempora expedita iste provident, magni delectus officiis commodi culpa architecto? Eveniet, odit?
  </ScrollArea>
);
