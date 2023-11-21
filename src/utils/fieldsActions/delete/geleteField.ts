import { Field } from '../../types';

export const removeFieldByPath = (tree: Field, setTree: (tree: Field) => void, path: string[]) => {
  const updatedTree = { ...tree };
  let currentNode = updatedTree;
  let keyToDelete: string | undefined;

  for (let i = 0; i < path.length; i++) {
    const key = path[i];

    if (i === path.length - 1) {
      keyToDelete = key;
    } else if (currentNode.children && currentNode.children[key]) {
      currentNode = currentNode.children[key];
    }
  }

  if (keyToDelete !== undefined) {
    if (currentNode.children) {
      delete currentNode.children[keyToDelete];
    }

    setTree(updatedTree);
  } else {
    console.error('Node not found');
  }
};
