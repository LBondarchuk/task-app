import React, { useEffect, useState } from 'react';

import './App.scss';
import { Header } from './task-app/components/header/Header';
import { Main } from './task-app/components/main/Main';

function App() {
  const [scale, setScale] = useState<number>(100);
  const [moveLeft, setMoveLeft] = useState<number>(720);
  const [moveTop, setMoveTop] = useState<number>(268);
  const [lastView, setLastViewW] = useState({
    x: 0,
    y: 0,
  });
  const [servises, setServises] = useState(0);
  useEffect(() => {
    if (moveLeft === 720 && moveTop === 268) return;
    setLastViewW({ y: moveTop, x: moveLeft });
  }, [moveLeft, moveTop]);

  const handleWheel = (e: { ctrlKey: any; preventDefault: () => void; deltaY: number }) => {
    if (e.ctrlKey) {
      e.preventDefault();

      if (e.deltaY > 0) {
        setScale((prevScale) => (prevScale > 50 ? prevScale - 10 : prevScale));
      } else if (e.deltaY < 0) {
        setScale((prevScale) => (prevScale < 200 ? prevScale + 10 : prevScale));
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='App' onWheel={handleWheel}>
      <Header
        setScale={setScale}
        scale={scale}
        setMoveLeft={() => setMoveLeft(720)}
        setMoveTop={() => setMoveTop(268)}
        setLastView={() => {
          setMoveLeft(lastView.x);
          setMoveTop(lastView.y);
        }}
        servises={servises}
      />
      <Main
        scale={scale}
        moveLeft={moveLeft}
        setMoveTop={setMoveTop}
        moveTop={moveTop}
        setMoveLeft={setMoveLeft}
        getServisesLeft={(value: number) => setServises(value)}
      />
    </div>
  );
}

export default App;
