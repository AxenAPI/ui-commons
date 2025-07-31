import React, { useEffect, useRef, useState } from 'react';

import { useTheme } from '@/providers';

import './styles.module.css';

export const CustomTreeTitle = ({
  showCustomTitle,
  titleHeight = 'standard',
  title,
  titleStyle,
  elementToDisplay,
}: {
  showCustomTitle: 'always' | 'onHover';
  titleHeight?: 'standard' | 'large';
  title: string;
  titleStyle?: React.CSSProperties;
  elementToDisplay?: React.ReactNode;
}) => {
  const { theme } = useTheme();
  const titleHeightValue = theme.components?.Tree?.[titleHeight === 'large' ? 'titleHeightLg' : 'titleHeight'];
  const [shouldRender, setShouldRender] = useState<boolean>(showCustomTitle === 'always');
  const uniqID = useRef<string>(
    `custom-title${showCustomTitle === 'onHover' ? '-hover' : ''}-${Math.floor(Math.random() * 900)}`
  );
  const [titleElement, setTitleElement] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(uniqID.current);
    setTitleElement(element);

    const handleMouseOver = () => showCustomTitle === 'onHover' && setShouldRender(true);
    const handleMouseLeave = () => showCustomTitle === 'onHover' && setShouldRender(false);

    titleElement?.addEventListener('mouseenter', handleMouseOver);
    titleElement?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      titleElement?.removeEventListener('mouseenter', handleMouseOver);
      titleElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [titleElement, showCustomTitle]);

  return (
    <div id={uniqID.current} style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
      <span style={{ ...titleStyle, lineHeight: `${titleHeightValue}px` }}>{title}</span>

      {shouldRender && (
        <span
          style={{
            position: showCustomTitle === 'onHover' ? 'absolute' : 'relative',
            right: showCustomTitle === 'onHover' ? 0 : 'unset',
          }}
        >
          {elementToDisplay}
        </span>
      )}
    </div>
  );
};
