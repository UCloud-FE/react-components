import React from 'react';
import { mount } from 'enzyme';

import Checkbox from 'src/components/Checkbox';

describe('Checkbox', () => {
    const getCheckedStatus = wrapper => {
        if (wrapper.find('i.icon__checkbox-ed').length === 1) {
            return true;
        }
        if (wrapper.find('i.icon__checkbox').length === 1) {
            return false;
        }
        throw new Error('Wrong checkbox rendered');
    };
    test('click default checked', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Checkbox defaultChecked onChange={onChange} />);
        expect(wrapper.find('i.icon__checkbox-ed').length).toBe(1);
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
        expect(wrapper.find('i.icon__checkbox').length).toBe(1);
        wrapper.simulate('click');
        expect(wrapper.find('i.icon__checkbox-ed').length).toBe(1);
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
