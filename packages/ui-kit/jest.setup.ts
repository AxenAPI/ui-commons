jest.mock('i18next', () => {
  return {
    use: jest.fn().mockReturnThis(), // Поддержка цепочки вызовов .use()
    init: jest.fn().mockResolvedValue(undefined),
    t: jest.fn((key: string) => key), // Простая функция перевода
    changeLanguage: jest.fn().mockResolvedValue(undefined),
  };
});

const resourcesHandler = {
  get (target: object) {
    return new Proxy(target, resourcesHandler);
  },
  set () {
    return true;
  }
}

jest.mock('virtual:i18next-loader', () => (
  new Proxy<object>({}, resourcesHandler)
), { virtual: true });
