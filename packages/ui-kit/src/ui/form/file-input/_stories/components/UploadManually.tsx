import { useState } from 'react';

import { IconUpload } from '@tabler/icons-react';

import { Button } from '@/ui/buttons';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

export const UploadManually = () => {
  const [fileList, setFileList] = useState<NFileInput.TUploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file as any);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        setFileList([]);
        alert('upload successfully.');
      })
      .catch(() => {
        alert('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: NFileInput.TProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <FileInput {...props}>
        <Button icon={<IconUpload />}>Select File</Button>
      </FileInput>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        isLoading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};
