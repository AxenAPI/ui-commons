import { useState } from 'react';

import { CommonModal } from '../common';
import { NModalDocument } from '../components/model.ts';

/**
 * Компонент модального окна с кнопкой открытия.
 * * */
export function ModalButton<
  T extends {
    onClick: NModalDocument.TBtnClickHandler;
  },
>(props: NModalDocument.TModalButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(Boolean(props.initialIsOpen));

  const { Button, buttonProps } = props;

  const handleModalOpen = (e: NModalDocument.TBtnClickEvent) => {
    setIsOpen(true);
    buttonProps.onClick(e);
  };

  const handleCancel = (event: NModalDocument.TBtnClickEvent) => {
    setIsOpen(false);
    props.onCancel?.(event);
  };

  const handleOk = (event: NModalDocument.TBtnClickEvent) => {
    setIsOpen(false);
    props.onOk?.(event);
  };

  return (
    <>
      <Button {...buttonProps} onClick={handleModalOpen} />
      <CommonModal {...props} isOpen={isOpen} onCancel={handleCancel} onOk={handleOk} />
    </>
  );
}
