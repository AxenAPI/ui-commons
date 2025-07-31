export type TRecordType = {
  key: string;
  title: string;
  description: string;
  disabled?: boolean;
  chosen?: boolean;
};

export const items = Array.from({ length: 20 }).map<TRecordType>((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

export const getItemsSearch = () => {
  const tempTargetKeys = [];
  const tempMockData = [];
  for (let i = 0; i < 20; i++) {
    const data = {
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      chosen: i % 2 === 0,
    };
    if (data.chosen) {
      tempTargetKeys.push(data.key);
    }
    tempMockData.push(data);
  }
  return { tempMockData, tempTargetKeys };
};

export const getItemsPagination = () => {
  const tempTargetKeys = [];
  const tempMockData = [];
  for (let i = 0; i < 200; i++) {
    const data = {
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      chosen: i % 2 === 0,
    };
    if (data.chosen) {
      tempTargetKeys.push(data.key);
    }
    tempMockData.push(data);
  }
  return { tempMockData, tempTargetKeys };
};

export const initialTargetKeys = items.filter(item => Number(item.key) > 10).map(item => item.key);

export const oriTargetKeys = items.filter(item => Number(item.key) % 3 > 1).map(item => item.key);
