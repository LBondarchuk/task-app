type Props = {
  setScale: (value: number) => void;
  scale: number;
  setMoveLeft: () => void;
  setMoveTop: () => void;
  setLastView: () => void;
};

export const TopActions: React.FC<Props> = ({
  setScale,
  scale,
  setMoveLeft,
  setMoveTop,
  setLastView,
}) => {
  return (
    <div className='top-actions'>
      <button className='top-actions__last-view' onClick={setLastView}>
        Last View
      </button>
      <button
        onClick={() => {
          setMoveTop();
          setMoveLeft();
        }}
      >
        <img src='navigation.png' alt='arrow' width={20} />
      </button>
      <div className='top-actions__change-size'>
        <button
          className='top-actions__change-size--minus'
          disabled={!scale}
          onClick={() => setScale(scale - 10)}
        >
          -
        </button>
        <button className='top-actions__change-size--size' style={{ pointerEvents: 'none' }}>
          {scale}%
        </button>
        <button className='top-actions__change-size--pluse' onClick={() => setScale(scale + 10)}>
          +
        </button>
      </div>
    </div>
  );
};
