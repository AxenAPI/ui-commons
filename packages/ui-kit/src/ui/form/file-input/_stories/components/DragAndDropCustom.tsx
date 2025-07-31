import { DragEvent } from 'react';

import { IconInbox } from '@tabler/icons-react';

import { useTheme } from '@/providers';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

export const DragAndDropCustom = (argTypes: NFileInput.TProps) => {
  const { theme } = useTheme();

  return (
    <FileInput.Dragger {...argTypes}>
      <p className="ant-upload-drag-icon">
        {/* TODO: change color to more appropriate */}
        <IconInbox size={50} color={theme.components?.Form?.colorPrimary} />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </p>
    </FileInput.Dragger>
  );
};
DragAndDropCustom.args = {
  name: 'file',
  isMultiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange: (info: NFileInput.TUploadChangeParam<NFileInput.TUploadFile>) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      alert(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      alert(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: DragEvent) {
    // eslint-disable-next-line no-console
    console.log('Dropped files', e.dataTransfer.files);
  },
};
