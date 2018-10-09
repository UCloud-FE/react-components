import deprecatedLog from '../deprecatedLog';

test('deprecatedLog', () => {
    const outputData = {
        log: [],
        warn: [],
        error: []
    };
    const mockConsole = {
        log: (...inputs) => outputData.log.push(inputs),
        warn: (...inputs) => outputData.warn.push(inputs),
        error: (...inputs) => outputData.error.push(inputs)
    };
    global.console.error = jest.fn(mockConsole.error);
    const deprecatedName = 'deprecatedName',
        insteadName = 'insteadName';
    deprecatedLog(deprecatedName, insteadName);
    expect(outputData.error[outputData.error.length - 1]).toEqual([
        `Deprecated: ${deprecatedName} will be deprecated, please use ${insteadName} to replace`
    ]);
});

import generateError from '../generateError';

test('generateError', () => {
    const errorMessage = 'error message';
    const errorName = 'error name';
    const error = generateError(errorMessage, errorName);

    const throwError = () => {
        throw error;
    };
    expect(throwError).toThrow(Error);
    expect(throwError).toThrow(errorMessage);
    expect(error.name).toBe(errorName);
});
