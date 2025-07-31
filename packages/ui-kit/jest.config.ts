import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^antd/es/(.*)$': 'antd/lib/$1', // Принудительно используем CommonJS
    '^.+\\.module\\.(css|scss|sass)$': 'identity-obj-proxy', // Мокаем CSS-модули
    '^.+\\.(css|scss|sass)$': 'identity-obj-proxy', // Мокаем обычные CSS
    '^nanoid$': '<rootDir>/__mocks__/nanoid.js', // Мок для nanoid,
    '^lodash-es$': 'lodash', // Мок для lodash
    '^@axenix/icons/src/icon/custom$': '<rootDir>/__mocks__/iconMock.js', // Мок для иконок
  },
  transformIgnorePatterns: [
    'node_modules/(?!antd|rc-picker)', // Позволяет Jest транспилировать модули antd
    'node_modules/(?!nanoid)', // Позволяет Jest транспилировать модули nanoid
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
