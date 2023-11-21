import { Field } from '../types';

export const forEachField = (field: Field, callback: (field: Field) => void) => {
  callback(field);
  for (const key in field.children) {
    forEachField(field.children[key], callback);
  }
};
