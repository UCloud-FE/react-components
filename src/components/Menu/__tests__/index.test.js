import React from 'react';
import { mount } from 'enzyme';

import Menu from 'src/components/Menu';

describe('Menu', () => {
    test('uncontrolled defaultSelectedKeys', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <Menu defaultSelectedKeys={['1']} onChange={onChange}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
            </Menu>
        );

        const children = wrapper.find('div.uc-fe-menu-item');
        expect(children).toHaveLength(1);
        expect(children.at(0).hasClass('uc-fe-menu-selected')).toBe(true);

        children.at(0).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('controlled selectedKeys', () => {
        let selectValue = ['1'];
        const onChange = jest.fn(value => (selectValue = value));

        const wrapper = mount(
            <Menu selectedKeys={selectValue} onChange={onChange}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.Item itemKey="3" disabled>
                    Menu 3 disabled
                </Menu.Item>
            </Menu>
        );

        const children = wrapper.find('div.uc-fe-menu-item');
        expect(children).toHaveLength(3);
        expect(children.at(0).hasClass('uc-fe-menu-selected')).toBe(true);

        children.at(1).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(['2']);

        wrapper.setProps({ selectedKeys: ['2'] });
        expect(wrapper.find('div.uc-fe-menu-item').at(1).hasClass('uc-fe-menu-selected')).toBe(true);

        children.at(2).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.find('div.uc-fe-menu-item').at(1).hasClass('uc-fe-menu-selected')).toBe(true);
    });

    test('multiple', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <Menu multiple defaultSelectedKeys={['1']} onChange={onChange}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
            </Menu>
        );

        const children = wrapper.find('div.uc-fe-menu-item');

        children.at(1).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(['1', '2']);
    });

    test('showSelectAll', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <Menu multiple showSelectAll onChange={onChange}>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
                <Menu.Item itemKey="2">Menu 2</Menu.Item>
                <Menu.SubMenu title={'SubMenu 1'}>
                    <Menu.Item itemKey="1-1">Menu 1</Menu.Item>
                    <Menu.Item itemKey="1-2" disabled>
                        Menu 2
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );

        const selectallWrap = wrapper.find('div.uc-fe-menu-selectall-wrap');
        expect(selectallWrap).toHaveLength(1);

        const selectAllCheckbox = selectallWrap.find('span.uc-fe-checkbox');
        selectAllCheckbox.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(['1', '2', '1-1']);

        selectAllCheckbox.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith([]);
    });

    test('block', () => {
        const wrapper = mount(
            <Menu block>
                <Menu.Item itemKey="1">Menu 1</Menu.Item>
            </Menu>
        );

        const blockStyle = wrapper.find('div.uc-fe-block');
        expect(blockStyle).toHaveLength(1);

        wrapper.setProps({ block: false });
        const blockStyle2 = wrapper.find('div.uc-fe-block');
        expect(blockStyle2).toHaveLength(0);
    });
});
