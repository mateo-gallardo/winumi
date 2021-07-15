import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { create, all, MathJsStatic } from 'mathjs';

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
  color: white;
  font-size: 25px;
  font-family: 'Fira code', 'Fira Mono', monospace;
`;

const Error = styled.span`
  padding-top: 20px;
  color: #942e2e;
  font-size: 20px;
`;

const Lines = () => {
  const [results, setResults] = useState(['']);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    }
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
            <Result key={`${result}-${index}`}>{result}</Result>
          ))}
        </ResultsContainer>
      </Container>
      <Error>{errorMessage}</Error>
    </>
  );
};

export default Lines;
