import React, { useState, useEffect, useContext } from 'react';
import { writeText } from '@tauri-apps/api/clipboard';
import { ThemeContext } from 'styled-components';
import Editor from 'react-simple-code-editor';
import { create, all, MathJsStatic } from 'mathjs';
// @ts-ignore
import ResizablePanels from 'resizable-panels-react';
import {
  Container,
  EditorContainer,
  ResultsContainer,
  Result,
  Error,
} from './Lines.styles';
import { useSharedState } from '../../utils/SharedState';
import Footer from '../Footer/Footer';
import FooterMessage from '../../utils/FooterMessage';
import TotalResult from '../../utils/TotalResult';
import DataManager from '../../utils/DataManager';
import SettingsManager from '../../utils/SettingsManager';

const math = create(all, { number: 'BigNumber' }) as MathJsStatic;

interface LinesProps {
  initialLines: string;
}

const Lines = ({ initialLines }: LinesProps) => {
  const theme = useContext(ThemeContext);
  const settings = useSharedState(SettingsManager.state);
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
          displayDirection={'row'}
          width={'100%'}
          height={'100%'}
          panelsSize={[80, 20]}
          sizeUnitMeasure={'%'}
          resizerColor={theme.colors.primary}
          resizerSize={'10px'}
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
              padding={'0.4em'}
              style={{
                color: theme.colors.editor.primary,
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: '1em',
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
      {settings.displayErrors && !!errorMessage && (
        <Error>{errorMessage}</Error>
      )}
    </>
  );
};

export default Lines;
