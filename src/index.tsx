import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithSettings from './AppWithSettings';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AppWithSettings />
  </React.StrictMode>
);
