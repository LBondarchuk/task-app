type Props = {
  value: string;
  setValue: (value: string) => void;
};

export const Input: React.FC<Props> = ({ value, setValue }) => {
  return (
    <div className='input'>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      <button className='field__actions--close'>X</button>
      <button className='field__actions--save'>S</button>
    </div>
  );
};
