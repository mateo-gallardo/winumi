import { useState, useEffect, useRef } from 'react';
import { writeText } from '@tauri-apps/api/clipboard';
import {
  Container,
  SettingsIconContainer,
  SettingsIcon,
  CenterTextContainer,
  Total,
  Message,
  RightIcon,
} from './Footer.styles';
import FooterMessage from '../../utils/FooterMessage';
import TotalResult from '../../utils/TotalResult';
import Settings from '../Settings/Settings';

const Footer = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [total, setTotal] = useState('');
  const [message, setMessage] = useState('');
  const [shouldFadeMessage, setShouldFadeMessage] = useState(true);
  const [shouldHideMessage, setShouldHideMessage] = useState(true);
  const footerMessage = useRef<FooterMessage>();
  const totalResult = useRef<TotalResult>();

  useEffect(() => {
    footerMessage.current = new FooterMessage(
      setMessage,
      setShouldFadeMessage,
      setShouldHideMessage
    );
    totalResult.current = new TotalResult(setTotal);

    return () => {
      footerMessage.current?.unsubscribe();
      totalResult.current?.unsubscribe();
    };
  }, []);

  const copyTotalToClipboard = async () => {
    await writeText(total);
    FooterMessage.showMessageAndFadeOut('Total copied');
  };

  return (
    <>
      <Container>
        <SettingsIconContainer>
          <SettingsIcon height={'1em'} onClick={() => setShowSettings(true)} />
        </SettingsIconContainer>
        <CenterTextContainer>
          <Message $fade={shouldFadeMessage} hidden={shouldHideMessage}>
            {message}
          </Message>
          {!!total && (
            <Total onClick={() => copyTotalToClipboard()}>Total: {total}</Total>
          )}
        </CenterTextContainer>
        <RightIcon />
      </Container>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default Footer;
