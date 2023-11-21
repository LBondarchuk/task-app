import React, { useState, useEffect } from 'react';
import { Field } from '../../../utils/types';
import { FIELD } from '../taskItem/taslItem/TaskItem';

type Props = {
  scale: number;
  moveLeft: number;
  moveTop: number;
  setMoveLeft: (value: number) => void;
  setMoveTop: (value: number) => void;
  position: boolean;
  setPosition: (value: boolean) => void;
};

export const TaskList: React.FC<Props> = ({
  scale,
  moveLeft,
  moveTop,
  setMoveLeft,
  setMoveTop,
}) => {
  const initialTreeState: Field = {
    path: [],
    children: {
      '0': {
        path: ['0'],
        content: 'Categories',
        id: '0',
        category: 'category',
        children: {},
      },
    },
  };

  const [tree, setTree] = useState<Field>(initialTreeState);
  const [isDragging, setIsDragging] = useState(false);

  const createList = (list: Field) => {
    return Object.keys(list.children).map((key, i) => {
      const field = list.children[key];
      const isFirstChild = i === 0;
      const isLastChild = i === Object.keys(list.children).length - 1;

      return (
        <FIELD
          key={field.id}
          field={field}
          translate={
            isFirstChild && Object.keys(list.children).length > 1
              ? '-50%'
              : isLastChild && Object.keys(list.children).length > 1
              ? '50%'
              : '0'
          }
          tree={tree}
          setTree={setTree}
        >
          {createList(field)}
        </FIELD>
      );
    });
  };

  useEffect(() => {
    const storedTree = localStorage.getItem('taskTree');
    if (storedTree) {
      setTree(JSON.parse(storedTree));
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const offsetX = e.clientX - moveLeft;
    const offsetY = e.clientY - moveTop;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(e: MouseEvent) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      setMoveLeft(newX);
      setMoveTop(newY);
    }

    function handleMouseUp() {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div
      className='tasl-list'
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        left: moveLeft + 'px',
        top: moveTop + 'px',
        transform: `scale(${scale}%) translateX(-50%)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsDragging(false)}
    >
      {createList(tree)}
    </div>
  );
};
