import React, { useState, useEffect } from 'react';
import './App.css';
import Lines from './components/Lines';
import DataManager, { SavedData } from './utils/DataManager';

function App() {
  const [savedData, setSavedData] = useState<SavedData | undefined>();

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
    <div className="App">
      <Lines initialLines={savedData.lines} />
    </div>
  );
}

export default App;
