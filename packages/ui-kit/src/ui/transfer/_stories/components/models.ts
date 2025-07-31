import { GetProp, TransferProps } from 'antd';

export namespace NTransferData {
  export type TDataType = {
    key: string;
    name: string;
    code: string;
    type: string;
  };

  export type TTransferItem = GetProp<TransferProps, 'dataSource'>[number];
}
