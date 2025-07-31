import { NCommonAccordion } from '@/ui/accordions/_common';

import { CustomExpandIcon } from './CustomExpandIcon';

// NOTE: зачем он нужен
export const DefaultExpandIcon = ({ isActive }: NCommonAccordion.TPanelProps) => (
  <CustomExpandIcon isActive={isActive} />
);

export const DefaultTreeExpandIcon = ({ expanded }: { expanded?: boolean }) => <CustomExpandIcon isActive={expanded} />;
