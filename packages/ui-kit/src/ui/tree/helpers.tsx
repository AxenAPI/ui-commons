import { TreeNodeProps } from 'antd';
import { DataNode } from 'antd/es/tree';

export const recursiveWrap = (node: DataNode | undefined): any => {
  if (!node) return;

  const updatedNode = {
    ...node,
    icon:
      typeof node.icon === 'function' ? (
        (props: TreeNodeProps) =>
          node.icon && <span role="img">{(node.icon as (props: TreeNodeProps) => React.ReactNode)(props)}</span>
      ) : (
        <span role="img">{node.icon}</span>
      ),
  };

  if (node.children) {
    updatedNode.children = node.children.map(child => recursiveWrap(child));
  }

  return updatedNode;
};
