import React from 'react';
import { create, all, MathJsStatic } from 'mathjs';
import { Event, emit, listen, UnlistenFn } from '@tauri-apps/api/event';
import Events from '../constants/Events';

const math = create(all, { number: 'BigNumber' }) as MathJsStatic;

type SetStringAction = React.Dispatch<React.SetStateAction<string>>;

export default class TotalResult {
  private setTotal: SetStringAction;
  private unsubscribeToTotalChanged?: UnlistenFn;

  static setTotal(total: string) {
    emit(Events.TotalChanged, total);
  }

  static calculateTotal(results: string[]) {
    try {
      const sum = results.join(' + ');
      const total = math.evaluate(sum);

      if (!Number.isNaN(Number(total))) {
        TotalResult.setTotal(Number(total).toLocaleString());
      } else {
        TotalResult.setTotal(total.toString());
      }
    } catch (error) {
      TotalResult.setTotal('');
    }
  }

  constructor(setTotal: SetStringAction) {
    this.setTotal = setTotal;
    this.subscribeToTotalChanged();
  }

  unsubscribe = () => {
    if (this.unsubscribeToTotalChanged) {
      this.unsubscribeToTotalChanged();
    }
  };

  private subscribeToTotalChanged = async () => {
    const unsubscribe = await listen<string>(
      Events.TotalChanged,
      (event: Event<string>) => {
        this.setTotal(event.payload);
      }
    );
    this.unsubscribeToTotalChanged = unsubscribe;
  };
}
