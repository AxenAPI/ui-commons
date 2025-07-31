import { IconUpload } from '@tabler/icons-react';

import { Button } from '@/ui/buttons';

import { FileInput } from '../../FileInput';
import { NFileInput as N } from '../../models';

export const UploadOnly = (argTypes: N.TProps) => (
  <FileInput {...argTypes}>
    <Button icon={<IconUpload />}>Upload png only</Button>
  </FileInput>
);

UploadOnly.args = {
  beforeUpload: (file: N.TRcFile) => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      alert(`${file.name} is not a png file`);
    }
    return isPNG || FileInput.LIST_IGNORE;
  },
  onChange: (info: N.TUploadChangeParam<N.TUploadFile>) => {
    // eslint-disable-next-line no-console
    console.log(info.fileList);
  },
};
