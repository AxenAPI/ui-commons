import { useState } from 'react';

import { IconLoader, IconPlus } from '@tabler/icons-react';

import type { GetProp, UploadProps } from 'antd';

import { FileInput } from '../../FileInput';
import { NFileInput } from '../../models';

type TFileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: TFileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: TFileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    alert('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    alert('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const Avatar = (argTypes: NFileInput.TProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as TFileType, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <IconLoader /> : <IconPlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
      <FileInput {...argTypes} listType="picture-card" onChange={handleChange}>
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </FileInput>
      <FileInput {...argTypes} listType="picture-circle" onChange={handleChange}>
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </FileInput>
    </div>
  );
};
Avatar.args = {
  name: 'avatar',
  className: 'avatar-uploader',
  shouldShowUploadList: false,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  beforeUpload: beforeUpload,
};
