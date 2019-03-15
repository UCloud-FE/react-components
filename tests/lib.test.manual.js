const components = require('../dist/main.min.js');
const libComponents = require('../lib/index.js');

describe('Lib Test', () => {
    test('output libs is equal to components', () => {
        expect(Object.keys(components)).toEqual(Object.keys(libComponents));
    });
});
