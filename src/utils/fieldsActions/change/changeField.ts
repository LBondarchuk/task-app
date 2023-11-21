import { Field } from '../../types';

export const changeFieldValue = (
  tree: Field,
  setTree: (tree: Field) => void,
  path: string[],
  content: string,
) => {
  const updateTree = (node: Field, currentDepth: number): Field => {
    if (currentDepth === path.length) {
      return { ...node, content };
    }

    const key = path[currentDepth];
    if (node.children && node.children[key]) {
      return {
        ...node,
        children: {
          ...node.children,
          [key]: updateTree(node.children[key], currentDepth + 1),
        },
      };
    }

    return node;
  };

  const updatedTree = updateTree(tree, 0);
  setTree(updatedTree);
};
