import ZoomLevels, { ZoomLevel } from '../constants/ZoomLevels';
import DataManager from './DataManager';
import { SharedState, createSharedState } from './SharedState';

const OneHundredPercentZoomLevelIndex = 2;

export interface SettingsData {
  zoomLevel: ZoomLevel;
  displayErrors: boolean;
}

export default class SettingsManager {
  static state: SharedState<SettingsData> = createSharedState({
    zoomLevel: ZoomLevels[OneHundredPercentZoomLevelIndex],
    displayErrors: false,
  } as SettingsData);

  static async init() {
    const savedData = await DataManager.get();
    SettingsManager.state = createSharedState(savedData.settings);
    SettingsManager.state.addObserver((settings: SettingsData) => {
      DataManager.saveSettings(settings);
    });
  }

  static increaseFontSize() {
    const currentState = SettingsManager.state.getValue();
    const zoomLevelIndex = ZoomLevels.findIndex(
      (zoomLevel) => zoomLevel.fontSize === currentState.zoomLevel.fontSize
    );

    if (zoomLevelIndex < ZoomLevels.length - 1) {
      SettingsManager.state.setValue({
        ...currentState,
        zoomLevel: ZoomLevels[zoomLevelIndex + 1],
      });
    }
  }

  static decreaseFontSize() {
    const currentState = SettingsManager.state.getValue();
    const zoomLevelIndex = ZoomLevels.findIndex(
      (zoomLevel) => zoomLevel.fontSize === currentState.zoomLevel.fontSize
    );

    if (zoomLevelIndex > 0) {
      SettingsManager.state.setValue({
        ...currentState,
        zoomLevel: ZoomLevels[zoomLevelIndex - 1],
      });
    }
  }

  static toggleDisplayErrors() {
    const currentState = SettingsManager.state.getValue();
    SettingsManager.state.setValue({
      ...currentState,
      displayErrors: !currentState.displayErrors,
    });
  }
}