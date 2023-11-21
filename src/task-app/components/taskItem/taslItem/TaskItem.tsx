import { useEffect, useState } from 'react';
import { WhatCreate } from '../wthatCreate/WahatCreate';
import { forEachField } from '../../../../utils/fieldsActions/fieldActions';
import { Field } from '../../../../utils/types';
import { addNewItem } from '../../../../utils/fieldsActions/add/addField';
import { changeFieldValue } from '../../../../utils/fieldsActions/change/changeField';
import { removeFieldByPath } from '../../../../utils/fieldsActions/delete/geleteField';

type Props = {
  children: JSX.Element[];
  field: Field;
  translate?: string;
  handleAdd?: (id: number) => void;
  tree: Field;
  setTree: (field: Field) => void;
};

export const FIELD: React.FC<Props> = ({ field, children, translate, tree, setTree }) => {
  const [value, setValue] = useState(field.content);
  const [showModal, setShowModal] = useState(false);
  const [whatToCreate, setWhatToCreate] = useState<'category' | 'service' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasEmpty, setHesEmpty] = useState(false);

  useEffect(() => {
    if (whatToCreate !== null) {
      addNewItem(tree, field.path, '', whatToCreate, setTree);
      setWhatToCreate(null);
    }
  }, [whatToCreate]);
  const isFieldEmpty = (field: Field) => {
    setHesEmpty(field.content === '');
  };

  useEffect(() => forEachField(tree, isFieldEmpty), [tree]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      changeFieldValue(tree, setTree, field.path, value);
      setIsEditing(false);
    }
  };

  return (
    <div
      className='task-field'
      style={{
        transform: `translateX(${translate})`,
      }}
    >
      <div className='task-item__item'>
        <div
          className='task-item__content'
          style={{
            backgroundColor:
              field.category === 'category' ? 'rgb(207, 134, 62)' : 'rgb(68, 159, 159)',
            padding: !field.content || isEditing ? 0 : 10,
          }}
        >
          {field.id !== '0' && (
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
          {!field.content || isEditing ? (
            <input
              value={value}
              className='task-item__input'
              onChange={(e) => setValue(e.target.value)}
              placeholder='Add title'
              onKeyDown={handleKeyDown}
            />
          ) : (
            value
          )}
        </div>
        <div className='task-item__actions'>
          <div className='task-item__actions--control'>
            {field && !isEditing && field.content && (
              <button
                className='task-item__button'
                disabled={hasEmpty}
                onClick={() => setShowModal(!showModal)}
                style={{ opacity: 1 }}
              >
                <WhatCreate
                  show={showModal}
                  response={setWhatToCreate}
                  onHide={() => setShowModal(false)}
                />
                +
              </button>
            )}
            {field.id !== '0' && field.content && !isEditing && (
              <button className='task-item__button' onClick={() => setIsEditing(true)}>
                <img src='pen.png' alt='pen icon' width={15} />
              </button>
            )}
            {field.id !== '0' && (
              <button
                className='task-item__button task-item__button--remove'
                onClick={() => removeFieldByPath(tree, setTree, field.path)}
              >
                +
              </button>
            )}
            {field.id !== '0' && (!field.content || isEditing) && (
              <button
                className='task-item__button task-item__button--save'
                onClick={() => {
                  changeFieldValue(tree, setTree, field.path, value);
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
