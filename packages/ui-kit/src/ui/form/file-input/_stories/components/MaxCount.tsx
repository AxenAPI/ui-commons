import { IconUpload } from '@tabler/icons-react';

import { Button } from '@/ui/buttons';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

export const MaxCount = (argTypes: NFileInput.TProps) => (
  <FileInput {...argTypes}>
    <Button icon={<IconUpload />}>Upload (Max: 3)</Button>
  </FileInput>
);

MaxCount.args = {
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  listType: 'picture',
  maxCount: 3,
  isMultiple: true,
};
