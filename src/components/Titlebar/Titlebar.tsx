import React from 'react';
import { appWindow } from '@tauri-apps/api/window';
import CloseIconSVG from './CloseIconSVG';
import MaximizeIconSVG from './MaximizeIconSVG';
import MinimizeIconSVG from './MinimizeIconSVG';
import { Container, Button } from './Titlebar.styles';

const Titlebar = () => {
  const toggleMaximize = async () => {
    const isMaximized = await appWindow.isMaximized();

    if (isMaximized) {
      appWindow.unmaximize();
    } else {
      appWindow.maximize();
    }
  };

  return (
    <Container data-tauri-drag-region>
      <Button onClick={appWindow.minimize}>
        <MinimizeIconSVG />
      </Button>
      <Button onClick={toggleMaximize}>
        <MaximizeIconSVG />
      </Button>
      <Button closeButton onClick={appWindow.close}>
        <CloseIconSVG />
      </Button>
    </Container>
  );
};

export default Titlebar;
