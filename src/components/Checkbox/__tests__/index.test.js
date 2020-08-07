import React from 'react';
import { mount } from 'enzyme';

import Checkbox from 'src/components/Checkbox';

describe('Checkbox', () => {
    const getCheckedStatus = wrapper => {
        if (wrapper.find('span.uc-fe-checkbox-checked').length === 1) {
            return true;
        }
        if (wrapper.find('span.uc-fe-checkbox-checked').length === 0) {
            return false;
        }
        throw new Error('Wrong checkbox rendered');
    };
    test('click default checked', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Checkbox defaultChecked onChange={onChange} />);
        wrapper.simulate('click');
        expect(getCheckedStatus(wrapper)).toBe(false);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(false);

        wrapper.setProps({ disabled: true });
        wrapper.simulate('click');
        expect(getCheckedStatus(wrapper)).toBe(false);
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    test('click default unchecked', () => {
        const wrapper = mount(<Checkbox />);
        wrapper.simulate('click');
    });
    test('click controlled', () => {
        let checkedProps = false;
        const onChange = jest.fn(checked => (checkedProps = checked));
        const wrapper = mount(<Checkbox checked={checkedProps} onChange={onChange} />);
        expect(getCheckedStatus(wrapper)).toBe(false);
        wrapper.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(true);
        expect(getCheckedStatus(wrapper)).toBe(false);
        wrapper.setProps({ checked: checkedProps });
        expect(getCheckedStatus(wrapper)).toBe(true);
    });
});
