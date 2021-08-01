import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryHighlight: string;
      result: string;
      text: string;
      error: string;
      editor: {
        primary: string;
        separator: string;
      };
    };
  }
}
