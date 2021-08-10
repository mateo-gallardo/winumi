import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 25px;
  background-color: ${(props) => props.theme.colors.primary};
  user-select: none;
  display: flex;
  justify-content: flex-end;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: ${(props) => props.theme.colors.primaryLight};
`;

interface ButtonProps {
  closeButton?: boolean;
}

export const Button = styled.div<ButtonProps>`
  padding: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;

  :hover {
    background-color: ${(props) =>
      props.closeButton
        ? props.theme.colors.error
        : props.theme.colors.primaryLight};
    color: ${(props) => props.theme.colors.text};
  }

  ${(props) =>
    props.closeButton &&
    css`
      border-top-right-radius: 5px;
    `}
`;
