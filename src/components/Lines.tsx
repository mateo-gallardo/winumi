import React, { useState, useEffect } from 'react';
import { writeText } from '@tauri-apps/api/clipboard';
import { emit } from '@tauri-apps/api/event';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { create, all, MathJsStatic } from 'mathjs';
import Events from '../constants/Events';
import Footer from './Footer/Footer';

const math = create(all, { number: 'BigNumber' }) as MathJsStatic;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EditorContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ResultsContainer = styled.div`
  padding: 10px;
  border-left: 1px solid #4d5361;
`;

const Result = styled.div`
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

const setTotal = (total: string) => {
  emit(Events.TotalChanged, total);
};

const calculateTotal = (results: string[]) => {
  try {
    const sum = results.join(' + ');
    const total = math.evaluate(sum);
    setTotal(total.toString());
  } catch (error) {
    setTotal('');
  }
};

const Lines = () => {
  const [results, setResults] = useState(['']);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    calculateTotal(results);
  }, [results]);

  const evaluateResult = (expression: string) => {
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

          if (!Number.isNaN(Number(formattedResult))) {
            formattedResult = Number(formattedResult).toLocaleString();
          }

          return formattedResult;
        });

        setResults(newResults);
        setErrorMessage('');
      } else {
        setResults(['']);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTotal('');
    }
  };

  const copyToClipboard = async (result: string) => {
    await writeText(result);
    emit(Events.CopiedToClipboard);
  };

  return (
    <>
      <Container>
        <EditorContainer>
          <Editor
            value={code}
            onValueChange={(newCode) => {
              setCode(newCode);
              evaluateResult(newCode);
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
            >
              {result}
            </Result>
          ))}
        </ResultsContainer>
      </Container>
      <Error>{errorMessage}</Error>
      <Footer />
    </>
  );
};

export default Lines;
