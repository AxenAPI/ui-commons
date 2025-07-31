import { cloneElement, useEffect, useState } from 'react';

import { IconDots } from '@tabler/icons-react';

import cn from 'classnames';

import { TAnyObject } from '@/models';
import { Button } from '@/ui/buttons';
import { Dropdown } from '@/ui/dropdown';
import { NTable } from '@/ui/tables/models/model.ts';
import { Tooltip } from '@/ui/tooltip';

import styles from './styles.module.css';

type TRenderColumnRender<T extends TAnyObject> = {
  renderAction: NTable.TTableProps<T>['renderAction'];
  record: T;
};

export const RenderActionColumnRender = <T extends TAnyObject>({ renderAction, record }: TRenderColumnRender<T>) => {
  const [open, setOpen] = useState(false);
  const [activeButtons, setActiveButtons] = useState<Map<string, Set<string>>>(new Map());
  const actions = renderAction?.(record);

  useEffect(() => {
    if (!actions) return;

    for (const action of actions) {
      const actionActiveButtonsSet = activeButtons.get(record.key);

      // if isSelected is present in action-button config, and it value is false, it means item was removed from external state (deselected).
      // in that case we need to remove this active action button from active list.
      if (
        action.isSelected !== undefined &&
        !action.isSelected &&
        actionActiveButtonsSet &&
        actionActiveButtonsSet.size &&
        actionActiveButtonsSet.has(action.actionKey)
      ) {
        actionActiveButtonsSet.delete(action.actionKey);

        setActiveButtons(prev => {
          const newMap = new Map(prev);
          newMap.set(record.key, actionActiveButtonsSet);

          return newMap;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderAction]);

  if (!actions) return null;
  if (actions.length === 0) return null;

  const actionsIndex = actions.length <= 4 ? 4 : 3;

  const visibleActions = actions.slice(0, actionsIndex);

  const menuItems = actions.slice(actionsIndex).map(action => ({
    key: action.actionKey,
    label: action.description,
  }));

  return (
    <div className={styles.actionBtn}>
      {visibleActions.map(action => {
        const isActive = activeButtons.get(record.key)?.has(action.actionKey) || false;

        let element = action.render(isActive);

        if (action.description) {
          element = <Tooltip title={action.description}>{action.render(isActive)}</Tooltip>;
        }

        return cloneElement(element, {
          key: `${record.key}-${action.actionKey}`,
          className: cn(element.props.className, (isActive || open) && styles.active, styles.children),
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            element.props.onClick?.(event);

            if (action.activeAfterClick) {
              setActiveButtons(prev => {
                const newMap = new Map(prev);

                const activeSet = new Set(newMap.get(record.key) || []);

                if (activeSet.has(action.actionKey)) {
                  activeSet.delete(action.actionKey);
                } else {
                  activeSet.add(action.actionKey);
                }

                newMap.set(record.key, activeSet);

                return newMap;
              });
            }
          },
        });
      })}

      {menuItems.length > 0 && (
        <Dropdown
          onOpenChange={flag => {
            setOpen(flag);
          }}
          menu={{ items: menuItems }}
          trigger={['click']}
        >
          <Button className={cn(styles.children, open && styles.active)} icon={<IconDots />} />
        </Dropdown>
      )}
    </div>
  );
};
