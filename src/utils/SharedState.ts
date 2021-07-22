import { useState, useEffect } from 'react';

interface Observer<T> {
  id: number;
  callback: (newValue: T) => void;
}

export interface SharedState<T> {
  getValue: () => T;
  setValue: (value: T) => void;
  addObserver: (callback: (newValue: T) => void) => number;
  removeObserver: (id: number) => void;
  observers: Observer<T>[];
  observersCount: number;
}

export function createSharedState<T>(initialValue: T): SharedState<T> {
  let value = initialValue;
  const observers: Observer<T>[] = [];
  let observersCount = 0;

  const setValue = (newValue: T) => {
    value = newValue;
    observers.forEach((observer) => observer.callback(value));
  };

  const getValue = () => value;

  const addObserver = (callback: (newValue: T) => void) => {
    const id = observersCount;
    observersCount++;
    observers.push({
      id,
      callback,
    });

    return id;
  };

  const removeObserver = (id: number) => {
    const observerIndex = observers.findIndex((observer) => observer.id === id);

    if (observerIndex !== -1) {
      observers.splice(observerIndex, 1);
    }
  };

  return {
    getValue,
    setValue,
    addObserver,
    removeObserver,
    observers,
    observersCount,
  };
}

export function useSharedState<T>(sharedState: SharedState<T>) {
  const [stateValue, setStateValue] = useState(sharedState.getValue());

  useEffect(() => {
    const id = sharedState.addObserver((value: T) => {
      setStateValue(value);
    });

    return () => {
      sharedState.removeObserver(id);
    };
  });

  return stateValue;
}
