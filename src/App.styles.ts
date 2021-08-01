import styled from 'styled-components';
import { SettingsData } from './utils/SettingsManager';

interface ContainerProps {
  settings: SettingsData;
}

export const Container = styled.div<ContainerProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.settings.zoomLevel.fontSize};
`;
