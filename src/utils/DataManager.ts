import {
  readTextFile,
  writeFile,
  readDir,
  createDir,
} from '@tauri-apps/api/fs';
import { appDir } from '@tauri-apps/api/path';
import debounce from 'lodash.debounce';
import TimeDelaysMS from '../constants/TimeDelaysMS';

const FILE_NAME = 'saved-data.json';

export interface SavedData {
  lines: string;
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
      };
    }
  }

  static saveLines = debounce(
    DataManager.undebouncedSaveLines,
    TimeDelaysMS.SaveFileDebounce
  );

  private static async undebouncedSaveLines(lines: string) {
    DataManager.savedData.lines = lines;
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
