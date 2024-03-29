import styled from 'styled-components';
import { PanelResizeHandle } from 'react-resizable-panels';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  padding: 0.4em;

  :hover {
    border-left: 1px solid ${(props) => props.theme.colors.editor.separator};
  }
`;

export const Result = styled.div`
  width: fit-content;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.result};
  font-size: 1em;
  font-family: 'RobotoMono';
  user-select: none;
  cursor: pointer;
  padding: 0 0.2em;
  border-radius: 0.32em;
  transition-duration: 100ms;

  :hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.result};
  }
`;

export const EmptyResult = styled.div`
  user-select: none;
  font-family: 'RobotoMono';
  color: ${(props) => props.theme.colors.primary};
`;

export const Error = styled.span`
  padding-bottom: 0.5em;
  color: ${(props) => props.theme.colors.error};
  font-size: 0.8em;
`;

export const LineErrorsContainer = styled(ResultsContainer)`
  width: 1rem;
  padding-left: 0;
  padding-right: 0;

  :hover {
    border: none;
  }
`;

export const LineErrorContainer = styled(Result)`
  cursor: default;

  :hover {
    color: unset;
    background-color: unset;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const ResizeHandle = styled(PanelResizeHandle)`
  &[data-resize-handle-state='drag'] {
    border-left: 1px solid ${(props) => props.theme.colors.editor.separator};
  }
`;
