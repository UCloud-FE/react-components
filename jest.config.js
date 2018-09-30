module.exports = {
    setupFiles: ['./tests/setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
    moduleNameMapper: {
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
        '^style/(.*)$': '<rootDir>/src/style/$1',
        '^decorators/(.*)$': '<rootDir>/src/decorators/$1',
        '^stores/(.*)$': '<rootDir>/src/stores/$1',
        '^config$': '<rootDir>/src/config.js',
        '^tests/(.*)$': '<rootDir>/tests/$1',
        '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
        '^src/(.*)$': '<rootDir>/src/$1'
    },
    coverageDirectory: './coverage/',
    coveragePathIgnorePatterns: ['/node_modules/', '/__demo__/']
};
