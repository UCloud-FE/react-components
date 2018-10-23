import React from 'react';
import { mount } from 'enzyme';

import Switch from 'src/components/Switch';

describe('Switch', () => {
    test('Switch click', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Switch onChange={onChange} />);

        wrapper.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(true);
        wrapper.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith(false);

        wrapper.setProps({
            disabled: true
        });

        wrapper.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(2);
    });
});
