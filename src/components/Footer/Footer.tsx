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
  const [fadeMessage, setFadeMessage] = useState(true);
  const [hideMessage, setHideMessage] = useState(true);
  const unsubcribeFromClipboardCopy = useRef<UnlistenFn>();
  const unsubscribeToTotalChanged = useRef<UnlistenFn>();

  const showCopiedToClipboardMessage = () => {
    setMessage('Copied to clipboard!');
    setFadeMessage(false);
    setHideMessage(false);

    setTimeout(() => {
      setFadeMessage(true);
      setTimeout(() => {
        setHideMessage(true);
      }, TimeDelaysMS.MessageFade);
    }, TimeDelaysMS.MessageDisplayTime);
  };

  const subscribeToClipboardCopy = async () => {
    const unsubscribe = await listen(
      Events.CopiedToClipboard,
      showCopiedToClipboardMessage
    );
    unsubcribeFromClipboardCopy.current = unsubscribe;
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
    subscribeToClipboardCopy();
    subscribeToTotalChanged();

    return () => {
      if (unsubcribeFromClipboardCopy.current) {
        unsubcribeFromClipboardCopy.current();
      }

      if (unsubscribeToTotalChanged.current) {
        unsubscribeToTotalChanged.current();
      }
    };
  }, []);

  const copyTotalToClipboard = async () => {
    await writeText(total);
    showCopiedToClipboardMessage();
  };

  return (
    <Container>
      <SettingsIcon />
      <CenterTextContainer>
        <Message fade={fadeMessage} hidden={hideMessage}>
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
