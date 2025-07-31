import { IconUpload } from '@tabler/icons-react';

import { Button } from '@/ui/buttons';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

export const DefaultFiles = (argTypes: NFileInput.TProps) => (
  <FileInput {...argTypes}>
    <Button icon={<IconUpload stroke={1.5} />}>Upload</Button>
  </FileInput>
);

DefaultFiles.args = {
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange({ file, fileList }: NFileInput.TUploadChangeParam<NFileInput.TUploadFile>) {
    if (file.status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
};
