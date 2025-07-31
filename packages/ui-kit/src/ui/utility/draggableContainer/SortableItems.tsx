import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type TDraggableTabPaneProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
};
export const SortableItems: React.FC<TDraggableTabPaneProps> = ({ ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'grabbing',
    zIndex: isDragging ? 100 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} {...props}>
      {props.children}
    </div>
  );
};
