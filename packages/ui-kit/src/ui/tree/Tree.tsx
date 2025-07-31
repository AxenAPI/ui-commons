import { FC, useMemo } from 'react';

import { Tree as AntdTree } from 'antd';

import { DefaultTreeExpandIcon } from '@/ui/accordions/_common';

import { recursiveWrap } from './helpers';
import { NTree } from './models';

export const Tree: FC<NTree.TProps> = ({
  isCheckable,
  isCheckStrictly,
  isDisabled,
  isDraggable,
  shouldAllowDrop,
  isAutoExpandedParent,
  isBlockNode,
  isDefaultExpandAll,
  isFilterTreeNode,
  isMultiple,
  isSelectable,
  isShowIcon,
  isShowLine,
  isVirtual,
  switcherIcon,
  treeData,
  ...rest
}) => {
  const applyIconWrapper = useMemo(() => treeData && treeData.map(recursiveWrap), [treeData]);

  return (
    <AntdTree
      checkable={isCheckable}
      checkStrictly={isCheckStrictly}
      disabled={isDisabled}
      draggable={isDraggable}
      allowDrop={shouldAllowDrop}
      autoExpandParent={isAutoExpandedParent}
      blockNode={isBlockNode}
      defaultExpandAll={isDefaultExpandAll}
      filterAntTreeNode={isFilterTreeNode}
      multiple={isMultiple}
      selectable={isSelectable}
      showIcon={isShowIcon}
      showLine={isShowLine}
      virtual={isVirtual}
      treeData={applyIconWrapper}
      {...rest}
      switcherIcon={switcherIcon || (props => <DefaultTreeExpandIcon expanded={props.expanded} />)}
    />
  );
};
