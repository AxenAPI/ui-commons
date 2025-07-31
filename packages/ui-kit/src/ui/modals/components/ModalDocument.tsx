import { useTheme } from '@/providers/theme-provider';
import { FileInput } from '@/ui';

import { CommonModal } from '../common';
import { NModalDocument } from '../components/model.ts';

export function ModalDocument(props: NModalDocument.TModalDocument) {
  const { theme } = useTheme();
  const { fileSettings, descriptionFileModal, titleFileModal, ...modalProps } = props;

  return (
    <CommonModal {...modalProps}>
      {modalProps.children && (
        <div style={{ marginBottom: theme.components?.Modal?.marginSM }}>{modalProps.children}</div>
      )}
      <FileInput.Dragger {...fileSettings} titleFile={titleFileModal} descriptionFile={descriptionFileModal} />
    </CommonModal>
  );
}
