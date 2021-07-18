import React, { useState, useEffect } from 'react';
import { writeText } from '@tauri-apps/api/clipboard';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { create, all, MathJsStatic } from 'mathjs';
// @ts-ignore
import ResizablePanels from 'resizable-panels-react';
import Footer from './Footer/Footer';
import FooterMessage from '../utils/FooterMessage';
import TotalResult from '../utils/TotalResult';
import DataManager from '../utils/DataManager';

const math = create(all, { number: 'BigNumber' }) as MathJsStatic;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const EditorContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  padding: 10px;
  border-left: 1px solid #4d5361;
`;

const Result = styled.div`
  width: fit-content;
  white-space: nowrap;
  color: #7eb24f;
  font-size: 25px;
  font-family: 'Fira code', 'Fira Mono', monospace;
  user-select: none;
  cursor: pointer;
  padding: 0px 5px;
  border-radius: 8px;
  transition-duration: 100ms;

  :hover {
    color: #282c34;
    background-color: #7eb24f;
  }
`;

const Error = styled.span`
  padding-top: 20px;
  color: #942e2e;
  font-size: 20px;
`;

interface LinesProps {
  initialLines: string;
}

const Lines = ({ initialLines }: LinesProps) => {
  const [results, setResults] = useState(['']);
  const [lines, setLines] = useState(initialLines);
  const [errorMessage, setErrorMessage] = useState('');

  const evaluateResult = (expression: string) => {
    const resultsForTotalCalculation: string[] = [];

    try {
      let newResults = math.evaluate(expression);

      if (newResults !== undefined && typeof newResults !== 'function') {
        if (!newResults.entries) {
          newResults = [newResults];
        } else {
          newResults = newResults.entries;
        }

        newResults = newResults.map((result: any) => {
          let formattedResult = result.toString();
          resultsForTotalCalculation.push(formattedResult);

          if (!Number.isNaN(Number(formattedResult))) {
            formattedResult = Number(formattedResult).toLocaleString();
          }

          return formattedResult;
        });

        TotalResult.calculateTotal(resultsForTotalCalculation);
        setResults(newResults);
        setErrorMessage('');
      } else {
        TotalResult.calculateTotal(resultsForTotalCalculation);
        setResults(['']);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.message);
      TotalResult.setTotal('');
    }
  };

  const copyToClipboard = async (result: string) => {
    await writeText(result);
    FooterMessage.showMessageAndFadeOut('Result copied');
  };

  const showClickToCopyMessage = () => {
    FooterMessage.showMessage('Click to copy');
  };

  const hideClickToCopyMessage = () => {
    FooterMessage.fadeOut();
  };

  useEffect(() => {
    evaluateResult(lines);
  }, []);

  return (
    <>
      <Container>
        <ResizablePanels
          displayDirection="row"
          width="100%"
          height="100%"
          panelsSize={[80, 20]}
          sizeUnitMeasure="%"
          resizerColor="#282c34"
          resizerSize="10px"
          minPanelSize={15}
        >
          <EditorContainer>
            <Editor
              value={lines}
              onValueChange={(newCode) => {
                setLines(newCode);
                evaluateResult(newCode);
                DataManager.saveLines(newCode);
              }}
              highlight={(newCode) => newCode}
              padding={10}
              style={{
                color: 'white',
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 25,
                flex: 1,
              }}
            />
          </EditorContainer>
          <ResultsContainer>
            {results.map((result: string, index: number) => (
              <Result
                key={`${result}-${index}`}
                onClick={() => copyToClipboard(result)}
                onMouseEnter={showClickToCopyMessage}
                onMouseLeave={hideClickToCopyMessage}
              >
                {result}
              </Result>
            ))}
          </ResultsContainer>
        </ResizablePanels>
      </Container>
      <Footer />
      {process.env.NODE_ENV === 'development' && !!errorMessage && (
        <Error>{errorMessage}</Error>
      )}
    </>
  );
};

export default Lines;
