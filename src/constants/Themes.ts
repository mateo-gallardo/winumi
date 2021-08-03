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
        comment: '#6c976d',
        variable: '#b3c4d3',
        operator: '#e1e1e1',
        function: '#84b4d2',
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
        comment: '#6c976d',
        variable: '#346da0',
        operator: '#383838',
        function: '#009dff',
        separator: '#cccccc',
      },
    },
  },
};

export default themes;
