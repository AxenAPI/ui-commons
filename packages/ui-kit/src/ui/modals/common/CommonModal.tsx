import { IconX } from '@tabler/icons-react';

import { Modal as AntdModal } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers/theme-provider';
import { Button, Icon } from '@/ui';

import styles from '../styles.module.css';
import { type NCommonModal } from './models';
import { getMapColorsIcon } from './utils';

export function CommonModal({ okType = 'primary', modalType = 'default', ...props }: NCommonModal.TModalProps) {
  const { theme } = useTheme();
  const iconSize = theme?.components?.Modal?.closeIconSize;

  const renderFooter = () => (
    <>
      {props.cancelText && (
        <Button {...props.cancelButtonProps} key="close" onClick={props.onCancel}>
          {props.cancelText}
        </Button>
      )}
      {props.okText && (
        <Button {...props.okButtonProps} key="ok" type={okType} onClick={props.onOk} isLoading={props.isConfirmLoading}>
          {props.okText}
        </Button>
      )}
    </>
  );

  return (
    <AntdModal
      {...props}
      className={cn(props.className, styles.commonModal, {
        [styles.modalBodyIcon]: !!props.icon,
      })}
      loading={props.isLoading}
      open={props.isOpen}
      closeIcon={props.closeIcon ?? <IconX width={iconSize} height={iconSize} stroke={1.5} />}
      title={
        <div className={styles.titleModal}>
          {props.icon && (
            <Icon
              icon={props.icon}
              size={theme.components?.Modal?.iconSize}
              style={{ marginRight: 8, color: getMapColorsIcon(theme)?.[modalType] }}
            />
          )}
          <div>{props.title}</div>
        </div>
      }
      footer={props.footer ?? renderFooter}
    >
      {props.children}
    </AntdModal>
  );
}
