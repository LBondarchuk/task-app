import { useEffect, useState } from 'react';
import { Field } from '../taskItem/taslItem/TaskItem';
import { TaskItem } from '../../../utils/types';
import { getTotalServises } from '../../../utils/fieldActions';
type Props = {
  scale: number;
  moveLeft: number;
  moveTop: number;
  setMoveLeft: (value: number) => void;
  setMoveTop: (value: number) => void;
  getServisesLeft: (value: number) => void;
};
export const TaskList: React.FC<Props> = ({
  scale,
  moveLeft,
  moveTop,
  setMoveLeft,
  setMoveTop,
  getServisesLeft,
}) => {
  const [position, setPosition] = useState(false);
  const [items, setItems] = useState<TaskItem[]>([
    {
      content: 'Categories',
      id: 0,
      children: [],
      category: 'category',
    },
  ]);

  const handleMoseMove = (e: MouseEvent) => {
    if (position) {
      setMoveLeft(e.clientX);
      setMoveTop(e.clientY);
    }
  };
  useEffect(() => {
    if (position) {
      document.addEventListener('mousemove', handleMoseMove);
    }
    return () => document.removeEventListener('mousemove', handleMoseMove);
  }, [position]);

  useEffect(() => {
    getServisesLeft(getTotalServises(items));
  }, [items]);

  const createList = (list: TaskItem[]) => {
    return list.map((item, i) => {
      if (i === 0) {
        return (
          <Field
            item={item.content}
            translate={list.length !== 1 ? '-50%' : '0'}
            childrenLength={list.length}
            id={item.id}
            items={items}
            setItems={(newItems) => setItems(newItems)}
            category={item.category}
            setPosition={() => setPosition(!position)}
          >
            {createList(item.children)}
          </Field>
        );
      }

      if (i === list.length - 1) {
        return (
          <Field
            item={item.content}
            translate={list.length !== 1 ? '50%' : '0'}
            childrenLength={list.length}
            id={item.id}
            items={items}
            setItems={(newItems) => setItems(newItems)}
            category={item.category}
            setPosition={() => setPosition(!position)}
          >
            {createList(item.children)}
          </Field>
        );
      }

      return (
        <Field
          item={item.content}
          childrenLength={list.length}
          id={item.id}
          items={items}
          setItems={(newItems) => setItems(newItems)}
          category={item.category}
          setPosition={() => setPosition(!position)}
        >
          {createList(item.children)}
        </Field>
      );
    });
  };

  return (
    <div
      className='tasl-list'
      onDoubleClick={() => {
        if (position) {
          setPosition(false);
        }
      }}
      style={{
        left: !position && moveLeft === 50 ? moveLeft + '%' : moveLeft,
        top: !position && moveTop === 35 ? moveTop + '%' : moveTop,
        transform: `translateX(-50%) scale(${scale + '%'})`,
      }}
    >
      {createList(items)}
    </div>
  );
};
