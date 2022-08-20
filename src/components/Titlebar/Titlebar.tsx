import React from 'react';
import { appWindow } from '@tauri-apps/api/window';
import CloseIconSVG from './CloseIconSVG';
import MaximizeIconSVG from './MaximizeIconSVG';
import MinimizeIconSVG from './MinimizeIconSVG';
import { Container, Button } from './Titlebar.styles';

const Titlebar = () => (
  <Container data-tauri-drag-region>
    <Button onClick={() => appWindow.minimize()}>
      <MinimizeIconSVG />
    </Button>
    <Button onClick={() => appWindow.toggleMaximize()}>
      <MaximizeIconSVG />
    </Button>
    <Button closeButton onClick={() => appWindow.close()}>
      <CloseIconSVG />
    </Button>
  </Container>
);
export default Titlebar;
