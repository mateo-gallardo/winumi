import { DefaultTheme } from 'styled-components';

export enum ThemeNames {
  Dark = 'Dark',
  Light = 'Light',
}

interface Themes {
  [ThemeNames.Dark]: DefaultTheme;
  [ThemeNames.Light]: DefaultTheme;
}

const themes: Themes = {
  [ThemeNames.Dark]: {
    colors: {
      primary: '#222328',
      primaryLight: '#4d4e53',
      primaryHighlight: '#f7f7f7',
      result: '#7eb24f',
      text: '#dfdedf',
      error: '#942e2e',
      editor: {
        primary: 'white',
        separator: '#4d4e53',
      },
    },
  },
  [ThemeNames.Light]: {
    colors: {
      primary: '#ffffff',
      primaryLight: '#cccccc',
      primaryHighlight: '#060606',
      result: '#7eb24f',
      text: '#060606',
      error: '#942e2e',
      editor: {
        primary: '#282c34',
        separator: '#cccccc',
      },
    },
  },
};

export default themes;
