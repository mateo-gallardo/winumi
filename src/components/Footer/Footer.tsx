import React, { useState, useEffect, useRef } from 'react';
import { Event, listen, UnlistenFn } from '@tauri-apps/api/event';
import { writeText } from '@tauri-apps/api/clipboard';
import {
  Container,
  SettingsIcon,
  CenterTextContainer,
  Total,
  Message,
  RightIcon,
} from './Footer.styles';
import Events from '../../constants/Events';
import TimeDelaysMS from '../../constants/TimeDelaysMS';

const Footer = () => {
  const [total, setTotal] = useState('');
  const [message, setMessage] = useState('');
  const [shouldFadeMessage, setShouldFadeMessage] = useState(true);
  const [shouldHideMessage, setShouldHideMessage] = useState(true);
  const fadingMessage = useRef(false);
  const showingTimedMessage = useRef(false);
  const unsubcribeFromShowFooterMessageAndFadeOut = useRef<UnlistenFn>();
  const unsubcribeFromShowFooterMessage = useRef<UnlistenFn>();
  const unsubcribeFromFadeOutFooterMessage = useRef<UnlistenFn>();
  const unsubscribeToTotalChanged = useRef<UnlistenFn>();

  const fadeOutMessage = () => {
    if (!fadingMessage.current) {
      fadingMessage.current = true;
      setShouldFadeMessage(true);
      setTimeout(() => {
        if (fadingMessage.current) {
          fadingMessage.current = false;
          showingTimedMessage.current = false;
          setShouldHideMessage(true);
        }
      }, TimeDelaysMS.MessageFade);
    }
  };

  const showMessage = (newMessage: string) => {
    fadingMessage.current = false;
    setMessage(newMessage);
    setShouldFadeMessage(false);
    setShouldHideMessage(false);
  };

  const showMessageAndFadeOut = (newMessage: string) => {
    showingTimedMessage.current = true;
    showMessage(newMessage);
    setTimeout(fadeOutMessage, TimeDelaysMS.MessageDisplayTime);
  };

  const subscribeToShowFooterMessageAndFadeOut = async () => {
    const unsubscribe = await listen<string>(
      Events.ShowFooterMessageAndFadeOut,
      (event: Event<string>) => {
        showMessageAndFadeOut(event.payload);
      }
    );

    unsubcribeFromShowFooterMessageAndFadeOut.current = unsubscribe;
  };

  const subscribeToShowFooterMessage = async () => {
    const unsubscribe = await listen<string>(
      Events.ShowFooterMessage,
      (event: Event<string>) => {
        if (!showingTimedMessage.current) {
          showMessage(event.payload);
        }
      }
    );

    unsubcribeFromShowFooterMessage.current = unsubscribe;
  };

  const subscribeToFadeOutFooterMessage = async () => {
    const unsubscribe = await listen(Events.FadeOutFooterMessage, () => {
      if (!showingTimedMessage.current) {
        fadeOutMessage();
      }
    });

    unsubcribeFromFadeOutFooterMessage.current = unsubscribe;
  };

  const subscribeToTotalChanged = async () => {
    const unsubscribe = await listen<string>(
      Events.TotalChanged,
      (event: Event<string>) => {
        setTotal(event.payload);
      }
    );
    unsubscribeToTotalChanged.current = unsubscribe;
  };

  useEffect(() => {
    subscribeToShowFooterMessageAndFadeOut();
    subscribeToShowFooterMessage();
    subscribeToFadeOutFooterMessage();
    subscribeToTotalChanged();

    return () => {
      if (unsubcribeFromShowFooterMessageAndFadeOut.current) {
        unsubcribeFromShowFooterMessageAndFadeOut.current();
      }

      if (unsubcribeFromShowFooterMessage.current) {
        unsubcribeFromShowFooterMessage.current();
      }

      if (unsubcribeFromFadeOutFooterMessage.current) {
        unsubcribeFromFadeOutFooterMessage.current();
      }

      if (unsubscribeToTotalChanged.current) {
        unsubscribeToTotalChanged.current();
      }
    };
  }, []);

  const copyTotalToClipboard = async () => {
    await writeText(total);
    showMessageAndFadeOut('Total copied');
  };

  return (
    <Container>
      <SettingsIcon />
      <CenterTextContainer>
        <Message fade={shouldFadeMessage} hidden={shouldHideMessage}>
          {message}
        </Message>
        {!!total && (
          <Total onClick={() => copyTotalToClipboard()}>Total: {total}</Total>
        )}
      </CenterTextContainer>
      <RightIcon />
    </Container>
  );
};

export default Footer;
