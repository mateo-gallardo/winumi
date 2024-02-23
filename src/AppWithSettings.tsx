import { useState, useRef, useEffect } from 'react';
import App from './App';
import SettingsManager from './utils/SettingsManager';

const AppWithSettings = () => {
  const initialized = useRef(false);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    await SettingsManager.init();
    setLoading(false);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      init();
    }
  }, []);

  if (loading) {
    return null;
  }

  return <App />;
};

export default AppWithSettings;
