import styled from 'styled-components';
import SettingsIconSVG from './SettingsIconSVG';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #4d5361;
  font-weight: 500;
  min-height: 1.2em;
  padding: 0.5em 0;
  align-items: center;
`;

export const SettingsIconContainer = styled.div`
  display: flex;
  width: 10%;
`;

export const SettingsIcon = styled(SettingsIconSVG)`
  cursor: pointer;
  margin: 0 0.5em;
  color: #4d5361;
`;

export const CenterTextContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Total = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 0.85em;
`;

interface MessageProps {
  fade: boolean;
}

export const Message = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #282c34;
  opacity: ${(props: MessageProps) => (props.fade ? 0 : 'initial')};
  transition-duration: 200ms;
  user-select: none;
  font-size: 0.85em;
`;

export const RightIcon = styled.div`
  width: 10%;
`;
