import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
`;

export const Modal = styled.div`
  z-index: 1;
  min-width: 50%;
  min-height: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  -webkit-box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.2);
  user-select: none;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
`;

export const Title = styled.div`
  text-align: center;
  font-size: 0.9em;
  font-weight: 500;
  padding: 0.3em 0 0.7em 0;
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.div`
  background-color: ${(props) => props.theme.colors.primaryLight};
  margin: 1em;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.9em;
  padding: 0 0.3em;
  color: ${(props) => props.theme.colors.primary};

  :hover {
    background-color: ${(props) => props.theme.colors.text};
  }
`;

export const Options = styled.div`
  padding: 0 1em;
  flex: 1;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 500;
  padding: 0.2em 0;
`;

export const FontSizeInputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FontSizeContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.primaryLight};
  border-bottom: 1px solid ${(props) => props.theme.colors.primaryLight};
  padding: 0 0.2em;
  height: 1.5em;
`;

interface ButtonProps {
  selected?: boolean;
}

export const Button = styled.div<ButtonProps>`
  cursor: pointer;
  min-height: 1.5em;
  min-width: 1.5em;
  font-weight: bold;
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.primaryLight
      : props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primaryLight};

  :hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
`;

export const RightButton = styled(Button)`
  border-top-right-radius: 0.4em;
  border-bottom-right-radius: 0.4em;
`;

export const LeftButton = styled(Button)`
  border-top-left-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
`;

export const ThemeRightButton = styled(RightButton)`
  padding: 0 1em;
`;

export const ThemeLeftButton = styled(LeftButton)`
  padding: 0 1em;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
`;

export const DisplayErrorsText = styled.span`
  padding-left: 0.3em;
  padding-bottom: 0.1em;
`;
