import React, { useState } from 'react';

import { closestCenter, DndContext, DragEndEvent, Modifier, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Flex } from '@/ui/utility/flex/Flex';

import { SENSOR_DISTANCE } from './consts';
import { TDraggableContainerItem, TDraggableContainerProps } from './models';
import { SortableItems } from './SortableItems';

const DraggableContainer: React.FC<TDraggableContainerProps> = ({
  items = [],
  onDragEndIndices,
  strategy = verticalListSortingStrategy,
  gap,
  vertical,
  justify,
  align,
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
  ...rest
}) => {
  const [draggableItems, setDraggableItems] = useState<TDraggableContainerItem[]>(items);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: SENSOR_DISTANCE } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDraggableItems(prev => {
        const activeIndex = prev.findIndex(i => i.id === active.id);
        const overIndex = prev.findIndex(i => i.id === over?.id);
        if (onDragEndIndices) {
          onDragEndIndices(activeIndex, overIndex);
        }
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const flexProps = {
    gap,
    vertical,
    justify,
    align,
  };

  const modifiers = [restrictToVerticalAxis, restrictToHorizontalAxis].filter(Boolean) as Modifier[];

  return (
    <Flex data-testid="draggable-flex-container" {...flexProps} {...rest}>
      <DndContext
        sensors={[sensor]}
        onDragEnd={onDragEnd}
        collisionDetection={closestCenter}
        modifiers={[...modifiers]}
      >
        <SortableContext items={draggableItems.map(item => item.id)} strategy={strategy}>
          {draggableItems.map(item => (
            <SortableItems key={item.id} id={item.id}>
              {item.children}
            </SortableItems>
          ))}
        </SortableContext>
      </DndContext>
    </Flex>
  );
};

export default DraggableContainer;
