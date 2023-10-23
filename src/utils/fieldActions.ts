import { TaskItem } from './types';

export const addEmptyField = (
  id: number,
  items: TaskItem[],
  category: string,
  value: string = '',
): TaskItem[] => {
  return items.map((item) =>
    item.id === id
      ? {
          ...item,
          children: [
            ...item.children,
            {
              id: Date.now(),
              content: value,
              children: [],
              category: category,
            },
          ],
        }
      : { ...item, children: addEmptyField(id, item.children, category, value) },
  );
};

export const changeFieldValue = (id: number, items: TaskItem[], value: string): TaskItem[] => {
  return items.map((item) =>
    item.id === id
      ? {
          ...item,
          content: value,
        }
      : { ...item, children: changeFieldValue(id, item.children, value) },
  );
};
export const removeField = (id: number, items: TaskItem[]): TaskItem[] => {
  const result = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i].id !== id) {
      result.push({ ...items[i], children: removeField(id, items[i].children) });
    }
  }
  return result;
};
export const getTotalServises = (items: TaskItem[]): number => {
  let result = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].category === 'servise') {
      result++;
    }
    result += getTotalServises(items[i].children);
  }
  return result;
};
