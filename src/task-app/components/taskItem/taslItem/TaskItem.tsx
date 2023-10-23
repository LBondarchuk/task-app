import { useEffect, useState } from 'react';
import { WhatCreate } from '../wthatCreate/WahatCreate';
import { addEmptyField, changeFieldValue, removeField } from '../../../../utils/fieldActions';
import { TaskItem } from '../../../../utils/types';

type Props = {
  onDoubleClick?: () => void;
  children: JSX.Element[];
  item: string;
  translate?: string;
  childrenLength: number;
  id: number;
  handleAdd?: (id: number) => void;
  items: TaskItem[];
  setItems: (item: TaskItem[]) => void;
  category: string;
  setPosition: () => void;
};

export const Field: React.FC<Props> = ({
  item,
  category,
  children,
  translate,
  id,
  items,
  setItems,
  setPosition,
}) => {
  const [value, setValue] = useState(item);
  const [showModal, setShowModal] = useState(false);
  const [whatToCreate, setWhatToCreate] = useState<null | 'category' | 'servise'>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (whatToCreate !== null) {
      setItems(addEmptyField(id, items, whatToCreate));
      setWhatToCreate(null);
    }
  }, [whatToCreate]);
  return (
    <div
      className='task-item'
      style={{
        transform: `translateX(${translate})`,
      }}
    >
      <div className='task-item__item' onDoubleClick={setPosition}>
        <div
          className='task-item__content'
          style={{
            backgroundColor: category === 'category' ? 'rgb(207, 134, 62)' : 'rgb(68, 159, 159)',
            padding: !item || isEditing ? 0 : 10,
          }}
        >
          {id !== 0 && (
            <div
              className='task-item__border'
              style={{
                height: 30,
                position: 'absolute',
                top: 0,
                left: '50%',
              }}
            ></div>
          )}
          {!item || isEditing ? (
            <input
              value={value}
              className='task-item__input'
              onChange={(e) => setValue(e.target.value)}
              placeholder='Add title'
            />
          ) : (
            value
          )}
        </div>
        <div className='task-item__actions'>
          <div className='task-item__actions--control'>
            {item && !isEditing && (
              <button
                className='task-item__button'
                onClick={() => setShowModal(!showModal)}
                style={{ opacity: 1 }}
              >
                {showModal && <WhatCreate response={setWhatToCreate} />}+
              </button>
            )}
            {id !== 0 && item && !isEditing && (
              <button className='task-item__button' onClick={() => setIsEditing(true)}>
                <img src='pen.png' alt='pen icon' width={15} />
              </button>
            )}
            {id !== 0 && (
              <button
                className='task-item__button task-item__button--remove'
                onClick={() => setItems(removeField(id, items))}
              >
                +
              </button>
            )}
            {(!item || isEditing) && id !== 0 && (
              <button
                className='task-item__button task-item__button--save'
                onClick={() => {
                  setIsEditing(true);
                  setItems(
                    isEditing
                      ? changeFieldValue(id, items, value)
                      : changeFieldValue(id, items, value),
                  );
                  setIsEditing(false);
                }}
              >
                <img src='save.svg' alt='save icon' width={15} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className='task-item__border'
        style={{
          height: children.length > 1 ? 30 : 0,
        }}
      ></div>
      {children.length > 0 && (
        <div
          className='task-item__children'
          style={{
            borderColor: children.length <= 1 ? 'transparent' : 'gray',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
