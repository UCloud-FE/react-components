import React from 'react';
import { mount } from 'enzyme';

import Breadcrumb from 'src/components/Breadcrumb';

describe('Breadcrumb', () => {
    test('click', () => {
        const onClick = jest.fn();
        const onBack = jest.fn();

        const wrapper = mount(
            <Breadcrumb>
                <Breadcrumb.BackButton onClick={onBack} />
                <Breadcrumb.Item onClick={onClick}>BreadcrumbItem</Breadcrumb.Item>
                <Breadcrumb.Item onClick={onClick} disabled>
                    BreadcrumbItemDisabled
                </Breadcrumb.Item>
            </Breadcrumb>
        );
        wrapper.find('button.uc-fe-breadcrumb-back-btn').simulate('click');
        expect(onBack).toHaveBeenCalledTimes(1);

        const children = wrapper.find('span.uc-fe-breadcrumb-item');
        children.at(0).simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);

        children.at(1).simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
