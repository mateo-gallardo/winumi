import { useState, useEffect, useContext } from 'react';
import { writeText } from '@tauri-apps/api/clipboard';
import { ThemeContext } from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import { create, all, MathJsInstance } from 'mathjs';
import { Panel, PanelGroup } from 'react-resizable-panels';
import {
  Container,
  EditorContainer,
  ResultsContainer,
  Result,
  EmptyResult,
  Error,
  LineErrorsContainer,
  ResizeHandle,
} from './Lines.styles';
import { useSharedState } from '../../utils/SharedState';
import Footer from '../Footer/Footer';
import FooterMessage from '../../utils/FooterMessage';
import TotalResult from '../../utils/TotalResult';
import DataManager from '../../utils/DataManager';
import SettingsManager from '../../utils/SettingsManager';
import LineError from '../LineError/LineError';

const math = create(all, { number: 'BigNumber' }) as MathJsInstance;

interface LinesProps {
  initialLines: string;
}

const Lines = ({ initialLines }: LinesProps) => {
  const theme = useContext(ThemeContext);
  const settings = useSharedState(SettingsManager.state);
  const [results, setResults] = useState(['']);
  const [lines, setLines] = useState(initialLines);
  const [errorMessage, setErrorMessage] = useState('');
  const [lineErrors, setLineErrors] = useState<string[]>([]);

  const evaluateResult = (expression: string) => {
    const resultsForTotalCalculation: string[] = [];

    try {
      const expressionLines = expression.split('\n');
      const correctLines: string[] = [];
      const newLinesWithErrors: string[] = [];

      expressionLines.forEach((line) => {
        const compoundedExpression = `${correctLines.join('\n')}
        ${line}`;

        try {
          math.evaluate(compoundedExpression);
          correctLines.push(line);
          newLinesWithErrors.push('');
        } catch (error: unknown) {
          if (error instanceof window.Error) {
            newLinesWithErrors.push(error.message);
            correctLines.push('');
          } else {
            console.log('no error?', error);
          }
        }
      });

      let newResults = math.evaluate(correctLines.join('\n'));
      const formattedResults: string[] = [];

      if (newResults !== undefined && typeof newResults !== 'function') {
        if (!newResults.entries) {
          newResults = [newResults];
        } else {
          newResults = newResults.entries;
        }

        let resultsIndex = 0;
        correctLines.forEach((line) => {
          if (line.trim()) {
            const result = newResults[resultsIndex++];
            let formattedResult = result.toString();
            resultsForTotalCalculation.push(formattedResult);

            if (!Number.isNaN(Number(formattedResult))) {
              formattedResult = Number(formattedResult).toLocaleString();
            }

            formattedResults.push(formattedResult);
          } else {
            formattedResults.push('');
          }
        });

        TotalResult.calculateTotal(resultsForTotalCalculation);
        setResults(formattedResults);
        setErrorMessage('');
      } else {
        TotalResult.calculateTotal(resultsForTotalCalculation);
        setResults(['']);
        setErrorMessage('');
      }

      setLineErrors(newLinesWithErrors);
    } catch (error: any) {
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
    // We only want to evaluate the initial lines once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        {settings.displayErrors && (
          <LineErrorsContainer>
            {lineErrors.map((lineError: string, index: number) =>
              lineError ? (
                <LineError key={`${lineError}-${index}`} message={lineError} />
              ) : (
                <EmptyResult key={`${lineError}-${index}`}>none</EmptyResult>
              )
            )}
          </LineErrorsContainer>
        )}
        <PanelGroup
          direction={'horizontal'}
          onLayout={SettingsManager.saveDividerPosition}
        >
          <Panel defaultSize={settings.panelsSizes[0]}>
            <EditorContainer>
              <Editor
                value={lines}
                onValueChange={(newCode) => {
                  setLines(newCode);
                  evaluateResult(newCode);
                  DataManager.saveLines(newCode);
                }}
                highlight={(code) => highlight(code, languages.rego, 'rego')}
                padding={'0.4em'}
                style={{
                  color: theme?.colors.editor.primary,
                  fontFamily: '"RobotoMono"',
                  fontSize: '1em',
                  flex: 1,
                }}
              />
            </EditorContainer>
          </Panel>
          <ResizeHandle />
          <Panel>
            <ResultsContainer>
              {results.map((result: string, index: number) =>
                result ? (
                  <Result
                    key={`${result}-${index}`}
                    onClick={() => copyToClipboard(result)}
                    onMouseEnter={showClickToCopyMessage}
                    onMouseLeave={hideClickToCopyMessage}
                  >
                    {result}
                  </Result>
                ) : (
                  <EmptyResult key={`${result}-${index}`}>none</EmptyResult>
                )
              )}
            </ResultsContainer>
          </Panel>
        </PanelGroup>
      </Container>
      <Footer />
      {settings.displayErrors && !!errorMessage && (
        <Error>{errorMessage}</Error>
      )}
    </>
  );
};

export default Lines;
