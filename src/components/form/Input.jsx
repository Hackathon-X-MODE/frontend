import React from 'react';

const Input = ({contentValue, updateFunc, name}) => {
    return(
      name
          ? <input required name={name} value={contentValue} className={'w-full  p-2 border rounded bg-white text-black font-bold'} onChange={(e) => updateFunc(e)} />
          : <input required value={contentValue} className={'w-full p-2 border rounded bg-white text-black font-bold'} onChange={(e) => updateFunc(e)} />
    )
}

export default Input;