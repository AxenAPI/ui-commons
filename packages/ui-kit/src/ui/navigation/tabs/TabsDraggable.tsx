import React, { memo, useState } from 'react';

import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { SENSOR_DISTANCE } from '@/ui/navigation/tabs/consts.ts';

import { DraggableTabNode } from './DraggableTabNode';
import { NTab } from './models';
import { Tabs } from './Tabs';

const TabsDraggable = (props: NTab.TProps) => {
  const [draggableItems, setDraggableItems] = useState(props.items || []);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: SENSOR_DISTANCE } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDraggableItems(prev => {
        const activeIndex = prev.findIndex(i => i.key === active.id);
        const overIndex = prev.findIndex(i => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Tabs
      {...props}
      items={draggableItems}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={draggableItems.map(i => i.key)} strategy={horizontalListSortingStrategy}>
            {typeof tabBarProps === 'object' && (
              <DefaultTabBar {...tabBarProps}>
                {(node: React.ReactElement<NTab.TDraggableTabPaneProps>) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            )}
          </SortableContext>
        </DndContext>
      )}
    />
  );
};

export default memo(TabsDraggable);
