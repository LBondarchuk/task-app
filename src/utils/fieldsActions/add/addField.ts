import { Field } from '../../types';

export function findItemByPath(tree: Field, path: string[]): Field | null {
  let currentNode = tree;

  for (const key of path) {
    if (currentNode.children && currentNode.children[key]) {
      currentNode = currentNode.children[key];
    } else {
      return null;
    }
  }

  return currentNode;
}

export function addNewItem(
  tree: Field,
  nodeId: string[],
  newField: string,
  category: string,
  setTree: (tree: Field) => void,
) {
  const parentPath = findItemByPath(tree, nodeId);

  if (parentPath) {
    const updatedTree = { ...tree };
    const parentNode = findItemByPath(updatedTree, nodeId);

    if (parentNode) {
      const newKey = Date.now().toString();
      parentNode.children[newKey] = {
        path: [...parentNode.path, newKey],
        content: newField,
        id: newKey,
        category: category,
        children: {},
      };

      setTree(updatedTree);
    } else {
      console.error('Perent node not found');
    }
  } else {
    console.error('Perent node not found');
  }
}
