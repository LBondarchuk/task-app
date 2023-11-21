import { TaskList } from '../taskList/TaskList';
import { Arrow } from '../arrow/Arrow';
import { useState } from 'react';

type Props = {
  scale: number;
  moveLeft: number;
  moveTop: number;
  setMoveLeft: (value: number) => void;
  setMoveTop: (value: number) => void;
  getServisesLeft: (value: number) => void;
};

export const Main: React.FC<Props> = ({
  scale,
  moveLeft,
  moveTop,
  setMoveLeft,
  setMoveTop,
  getServisesLeft,
}) => {
  const [position, setPosition] = useState(false);
  return (
    <main className='main'>
      <TaskList
        scale={scale}
        moveLeft={moveLeft}
        setMoveTop={setMoveTop}
        moveTop={moveTop}
        setMoveLeft={setMoveLeft}
        position={position}
        setPosition={setPosition}
      />
      <Arrow position='up' handleChange={() => setMoveTop(moveTop - 100)} />
      <Arrow position='down' handleChange={() => setMoveTop(moveTop + 100)} />
      <Arrow position='left' handleChange={() => setMoveLeft(moveLeft + 100)} />
      <Arrow position='right' handleChange={() => setMoveLeft(moveLeft - 100)} />
    </main>
  );
};
