import React from 'react';
import { mount } from 'enzyme';
import Tabs from 'src/components/Tabs';

const { Pane } = Tabs;

describe('Tabs', () => {
    test('default key', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Tabs onChange={onChange} defaultActiveKey="2">
                <Pane tab="Tab1" key="1" />
                <Pane tab="Tab2" key="2" />
            </Tabs>
        );
        const children = wrapper.find('.uc-fe-tabs-tab');
        expect(children.at(1).hasClass('uc-fe-tabs-tab-active')).toBe(true);
        children.at(0).simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.find('.uc-fe-tabs-tab').at(0).hasClass('uc-fe-tabs-tab-active')).toBe(true);
    });

    test('controlled key', () => {
        let activeKey = '1';
        const onChange = jest.fn(value => (activeKey = value));
        const wrapper = mount(
            <Tabs onChange={onChange} activeKey={activeKey}>
                <Pane tab="Tab1" key="1" />
                <Pane tab="Tab2" key="2" />
            </Tabs>
        );
        const children = wrapper.find('.uc-fe-tabs-tab');
        expect(children.at(0).hasClass('uc-fe-tabs-tab-active')).toBe(true);

        children.at(1).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith('2');
        expect(activeKey).toBe('2');
        wrapper.setProps({ activeKey });
        expect(wrapper.find('.uc-fe-tabs-tab').at(1).hasClass('uc-fe-tabs-tab-active')).toBe(true);
    });
});
