const i18nextMock = {
  t: (key: string) => key,
  use: () => i18nextMock,
  init: async () => Promise.resolve(),
};

export default i18nextMock;
