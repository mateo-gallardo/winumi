import React, { useState, useEffect, useContext } from 'react';
import { writeText } from '@tauri-apps/api/clipboard';
import { ThemeContext } from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import { create, all, MathJsStatic } from 'mathjs';
// @ts-ignore
import ResizablePanels from 'resizable-panels-react';
import {
  Container,
  EditorContainer,
  ResultsContainer,
  Result,
  EmptyResult,
  Error,
} from './Lines.styles';
import { useSharedState } from '../../utils/SharedState';
import Footer from '../Footer/Footer';
import FooterMessage from '../../utils/FooterMessage';
import TotalResult from '../../utils/TotalResult';
import DataManager from '../../utils/DataManager';
import SettingsManager from '../../utils/SettingsManager';

require('prismjs/components/prism-rego');

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
      const expressionLines = expression.split('\n');
      const correctLines: string[] = [];

      expressionLines.forEach((line) => {
        const compoundedExpression = `${correctLines.join('\n')}
        ${line}`;

        try {
          math.evaluate(compoundedExpression);
          correctLines.push(line);
        } catch (error) {
          correctLines.push('');
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
              highlight={(code) => highlight(code, languages.rego, 'rego')}
              padding={'0.4em'}
              style={{
                color: theme.colors.editor.primary,
                fontFamily: '"RobotoMono"',
                fontSize: '1em',
                flex: 1,
              }}
            />
          </EditorContainer>
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
