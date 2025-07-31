import { IconUpload } from '@tabler/icons-react';

import { NFileInput } from '@/ui';
import { Button } from '@/ui/buttons';

import { FileInput } from '../../FileInput';

export const Directory = (argTypes: NFileInput.TProps) => (
  <FileInput {...argTypes}>
    <Button icon={<IconUpload />}>Upload Directory</Button>
  </FileInput>
);

Directory.args = {
  isDirectory: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
};
