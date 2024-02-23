import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import AppWithSettings from './AppWithSettings';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithSettings />
  </React.StrictMode>
);
