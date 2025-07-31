import { DragEvent } from 'react';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

export const DragAndDrop = (argTypes: NFileInput.TProps) => {
  return <FileInput.Dragger {...argTypes} />;
};
DragAndDrop.args = {
  name: 'file',
  isMultiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  descriptionFile: 'Поддерживаемые типы файлов: .json, .xml',
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
