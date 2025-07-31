import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider, useTheme } from '@/providers';

import { CommonModal, NCommonModal } from '../common';

class ModalStateClass {
  container?: HTMLDivElement;
  root?: ReturnType<typeof createRoot>;
  resolve?: (result: boolean) => void;

  reject?: () => void;

  reset() {
    this.resolve = undefined;
    if (this.reject) {
      this.reject();
      this.reject = undefined;
    }
    if (this.root) {
      this.root.unmount();
      this.root = undefined;
    }
    if (this.container) {
      this.container.remove();
    }
  }
}

export const useModal = () => {
  const simpleModalCallback = React.useMemo(() => new ModalStateClass(), []);
  const { theme } = useTheme();
  React.useEffect(
    () => () => {
      simpleModalCallback.reset();
    },
    [simpleModalCallback]
  );

  return (args: NCommonModal.TModalProps) => {
    simpleModalCallback.reset();

    const containerDiv = document.createElement('div');
    document.body.appendChild(containerDiv);
    simpleModalCallback.container = containerDiv;

    simpleModalCallback.root = createRoot(containerDiv);

    simpleModalCallback.root.render(
      <ThemeProvider theme={theme}>
        <CommonModal
          {...args}
          onOk={(e: any) => {
            if (simpleModalCallback.resolve) {
              simpleModalCallback.resolve(true);
            }
            simpleModalCallback.reset();
            args?.onOk?.(e);
          }}
          onCancel={(e: any) => {
            if (simpleModalCallback.resolve) {
              simpleModalCallback.resolve(true);
            }
            simpleModalCallback.reset();
            args?.onCancel?.(e);
          }}
          zIndex={1200}
          isOpen
        />
      </ThemeProvider>
    );
    return new Promise<boolean>((resolve, reject) => {
      simpleModalCallback.reject = reject;
      simpleModalCallback.resolve = resolve;
    });
  };
};
