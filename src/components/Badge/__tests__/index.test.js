import React from 'react';
import { mount } from 'enzyme';

import Badge from 'src/components/Badge';

describe('Badge', () => {
    test('max value useful', () => {
        const wrapper = mount(<Badge value={100} />);
        expect(wrapper.html().indexOf('99+') >= 0).toBe(true);
    });
});
