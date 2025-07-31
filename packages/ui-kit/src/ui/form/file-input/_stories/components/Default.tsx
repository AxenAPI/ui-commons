import { IconUpload } from '@tabler/icons-react';

import { Button } from '@/ui/buttons';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

export const Default = (argTypes: NFileInput.TProps) => {
  return (
    <FileInput {...argTypes}>
      <Button icon={<IconUpload stroke={1.5} />}>Click to Upload</Button>
    </FileInput>
  );
};

Default.args = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange: (info: NFileInput.TUploadChangeParam<NFileInput.TUploadFile>) => {
    if (info.file.status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      alert(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      alert(`${info.file.name} file upload failed.`);
    }
  },
};
