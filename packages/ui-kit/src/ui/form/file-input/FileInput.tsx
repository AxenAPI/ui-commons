import { InboxOutlined } from '@ant-design/icons';

import { Upload } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers';
import { Icon } from '@/ui/utility';

import { NFileInput } from './models';

import styles from './styles.module.css';

export function FileInput({
  shouldShowUploadList,
  shouldOpenFileDialogOnClick,
  isMultiple,
  isDisabled,
  isDirectory,
  className,
  ...restProps
}: NFileInput.TProps) {
  return (
    <Upload
      {...restProps}
      showUploadList={shouldShowUploadList}
      openFileDialogOnClick={shouldOpenFileDialogOnClick}
      multiple={isMultiple}
      disabled={isDisabled}
      directory={isDirectory}
      className={cn(className, { [styles.fileInputDisabled]: isDisabled })}
    />
  );
}

export function FileInputDragger({
  shouldShowUploadList,
  shouldOpenFileDialogOnClick,
  isMultiple,
  isDisabled,
  children,
  isDirectory,
  iconFile,
  titleFile,
  descriptionFile,
  className,
  classNameDragger,
  ...restProps
}: NFileInput.TDraggerProps) {
  const { theme } = useTheme();

  return (
    <Upload.Dragger
      {...restProps}
      className={cn(styles.fileListDragger, className, { [styles.fileInputDisabled]: isDisabled })}
      showUploadList={shouldShowUploadList}
      openFileDialogOnClick={shouldOpenFileDialogOnClick}
      multiple={isMultiple}
      disabled={isDisabled}
      directory={isDirectory}
    >
      {children || (
        <>
          <div className={cn(styles.iconDocument, classNameDragger)}>
            <Icon
              icon={iconFile ?? <InboxOutlined />}
              size={theme.components?.Upload?.uploadIconSize || 48}
              style={{
                display: 'inline-flex',
              }}
              type="primary"
            />
          </div>
          <div className={styles.titleDocument}>{titleFile ?? 'Выберите или перетащите файлы сюда'}</div>
          <div className={styles.descriptionDocument}>{descriptionFile}</div>
        </>
      )}
    </Upload.Dragger>
  );
}

FileInput.Dragger = FileInputDragger;
FileInput.LIST_IGNORE = Upload.LIST_IGNORE;
