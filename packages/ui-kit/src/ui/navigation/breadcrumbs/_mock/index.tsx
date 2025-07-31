export const MENU_ITEMS = [{ title: 'Ant Design' }, { title: 'Component', className: 'class-1' }];
export const WITH_MENU_ITEMS = [
  { title: 'Ant Design' },
  { title: 'Component', className: 'class-1' },
  {
    title: 'General',
    menu: {
      items: [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              General
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              Layout
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              Navigation
            </a>
          ),
        },
      ],
    },
  },
  {
    title: 'Button',
  },
];
