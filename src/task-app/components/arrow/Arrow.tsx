type Props = {
  position: string;
  handleChange: () => void;
};

export const Arrow: React.FC<Props> = ({ position, handleChange }) => {
  return (
    <button className={'arrow arrow__' + position} onClick={handleChange}>
      {' '}
      <img src='arrow.png' alt='arrow' width={30} height={30} />
    </button>
  );
};
