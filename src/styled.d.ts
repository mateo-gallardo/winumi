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
        comment: string;
        variable: string;
        operator: string;
        function: string;
        separator: string;
      };
    };
  }
}
