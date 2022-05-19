module.exports = {
    setupFiles: ['./tests/setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^tests/(.*)$': '<rootDir>/tests/$1',
        '^shared/(.*)$': '<rootDir>/shared/$1',
        '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
        '^rc-trigger$': '<rootDir>/src/libs/rc-trigger',
        '^dom-align$': '<rootDir>/src/libs/dom-align'
    },
    testEnvironment: 'jsdom',
    snapshotSerializers: ['jest-emotion/serializer'],
    coverageDirectory: './coverage/',
    coveragePathIgnorePatterns: ['/node_modules/', '/__demo__/']
};
