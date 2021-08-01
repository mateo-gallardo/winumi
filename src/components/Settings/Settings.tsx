import React from 'react';
import { ThemeNames } from '../../constants/Themes';
import SettingsManager from '../../utils/SettingsManager';
import { useSharedState } from '../../utils/SharedState';
import Checkbox from '../Checkbox/Checkbox';
import {
  Container,
  Overlay,
  Modal,
  Title,
  CloseButtonContainer,
  CloseButton,
  Options,
  OptionContainer,
  FontSizeInputContainer,
  FontSizeContainer,
  LeftButton,
  RightButton,
  CheckboxContainer,
  DisplayErrorsText,
  ThemeRightButton,
  ThemeLeftButton,
} from './Settings.styles';

interface SettingsProps {
  onClose: () => void;
}

const Settings = ({ onClose }: SettingsProps) => {
  const settings = useSharedState(SettingsManager.state);

  return (
    <Container>
      <Modal>
        <Title>Settings</Title>
        <Options>
          <OptionContainer>
            Zoom level
            <FontSizeInputContainer>
              <LeftButton onClick={SettingsManager.decreaseFontSize}>
                -
              </LeftButton>
              <FontSizeContainer>
                {settings.zoomLevel.displayValue}
              </FontSizeContainer>
              <RightButton onClick={SettingsManager.increaseFontSize}>
                +
              </RightButton>
            </FontSizeInputContainer>
          </OptionContainer>
          <OptionContainer>
            <CheckboxContainer onClick={SettingsManager.toggleDisplayErrors}>
              <Checkbox checked={settings.displayErrors} />
              <DisplayErrorsText>Display errors</DisplayErrorsText>
            </CheckboxContainer>
          </OptionContainer>
          <OptionContainer>
            Theme
            <FontSizeInputContainer>
              <ThemeLeftButton
                onClick={() => SettingsManager.pickTheme(ThemeNames.Dark)}
                selected={settings.themeName === ThemeNames.Dark}
              >
                {ThemeNames.Dark}
              </ThemeLeftButton>
              <ThemeRightButton
                onClick={() => SettingsManager.pickTheme(ThemeNames.Light)}
                selected={settings.themeName === ThemeNames.Light}
              >
                {ThemeNames.Light}
              </ThemeRightButton>
            </FontSizeInputContainer>
          </OptionContainer>
        </Options>
        <CloseButtonContainer>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </CloseButtonContainer>
      </Modal>
      <Overlay onClick={onClose} />
    </Container>
  );
};

export default Settings;
