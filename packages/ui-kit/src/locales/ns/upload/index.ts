import { UploadLocale } from 'antd/lib/upload/interface';
import { TFunction } from 'i18next';

const Locale = (t: TFunction<'translation', undefined>): UploadLocale => {
  return {
    uploading: t('upload:uploading'),
    removeFile: t('upload:removeFile'),
    uploadError: t('upload:uploadError'),
    previewFile: t('upload:previewFile'),
    downloadFile: t('upload:downloadFile'),
  };
};

export { Locale };
