import {useState} from 'react';

export const useStateObject = <T = Record<string, any>>(
  initialState: T,
): [T, (partial: Partial<T>) => void] => {
  const [state, setState] = useState(initialState);

  const setObjectState = (partialObject: Partial<T>) => {
    setState(previous => ({...previous, ...partialObject}));
  };

  return [state, setObjectState];
};
