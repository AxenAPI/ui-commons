import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { IconSearch } from '@tabler/icons-react';

import { Button, useModal } from '@/ui';

import type { NCommonModal } from '../common';
import { Modal } from '../components/Modal';
import { ARG_TYPES, ARGS } from './consts';

const meta: Meta<NCommonModal.TModalProps> = {
  title: 'Axenix UI/Modals/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  args: ARGS,
};

export default meta;

const Template: StoryFn<NCommonModal.TModalProps> = ({ isOpen = false, ...args }: NCommonModal.TModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={handleOpenModal}>Открыть модальное окно</Button>
      <Modal {...args} isOpen={isModalOpen} onOk={handleCloseModal} onCancel={handleCloseModal} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Default Title',
  children: 'Content...',
  okText: 'Ок',
  cancelText: 'Отмена',
  isOpen: false,
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  ...Default.args,
  title: 'Custom Title',
};

export const WithConfirmLoading = Template.bind({});
WithConfirmLoading.args = {
  ...Default.args,
  isConfirmLoading: true,
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  ...Default.args,
  isLoading: true,
};

export const WithCustomFooter = Template.bind({});
WithCustomFooter.args = {
  ...Default.args,
  footer: 'Custom Footer',
};

export const NonClosableOnMaskClick = Template.bind({});
NonClosableOnMaskClick.args = {
  ...Default.args,
  maskClosable: false,
};

export const CenteredModal = Template.bind({});
CenteredModal.args = {
  ...Default.args,
  centered: true,
};

export const IconModal = Template.bind({});
IconModal.args = {
  ...Default.args,
  icon: <IconSearch stroke={1.5} />,
  title: 'Вы действительно хотите применить все изменения которые произошли ?',
  okText: 'Применить',
  okType: 'primary',
  okButtonProps: {
    isDanger: true,
  },
};

export const IconModalType = Template.bind({});
IconModalType.args = {
  ...Default.args,
  icon: <IconSearch stroke={1.5} />,
  title: 'Вы действительно хотите применить все изменения которые произошли ?',
  okText: 'Применить',
  okType: 'primary',
  modalType: 'success',
};

export const ShowUseModal = (args: NCommonModal.TModalProps) => {
  const simpleUseModal = useModal();

  const handleOpenModal = async () => {
    await simpleUseModal(args);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Открыть модальное окно</Button>
    </>
  );
};
ShowUseModal.args = {
  ...Default.args,
  icon: <IconSearch stroke={1.5} />,
  title: 'Успех!',
  children: 'Успешное открытие useModal',
  okText: 'OK',
  okType: 'primary',
  modalType: 'success',
};
