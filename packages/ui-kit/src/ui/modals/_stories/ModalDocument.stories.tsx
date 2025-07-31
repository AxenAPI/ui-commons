import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Button, NFileInput } from '@/ui';

import type { NCommonModal } from '../common';
import { Modal } from '../components/Modal';
import { ModalDocument } from '../components/ModalDocument';
import { NModalDocument } from '../components/model.ts';
import { ARG_TYPES, ARGS } from './consts';

const meta: Meta<NCommonModal.TModalProps> = {
  title: 'Axenix UI/Modals/ModalDocument',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  args: ARGS,
};

export default meta;

const Template: StoryFn<NModalDocument.TModalDocument> = ({
  isOpen = false,
  fileSettings,
  ...args
}: NModalDocument.TModalDocument) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [fileListDocument, setFileList] = useState<NFileInput.TUploadFile[]>([]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const getValidDocument5MBSize = (
    file: NFileInput.TRcFile
  ): {
    status?: NFileInput.TUploadFileStatus;
    response?: string;
  } => {
    if (file?.size / 1048576 >= 5) {
      return {
        status: 'error',
        response: 'Максимальный размер файла - 5 МБ.',
      };
    }
    if (fileSettings?.accept) {
      const fileExtensionArray = fileSettings?.accept?.split(', ');
      if (!fileExtensionArray?.includes(file?.name?.replace(/.*(?=\.)/, '').toLowerCase())) {
        return {
          status: 'error',
          response: `Поддерживаемые типы файлов: ${fileSettings?.accept}`,
        };
      }
    }
    return {
      status: 'done',
    };
  };

  const fileSettingsProps: NFileInput.TProps = {
    ...fileSettings,
    onRemove: file => {
      const index = fileListDocument.indexOf(file);
      const newFileList = fileListDocument.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (_, fileList) => {
      const files: NFileInput.TUploadFile[] = fileList?.map(file => {
        const url = URL.createObjectURL(file);
        return {
          ...file,
          originFileObj: file,
          name: file.name,
          url,
          ...getValidDocument5MBSize(file),
        };
      });
      setFileList([...fileListDocument, ...files]);
      return false;
    },
    fileList: fileListDocument,
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Открыть модальное окно</Button>
      <ModalDocument
        {...args}
        okButtonProps={{ isDisabled: !(fileListDocument && fileListDocument?.length > 0) }}
        fileSettings={fileSettingsProps}
        isOpen={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Загрузка документов',
  okText: 'Загрузить',
  cancelText: 'Отмена',
  isOpen: false,
  descriptionFileModal: 'Максимальный размер файла - 5 МБ.',
};

export const ModalChildrenDocument = Template.bind({});
ModalChildrenDocument.args = {
  ...Default.args,
  children:
    'Существующие документы будут обновлены, новые — созданы, а отсутствующие в файле — останутся без изменений',
};

export const ModalFileSettings = Template.bind({});
ModalFileSettings.args = {
  ...Default.args,
  fileSettings: { accept: '.json, .xlsx', isMultiple: true },
  descriptionFileModal: (
    <>
      <div>Максимальный размер файла - 5 МБ.</div>
      <div>{`Поддерживаемые типы файлов: .json, .xlsx`}</div>
    </>
  ),
};
