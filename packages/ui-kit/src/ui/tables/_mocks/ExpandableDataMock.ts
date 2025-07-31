import { NTableDataType } from '../_stories/models';

export const expandableDataMock = Array.from({ length: 100 }).map<NTableDataType.TEditableCellDataType>((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
  order: `order 256 order69 orderorder orderorder. ${i}`,
  size: `size. ${i}`,
  preference: `preference. ${i}`,
  version: null,
}));
