import styled from 'styled-components';

export const Square = styled.div`
  height: 1em;
  width: 1em;
  background-color: ${(props) => props.theme.colors.primaryLight};
  border-radius: 0.2em;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: ${(props) => props.theme.colors.text};
  stroke-width: 2px;
`;
