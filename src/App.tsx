import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from './App.styles';
import Titlebar from './components/Titlebar/Titlebar';
import Lines from './components/Lines/Lines';
import DataManager, { SavedData } from './utils/DataManager';
import { useSharedState } from './utils/SharedState';
import SettingsManager from './utils/SettingsManager';
import Themes from './constants/Themes';
import Platform from './utils/Platform';

function App() {
  const settings = useSharedState(SettingsManager.state);
  const [savedData, setSavedData] = useState<SavedData | undefined>();
  const isWindows = Platform.isWindows();

  const getSavedData = async () => {
    const data = await DataManager.get();
    setSavedData(data);
  };

  useEffect(() => {
    getSavedData();
  }, []);

  if (savedData === undefined) {
    return null;
  }

  return (
    <ThemeProvider theme={Themes[settings.themeName]}>
      <Container settings={settings} isWindows={isWindows}>
        {isWindows && <Titlebar />}
        <Lines initialLines={savedData.lines} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
