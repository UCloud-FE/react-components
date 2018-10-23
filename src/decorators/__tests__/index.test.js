import React from 'react';

import uncontrolled from 'src/decorators/uncontrolled';

describe('uncontrolled', () => {
    test('uncontrolled warn', () => {
        const error = (global.console.error = jest.fn());
        @uncontrolled()
        class A extends React.Component {
            render() {
                return <div />;
            }
        }
        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenLastCalledWith('Must have at least one option');
    });
});
