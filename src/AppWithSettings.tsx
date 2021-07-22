import React, { useState, useEffect } from 'react';
import SettingsManager from './utils/SettingsManager';
import App from './App';

const AppWithSettings = () => {
  const [loading, setLoading] = useState(true);

  const init = async () => {
    await SettingsManager.init();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return null;
  }

  return <App />;
};

export default AppWithSettings;
