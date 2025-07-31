import React from 'react';

import { useComponentTokens, useTheme } from '@/providers';

import { NTimeline } from './models';

import styles from './styles.module.css';

type TTimelineTokens = Partial<Record<string, string | number>>;

type TGlobalToken = Record<string, any>;

/**
 * SVG-иконка для head (dot) Timeline
 */
const TimelineHeadIcon: React.FC<{ color?: string; dotBg?: string; colorPrimary?: string }> = ({
  color,
  dotBg,
  colorPrimary,
}) => (
  <svg
    data-testid="timeline-dot"
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <circle cx="5" cy="5" r="4" fill={dotBg} stroke={color || colorPrimary} strokeWidth="2" />
  </svg>
);

/**
 * Унифицированный рендер head (dot или иконка)
 */
function renderHead(
  dot: React.ReactNode,
  color: string | undefined,
  dotBg: string | undefined,
  colorPrimary: string | undefined
) {
  return dot ? (
    <span className={styles.customHead}>{dot}</span>
  ) : (
    <span className={styles.headBase}>
      <TimelineHeadIcon color={color} dotBg={dotBg} colorPrimary={colorPrimary} />
    </span>
  );
}

const TimelineTail: React.FC = () => <div className={styles.tailBase} />;

const TimelineLabel: React.FC<{ label?: React.ReactNode; className?: string }> = ({ label, className }) => (
  <div className={className}>{label}</div>
);

/**
 * Элемент вертикального Timeline
 */
const TimelineItem: React.FC<{
  item: NTimeline.TItem;
  position: 'left' | 'right';
  mode: 'left' | 'alternate' | 'right';
  tokens: any;
  globalToken: any;
}> = ({ item, position, mode, tokens, globalToken }) => {
  // Классы для label/content в зависимости от режима и позиции
  const labelClass =
    mode === 'alternate'
      ? `${styles.label} ${position === 'left' ? styles.labelAlternateLeft : styles.labelAlternateRight}`
      : styles.label;
  const contentClass =
    mode === 'alternate'
      ? `${position === 'left' ? styles.contentAlternateLeft : styles.contentAlternateRight} ${styles.contentBase}`
      : styles.contentBase;
  const itemClass = mode === 'alternate' ? styles.itemAlternate : styles.item;

  // Элементы для head/tail, label, content
  const headTail = (
    <div className={styles.headTailContainer} key="headTail">
      <TimelineTail />
      {renderHead(item.dot, item.color, tokens.dotBg as string, globalToken.colorPrimary)}
    </div>
  );
  const label = <TimelineLabel label={item.label} className={labelClass} key="label" />;
  const content = (
    <div className={contentClass} key="content">
      {item.children}
    </div>
  );

  // Определяем порядок элементов
  let elements: React.ReactNode[] = [];

  if (mode === 'alternate') {
    elements = position === 'left' ? [label, headTail, content] : [content, headTail, label];
  } else if (position === 'right') {
    elements = [content, headTail];
  } else {
    // left (default)
    elements = [headTail, content];
  }

  return (
    <div className={itemClass} data-position={position} data-mode={mode} data-testid="timeline-item">
      {elements.filter(Boolean)}
    </div>
  );
};

TimelineItem.displayName = 'TimelineItem';

/**
 * Элемент горизонтального Timeline
 */
const TimelineItemHorizontal: React.FC<{
  item: NTimeline.TItem & { contentPosition?: 'top' | 'bottom' };
  tokens: TTimelineTokens;
  globalToken: TGlobalToken;
}> = ({ item, tokens, globalToken }) => {
  // contentPosition: 'top' | 'bottom' (по умолчанию 'bottom')
  const contentPosition = item.contentPosition === 'top' ? 'top' : 'bottom';
  return (
    <div className={styles.itemHorizontal} data-mode="horizontal" data-testid="timeline-item">
      {contentPosition === 'top' && <div className={styles.contentHorizontal}>{item.children}</div>}
      <div className={styles.horizontalLineWrap}>
        <span className={styles.headHorizontal}>
          {renderHead(item.dot, item.color, tokens.dotBg as string, globalToken.colorPrimary)}
        </span>
        <span className={styles.tailHorizontal} />
      </div>
      {contentPosition === 'bottom' && <div className={styles.contentHorizontal}>{item.children}</div>}
    </div>
  );
};
TimelineItemHorizontal.displayName = 'TimelineItemHorizontal';

/**
 * Определяет позицию head/контента для элемента
 */
function getPosition(idx: number, item: NTimeline.TItem, mode: 'left' | 'alternate' | 'right'): 'left' | 'right' {
  if (item.position) return item.position;
  if (mode === 'alternate') {
    return idx % 2 === 0 ? 'left' : 'right';
  }
  if (mode === 'right') return 'right';
  return 'left';
}

/**
 * Timeline — компонент для отображения последовательности событий
 * @param items - массив элементов
 * @param mode - режим отображения (left, alternate, right, horizontal)
 */
export const Timeline: React.FC<NTimeline.TProps> = ({ items, mode = 'left' }) => {
  const { theme } = useTheme();
  const tokens = useComponentTokens('Timeline') as TTimelineTokens;
  const globalToken = theme?.token ?? {};

  const cssVars = {
    ...(globalToken.margin && { '--Timeline-margin': globalToken.margin }),
    ...(globalToken.fontFamily && { '--Timeline-fontFamily': globalToken.fontFamily }),
    ...(globalToken.fontSize && { '--Timeline-fontSize': `${globalToken.fontSize}px` }),
    ...(globalToken.colorText && { '--Timeline-colorText': globalToken.colorText }),
    ...(globalToken.colorPrimary && { '--Timeline-colorPrimary': globalToken.colorPrimary }),
    '--Font-weight-normal': tokens.fontWeightNormal,
    '--Timeline-dotBg': tokens.dotBg,
    '--Timeline-tailColor': tokens.tailColor,
    '--Timeline-tailWidth': tokens.lineWidth ? `${tokens.lineWidth}px` : undefined,
    '--Timeline-labelColor': globalToken.colorText,
  };

  if (mode === 'horizontal') {
    return (
      <div className={styles.timelineHorizontal} style={cssVars as React.CSSProperties}>
        {items.map((item, idx) => (
          <TimelineItemHorizontal
            key={idx}
            item={item as NTimeline.TItem & { contentPosition?: 'top' | 'bottom' }}
            tokens={tokens}
            globalToken={globalToken}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.timeline} style={cssVars as React.CSSProperties}>
      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          item={item}
          position={getPosition(idx, item, mode)}
          mode={mode}
          tokens={tokens}
          globalToken={globalToken}
        />
      ))}
    </div>
  );
};
Timeline.displayName = 'Timeline';

export default Timeline;
