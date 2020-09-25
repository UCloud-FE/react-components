import React from 'react';
import { mount } from 'enzyme';
import Radio from 'src/components/Radio';

const { Group } = Radio;

describe('Radio', () => {
    const getCheckedStatus = wrapper => {
        if (wrapper.find('span.uc-fe-radio-checked').length === 1) {
            return true;
        }
        if (wrapper.find('span.uc-fe-radio-checked').length === 0) {
            return false;
        }
        throw new Error('Wrong radio rendered');
    };

    test('click default checked', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Radio defaultChecked onChange={onChange} />);
        expect(getCheckedStatus(wrapper)).toBe(true);

        wrapper.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(0);
    });

    test('check controlled', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Radio onChange={onChange} />);
        wrapper.simulate('click');
        expect(getCheckedStatus(wrapper)).toBe(true);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(true);

        wrapper.setProps({
            disabled: true,
            checked: false
        });
        expect(getCheckedStatus(wrapper)).toBe(false);
        wrapper.simulate('click');
        expect(getCheckedStatus(wrapper)).toBe(false);
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('check controlled Group', async () => {
        let radioValue = 1;
        const onChange = jest.fn(value => (radioValue = value));

        const options = [1, 2, 3].map(value => ({
            value,
            label: value
        }));

        const wrapper = mount(<Group options={options} value={radioValue} onChange={onChange} />);
        let children = wrapper.find('span.uc-fe-radio');
        expect(children).toHaveLength(3);
        expect(children.at(0).hasClass('uc-fe-radio-checked')).toBe(true);

        children.at(1).simulate('click');
        // click 后有防抖，所以做一个延迟
        await new Promise(resolve => setTimeout(resolve));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2);

        wrapper.setProps({
            value: radioValue
        });
        children = wrapper.find('span.uc-fe-radio');
        expect(children.at(1).hasClass('uc-fe-radio-checked')).toBe(true);

        wrapper.setProps({
            options: options.map(item => ({
                ...item,
                disabled: item.value === 3
            }))
        });

        children = wrapper.find('span.uc-fe-radio');
        children.at(2).simulate('click');
        await new Promise(resolve => setTimeout(resolve));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2);

        wrapper.setProps({ disabled: true, options });
        children = wrapper.find('span.uc-fe-radio');

        children.at(0).simulate('click');
        await new Promise(resolve => setTimeout(resolve));
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
