import {
  readTextFile,
  writeFile,
  readDir,
  createDir,
} from '@tauri-apps/api/fs';
import { appDir } from '@tauri-apps/api/path';
import debounce from 'lodash.debounce';
import { ThemeNames } from '../constants/Themes';
import TimeDelaysMS from '../constants/TimeDelaysMS';
import ZoomLevels from '../constants/ZoomLevels';
import { SettingsData } from './SettingsManager';

const FILE_NAME = 'saved-data.json';

export interface SavedData {
  lines: string;
  settings: SettingsData;
}

export default class DataManager {
  private static savedData: SavedData;

  static async get(): Promise<SavedData> {
    if (!DataManager.savedData) {
      await DataManager.load();
    }

    return DataManager.savedData;
  }

  private static async load() {
    try {
      const path = await DataManager.getFilePath();
      const value = await readTextFile(path);
      DataManager.savedData = JSON.parse(value);
    } catch (error) {
      console.error(error);
      DataManager.savedData = {
        lines: '',
        settings: {
          zoomLevel: ZoomLevels[2],
          displayErrors: false,
          themeName: ThemeNames.Dark,
        },
      };
    }
  }

  static saveLines = debounce(
    DataManager.undebouncedSaveLines,
    TimeDelaysMS.SaveFileDebounce
  );

  private static async undebouncedSaveLines(lines: string) {
    DataManager.savedData.lines = lines;
    DataManager.save();
  }

  static async saveSettings(settings: SettingsData) {
    DataManager.savedData.settings = settings;
    DataManager.save();
  }

  private static async save() {
    const saveDirPath = await appDir();
    await DataManager.createSaveDirectory(saveDirPath);
    const filePath = await DataManager.getFilePath();
    await writeFile({
      path: filePath,
      contents: JSON.stringify(DataManager.savedData),
    });
  }

  private static async getFilePath(): Promise<string> {
    const dir = await appDir();
    return `${dir}${FILE_NAME}`;
  }

  private static async createSaveDirectory(dir: string): Promise<void> {
    try {
      await readDir(dir);
    } catch (error) {
      try {
        await createDir(dir, {
          recursive: true,
        });
      } catch (createDirError) {
        console.error(createDirError);
      }
    }
  }
}
