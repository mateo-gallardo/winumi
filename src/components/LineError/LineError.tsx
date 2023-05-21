import React from 'react';
import ErrorIconSVG from './ErrorIconSVG';
import { LineErrorContainer } from '../Lines/Lines.styles';

type LineErrorProps = {
  message: string;
};

const LineError: React.FC<LineErrorProps> = ({ message }) => (
  <LineErrorContainer>
    <ErrorIconSVG message={message} />
  </LineErrorContainer>
);

export default LineError;
