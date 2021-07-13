import React, { useState } from 'react';
import styled from 'styled-components';
import { create, all, MathJsStatic } from 'mathjs';

const math = create(all, { number: 'BigNumber' }) as MathJsStatic;
const scope = {};

const Container = styled.div`
  flex-direction: row;
`;

const Input = styled.input`
  background-color: #282c34;
  border: 0;
  color: white;
  font-size: 25px;
`;

const Result = styled.span`
  border-left: 1px solid #4d5361;
  padding-left: 10px;
  color: white;
  font-size: 25px;
`;

const Error = styled.span`
  padding-top: 20px;
  color: #942e2e;
  font-size: 20px;
`;

const Line = () => {
  const [line, setLine] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let result = math.evaluate(event.target.value, scope);

      if (result !== undefined) {
        result = result.toString();

        if (!Number.isNaN(Number(result))) {
          result = Number(result).toLocaleString();
        }

        setLine(result);
        setErrorMessage('');
      } else {
        setLine('');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Container>
        <Input type="text" onChange={handleLineChange} />
        <Result>{line}</Result>
      </Container>
      <Error>{errorMessage}</Error>
    </>
  );
};

export default Line;
