import React from 'react';
import { mount } from 'enzyme';

import Nav from 'src/components/Nav';

describe('Nav', () => {
    test('Nav onSelect', () => {
        const defaultKeys = ['1'];

        const wrapper = mount(
            <Nav
                defaultSelectedKeys={defaultKeys}
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
        expect(wrapper.find('li.uc-fe-nav-item').at(1).hasClass('uc-fe-nav-item-selected')).toBe(true);
    });
});
