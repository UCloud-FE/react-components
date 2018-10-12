import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import Demo from '../__demo__/list';

jest.unmock('rc-trigger');
describe('LocaleProvider', () => {
    test('switch locale', () => {
        const wrapper = mount(<Demo />);
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.instance().setLocale('en_US');
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
    });
});
