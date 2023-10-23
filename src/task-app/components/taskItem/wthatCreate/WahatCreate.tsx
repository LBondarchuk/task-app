type Props = {
  response: (value: 'category' | 'servise' | null) => void;
};

export const WhatCreate: React.FC<Props> = ({ response }) => {
  return (
    <div className='what-create'>
      <div className='what-create__title'>What do you want to create</div>
      <div className='what-create__actions'>
        <button onClick={() => response('category')}>Category</button>
        <button onClick={() => response('servise')}>Service</button>
      </div>
    </div>
  );
};
