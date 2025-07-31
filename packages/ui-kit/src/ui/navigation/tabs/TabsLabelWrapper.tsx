import { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import { Badge } from '@/ui';

import { NTab } from './models.ts';

const TabsLabelWrapper = ({
  label,
  hasBadge,
  badgeCount,
  badgeUsedType,
  extraNode,
  isActiveTab,
}: NTab.TTabsLabelWrapper) => {
  const { element, onHover = false } = extraNode || {};

  const [shouldRender, setShouldRender] = useState<boolean>(Boolean(element) && !onHover);
  const uniqID = useRef<string>(`extra-node-container${onHover ? '-hover' : ''}-${nanoid(3)}`);

  const [labelWrapper, setLabelWrapper] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(uniqID.current);
    setLabelWrapper(element);

    const handleMouseOver = () => onHover && setShouldRender(true);
    const handleMouseLeave = () => onHover && setShouldRender(false);

    labelWrapper?.addEventListener('mouseover', handleMouseOver);
    labelWrapper?.addEventListener('mouseout', handleMouseLeave);

    return () => {
      labelWrapper?.removeEventListener('mouseover', handleMouseOver);
      labelWrapper?.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [labelWrapper, onHover]);

  return (
    <div
      id={uniqID.current}
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        fontWeight: isActiveTab ? '600' : 'initial',
      }}
    >
      {label}
      {hasBadge && <Badge count={badgeCount} style={{ marginLeft: '8px' }} type={badgeUsedType} />}
      {shouldRender && (
        <span
          style={{
            paddingLeft: '8px',
            position: onHover ? 'absolute' : 'relative',
            right: onHover ? 0 : 'unset',
          }}
        >
          {element}
        </span>
      )}
    </div>
  );
};

export default TabsLabelWrapper;
