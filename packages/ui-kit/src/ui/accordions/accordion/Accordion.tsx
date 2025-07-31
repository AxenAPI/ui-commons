import { FC } from 'react';

import { Collapse as AntdCollapse } from 'antd';

import { DefaultExpandIcon } from '@/ui/accordions/_common';

import { NAccordion } from './models';

export const Accordion: FC<NAccordion.TProps> = ({
  isBordered,
  isGhost,
  shouldDestroyInactivePanel,
  expandIcon,
  ...rest
}) => {
  return (
    <AntdCollapse
      {...rest}
      accordion={true}
      bordered={isBordered}
      destroyInactivePanel={shouldDestroyInactivePanel}
      ghost={isGhost}
      expandIcon={expandIcon ?? DefaultExpandIcon}
    />
  );
};
