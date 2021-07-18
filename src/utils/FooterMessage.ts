import React from 'react';
import { Event, emit, listen, UnlistenFn } from '@tauri-apps/api/event';
import Events from '../constants/Events';
import TimeDelaysMS from '../constants/TimeDelaysMS';

type SetStringAction = React.Dispatch<React.SetStateAction<string>>;
type SetBooleanAction = React.Dispatch<React.SetStateAction<boolean>>;

export default class FooterMessage {
  private setMessage: SetStringAction;
  private setShouldFadeMessage: SetBooleanAction;
  private setShouldHideMessage: SetBooleanAction;
  private fadingMessage: boolean = false;
  private showingTimedMessage: boolean = false;
  private unsubscribeFunctions: UnlistenFn[] = [];

  static showMessage = (message: string) => {
    emit(Events.ShowFooterMessage, message);
  };

  static showMessageAndFadeOut = (message: string) => {
    emit(Events.ShowFooterMessageAndFadeOut, message);
  };

  static fadeOut = () => {
    emit(Events.FadeOutFooterMessage);
  };

  constructor(
    setMessage: SetStringAction,
    setShouldFadeMessage: SetBooleanAction,
    setShouldHideMessage: SetBooleanAction
  ) {
    this.setMessage = setMessage;
    this.setShouldFadeMessage = setShouldFadeMessage;
    this.setShouldHideMessage = setShouldHideMessage;
    this.subscribeToShowFooterMessage();
    this.subscribeToShowFooterMessageAndFadeOut();
    this.subscribeToFadeOutFooterMessage();
  }

  unsubscribe() {
    this.unsubscribeFunctions.forEach((unsubscribeFunction) => {
      if (unsubscribeFunction) {
        unsubscribeFunction();
      }
    });
  }

  private fadeOutMessage = () => {
    if (!this.fadingMessage) {
      this.fadingMessage = true;
      this.setShouldFadeMessage(true);
      setTimeout(() => {
        if (this.fadingMessage) {
          this.fadingMessage = false;
          this.showingTimedMessage = false;
          this.setShouldHideMessage(true);
        }
      }, TimeDelaysMS.MessageFade);
    }
  };

  private showMessage = (newMessage: string) => {
    this.fadingMessage = false;
    this.setMessage(newMessage);
    this.setShouldFadeMessage(false);
    this.setShouldHideMessage(false);
  };

  private showMessageAndFadeOut = (newMessage: string) => {
    this.showingTimedMessage = true;
    this.showMessage(newMessage);
    setTimeout(this.fadeOutMessage, TimeDelaysMS.MessageDisplayTime);
  };

  private subscribeToShowFooterMessageAndFadeOut = async () => {
    const unsubscribe = await listen<string>(
      Events.ShowFooterMessageAndFadeOut,
      (event: Event<string>) => {
        this.showMessageAndFadeOut(event.payload);
      }
    );

    this.unsubscribeFunctions.push(unsubscribe);
  };

  private subscribeToShowFooterMessage = async () => {
    const unsubscribe = await listen<string>(
      Events.ShowFooterMessage,
      (event: Event<string>) => {
        if (!this.showingTimedMessage) {
          this.showMessage(event.payload);
        }
      }
    );

    this.unsubscribeFunctions.push(unsubscribe);
  };

  private subscribeToFadeOutFooterMessage = async () => {
    const unsubscribe = await listen(Events.FadeOutFooterMessage, () => {
      if (!this.showingTimedMessage) {
        this.fadeOutMessage();
      }
    });

    this.unsubscribeFunctions.push(unsubscribe);
  };
}
