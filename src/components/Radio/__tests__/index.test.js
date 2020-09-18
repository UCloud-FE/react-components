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
        let radioValue = 2;
        const onChange = jest.fn(value => (radioValue = value));
        const wrapper = mount(
            <Group value={radioValue} onChange={onChange}>
                <Radio value={1}>1</Radio>
                <Radio value={2}>1</Radio>
            </Group>
        );
        const children = wrapper.find('span.uc-fe-radio');
        expect(children).toHaveLength(2);
        expect(children.at(1).hasClass('uc-fe-radio-checked')).toBe(true);

        children.at(0).simulate('click');
        // click 后有 防抖 所以做一个延迟
        await new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(1);

        wrapper.setProps({ disabled: true, value: radioValue });
        expect(wrapper.find('span.uc-fe-radio').at(0).hasClass('uc-fe-radio-checked')).toBe(true);

        children.at(1).simulate('click');
        await new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
