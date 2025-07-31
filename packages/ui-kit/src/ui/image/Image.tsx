import { FC } from 'react';

import { EyeOutlined } from '@ant-design/icons';

import { Image as AntdImage } from 'antd';

import { NImage } from './models';

import styles from './styles.module.css';

export const Image: FC<NImage.TImageProps> = ({ preview, ...rest }) => {
  const isMaskTextHidden = typeof preview === 'object' ? preview?.isMaskTextHidden : undefined;
  const isMaskHidden = typeof preview === 'object' ? preview?.isMaskHidden : undefined;

  return (
    <AntdImage
      {...rest}
      preview={{
        mask: isMaskHidden ? (
          <></>
        ) : (
          <div className={styles.mask}>
            <EyeOutlined />
            {!isMaskTextHidden && <span className={styles.text}>Предпросмотр</span>}
          </div>
        ),
      }}
      wrapperClassName={styles.image}
    />
  );
};
