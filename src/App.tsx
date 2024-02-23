import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from './App.styles';
import Lines from './components/Lines/Lines';
import DataManager, { SavedData } from './utils/DataManager';
import { useSharedState } from './utils/SharedState';
import SettingsManager from './utils/SettingsManager';
import Themes from './constants/Themes';

const App = () => {
  const settings = useSharedState(SettingsManager.state);
  const [savedData, setSavedData] = useState<SavedData | undefined>();

  const getSavedData = async () => {
    const data = await DataManager.get();
    setSavedData(data);
  };

  useEffect(() => {
    if (!savedData) {
      getSavedData();
    }
  }, [savedData]);

  if (savedData === undefined) {
    return null;
  }

  return (
    <ThemeProvider theme={Themes[settings.themeName]}>
      <Container $settings={settings}>
        <Lines initialLines={savedData.lines} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
