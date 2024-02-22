import React from 'react';
import { mount } from 'enzyme';

import Nav from 'src/components/Nav';

describe('Nav', () => {
    test('controlled selectedKeys', () => {
        let selectValue = ['1'];
        const onChange = jest.fn(value => (selectValue = value));

        const wrapper = mount(
            <Nav
                selectedKeys={selectValue}
                onSelect={({ key }) => {
                    onChange(key);
                }}
                items={[
                    {
                        key: '1',
                        label: 'title1'
                    },
                    {
                        key: '2',
                        labelType: 'small',
                        label: 'title2'
                    },
                    {
                        key: '3',
                        labelType: 'small',
                        label: 'title3'
                    }
                ]}
            />
        );

        const children = wrapper.find('li.uc-fe-nav-item');
        expect(children).toHaveLength(3);
        expect(children.at(0).hasClass('uc-fe-nav-item-selected')).toBe(true);

        children.at(1).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith('2');

        wrapper.setProps({ selectedKeys: ['2'] });
        expect(wrapper.find('li.uc-fe-nav-item').at(1).hasClass('uc-fe-nav-item-selected')).toBe(true);

        children.at(2).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(wrapper.find('li.uc-fe-nav-item').at(1).hasClass('uc-fe-nav-item-selected')).toBe(true);
    });
});
