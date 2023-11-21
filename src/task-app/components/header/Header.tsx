import { TopActions } from '../top-actions/TopActions';

type Props = {
  setScale: (value: number) => void;
  scale: number;
  setMoveLeft: () => void;
  setMoveTop: () => void;
  setLastView: () => void;
  servises: number;
};
export const Header: React.FC<Props> = ({
  setScale,
  scale,
  setMoveTop,
  setMoveLeft,
  setLastView,
  servises,
}) => {
  return (
    <header className='header'>
      <div className='header__servises'></div>
      <TopActions
        setScale={setScale}
        scale={scale}
        setMoveTop={setMoveTop}
        setMoveLeft={setMoveLeft}
        setLastView={setLastView}
      />
    </header>
  );
};
