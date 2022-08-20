import React from 'react';
import { createRoot } from 'react-dom/client';
import { appWindow } from '@tauri-apps/api/window';
import './index.css';
import AppWithSettings from './AppWithSettings';
import Platform from './utils/Platform';

(async () => {
  if (Platform.isWindows()) {
    try {
      appWindow.setDecorations(false);
    } catch (error) {
      console.error(error);
    }
  }
})();

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AppWithSettings />
  </React.StrictMode>
);
