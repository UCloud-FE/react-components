import React from 'react';
import { mount } from 'enzyme';
import Button from 'src/components/Button';

describe('Button', () => {
    test('check disabled status', () => {
        const onClick = jest.fn();
        const wrapper = mount(<Button onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);

        wrapper.setProps({ disabled: true });
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
