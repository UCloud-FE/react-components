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
        const onChange = jest.fn();
        const wrapper = mount(
            <Group onChange={onChange}>
                <Radio value={1}>1</Radio>
                <Radio value={2}>1</Radio>
            </Group>
        );
        const children = wrapper.find('span.uc-fe-radio');
        expect(children).toHaveLength(2);
        children.at(0).simulate('click');
        await new Promise(resolve => {
            setTimeout(() => {
                expect(onChange).toHaveBeenCalledTimes(1);
                expect(onChange).toHaveBeenLastCalledWith(1);
                resolve();
            }, 10);
        });

        wrapper.setProps({ disabled: true });
        children.at(1).simulate('click');

        await new Promise(resolve => {
            setTimeout(() => {
                expect(onChange).toHaveBeenCalledTimes(1);
                resolve();
            }, 10);
        });
    });
});
