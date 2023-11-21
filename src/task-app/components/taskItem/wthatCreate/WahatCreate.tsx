import { Close } from '../../close/Close';
import styles from './what-create.module.scss';

type Props = {
  response: (value: 'category' | 'service' | null) => void;
  onHide: () => void;
  show: boolean;
};

export const WhatCreate: React.FC<Props> = ({ response, onHide, show }) => {
  return (
    <div className={`${styles.modalContainer} ${show ? styles.show : ''}`}>
      <div className={`${styles.modalContent} ${show ? styles.show : ''}`}>
        <div className={styles.whatCreate}>
          <Close onClick={onHide} />
          <div className={styles.title}>What do you want to create</div>
          <div className={styles.actions}>
            <button onClick={() => response('category')} className={styles.category}>
              Category
            </button>
            <button onClick={() => response('service')} className={styles.service}>
              Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
