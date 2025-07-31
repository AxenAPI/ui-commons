import { ReactNode, useEffect, useState } from 'react';

import { Empty } from 'antd';

import { Button, Switch } from '@/ui';

import {
  getItemsPagination,
  getItemsSearch,
  initialTargetKeys,
  items,
  oriTargetKeys,
  TRecordType,
} from '../../_mock/TransferItems';
import { NTransfer } from '../../models';
import { Transfer } from '../../Transfer';

export const Default = (argTypes: NTransfer.TProps): ReactNode => {
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const onChange: NTransfer.TProps['onChange'] = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: NTransfer.TProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys(sourceSelectedKeys.concat(targetSelectedKeys));
  };

  return (
    <Transfer
      {...argTypes}
      dataSource={items}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={item => item.title}
      customNotFoundImage={Empty.PRESENTED_IMAGE_DEFAULT}
    />
  );
};

export const OneWay = (argTypes: NTransfer.TProps): ReactNode => {
  const [targetKeys, setTargetKeys] = useState<React.Key[]>(oriTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  const handleSelectChange: NTransfer.TProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys(sourceSelectedKeys.concat(targetSelectedKeys));
  };

  const handleDisable = (checked: boolean) => {
    setDisabled(checked);
  };

  return (
    <>
      <Transfer
        {...argTypes}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={item => item.title}
        isDisabled={disabled}
        style={{ marginBottom: 16 }}
      />
      <Switch
        style={{ width: '5rem' }}
        unCheckedChildren="disabled"
        checkedChildren="disabled"
        isChecked={disabled}
        onChange={handleDisable}
        onClick={() => {}}
      />
    </>
  );
};

export const Search = (argTypes: NTransfer.TProps): ReactNode => {
  const [mockData, setMockData] = useState<TRecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const getMock = () => {
    const { tempMockData, tempTargetKeys } = getItemsSearch();

    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue: string, option: TRecordType) => option.description.indexOf(inputValue) > -1;

  const handleChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Transfer
      {...argTypes}
      dataSource={mockData}
      isFilterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={item => item.title}
    />
  );
};

export const WithSearchButton = (argTypes: NTransfer.TProps): ReactNode => {
  const [mockData, setMockData] = useState<TRecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const getMock = () => {
    const { tempMockData, tempTargetKeys } = getItemsSearch();

    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue: string, option: TRecordType) => option.description.indexOf(inputValue) > -1;

  const handleChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Transfer
      {...argTypes}
      dataSource={mockData}
      isFilterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={item => item.title}
      withSearchButton
      isShowSearch
    />
  );
};

export const WithOnSearchAction = (argTypes: NTransfer.TProps): ReactNode => {
  const [mockData, setMockData] = useState<TRecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const getMock = () => {
    const { tempMockData, tempTargetKeys } = getItemsSearch();

    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue: string, option: TRecordType) => option.description.indexOf(inputValue) > -1;

  const handleChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Transfer
      {...argTypes}
      dataSource={mockData}
      isFilterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={item => item.title}
      withSearchButton
      isShowSearch
      onSearch={() => {
        alert('Поиск был осуществлен!');
      }}
    />
  );
};

export const Advanced = (argTypes: NTransfer.TProps): ReactNode => {
  const [mockData, setMockData] = useState<TRecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const getMock = () => {
    const { tempMockData, tempTargetKeys } = getItemsSearch();

    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const handleChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  const renderFooter: NTransfer.TProps['footer'] = (_, info) => {
    if (info?.direction === 'left') {
      return (
        <Button size="small" style={{ display: 'flex', margin: 8, marginInlineEnd: 'auto' }} onClick={getMock}>
          Left button reload
        </Button>
      );
    }
    return (
      <Button size="small" style={{ display: 'flex', margin: 8, marginInlineStart: 'auto' }} onClick={getMock}>
        Right button reload
      </Button>
    );
  };

  return (
    <Transfer
      {...argTypes}
      dataSource={mockData}
      isShowSearch
      targetKeys={targetKeys}
      onChange={handleChange}
      render={item => `${item.title}-${item.description}`}
      footer={renderFooter}
    />
  );
};

export const CustomDataSource = (argTypes: NTransfer.TProps): ReactNode => {
  const [mockData, setMockData] = useState<TRecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const getMock = () => {
    const { tempMockData, tempTargetKeys } = getItemsSearch();

    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const handleChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  const renderItem = (item: TRecordType) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel,
      value: item.title,
    };
  };

  return (
    <Transfer {...argTypes} dataSource={mockData} targetKeys={targetKeys} onChange={handleChange} render={renderItem} />
  );
};

export const Pagination = (argTypes: NTransfer.TProps): ReactNode => {
  const [oneWay, setOneWay] = useState(false);
  const [mockData, setMockData] = useState<TRecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  useEffect(() => {
    const { tempMockData, tempTargetKeys } = getItemsPagination();

    setTargetKeys(tempTargetKeys);
    setMockData(tempMockData);
  }, []);

  const onChange: NTransfer.TProps['onChange'] = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <>
      <Transfer
        {...argTypes}
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={onChange}
        render={item => item.title}
        isOneWay={oneWay}
        pagination
      />
      <br />
      <Switch
        unCheckedChildren="one way"
        checkedChildren="one way"
        isChecked={oneWay}
        onChange={setOneWay}
        onClick={() => {}}
      />
    </>
  );
};

export const Status = (argTypes: NTransfer.TProps): ReactNode => {
  return (
    <div>
      <Transfer {...argTypes} status="error" />
      <Transfer {...argTypes} status="warning" isShowSearch />
    </div>
  );
};

Default.args = {
  titles: ['Source', 'Target'],
  dataSource: items,
};

OneWay.args = {
  titles: ['Source', 'Target'],
  isOneWay: true,
  dataSource: items,
};

Search.args = {
  isShowSearch: true,
};

Advanced.args = {
  listStyle: {
    width: 250,
    height: 300,
  },
  operations: ['to right', 'to left'],
};

CustomDataSource.args = {
  listStyle: {
    width: 300,
    height: 300,
  },
};
