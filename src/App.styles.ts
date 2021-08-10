import styled, { css } from 'styled-components';
import { SettingsData } from './utils/SettingsManager';

interface ContainerProps {
  settings: SettingsData;
  isWindows?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;

  ${(props) =>
    props.isWindows &&
    css`
      margin: 6px;
      box-shadow: 0 0 5px #161616;
      border-radius: 5px;
    `}

  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.settings.zoomLevel.fontSize};

  pre {
    // Variables
    color: ${(props) => props.theme.colors.editor.variable};

    .token.number {
      color: ${(props) => props.theme.colors.editor.primary};
    }

    .token.operator {
      color: ${(props) => props.theme.colors.editor.operator};
    }

    .token.function {
      color: ${(props) => props.theme.colors.editor.function};
    }

    .token.comment {
      color: ${(props) => props.theme.colors.editor.comment};
    }
  }
`;
