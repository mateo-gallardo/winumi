import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #4d5361;
  font-weight: 500;
`;

export const SettingsIcon = styled.div``;

export const CenterTextContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Total = styled.div`
  cursor: pointer;
  user-select: none;
`;

interface MessageProps {
  fade: boolean;
}

export const Message = styled.div`
  position: absolute;
  top: 0;
  background-color: #282c34;
  opacity: ${(props: MessageProps) => (props.fade ? 0 : 'initial')};
  transition-duration: 200ms;
  user-select: none;
`;

export const RightIcon = styled.div``;
