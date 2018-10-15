import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import sleep from 'tests/shared/sleep';

import Demo from '../__demo__/list';

jest.unmock('rc-trigger');
describe('LocaleProvider', () => {
    test('switch locale', () => {
        const wrapper = mount(<Demo />);
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.instance().setLocale('en_US');
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
    });
    test('Modal', async () => {
        const wrapper = mount(<Demo />);
        wrapper.find('button.demo-alert-btn').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelector('.uc-fe-modal-wrap').outerHTML).toMatchSnapshot();
        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);
        wrapper.find('button.demo-confirm-btn').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelector('.uc-fe-modal-wrap').outerHTML).toMatchSnapshot();
        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);

        wrapper.instance().setLocale('en_US');
        wrapper.find('button.demo-alert-btn').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelector('.uc-fe-modal-wrap').outerHTML).toMatchSnapshot();
        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);
        wrapper.find('button.demo-confirm-btn').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelector('.uc-fe-modal-wrap').outerHTML).toMatchSnapshot();
    });
});
