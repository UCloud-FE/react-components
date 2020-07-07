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
        wrapper.unmount();
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
        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);
        wrapper.unmount();
    });
    test('Table', async () => {
        let wrapper = mount(<Demo />);
        // wrapper = wrapper.find('.test-table');
        wrapper.find('.test-table .test-search-input input').instance().value = 'searchValue';
        wrapper.find('.test-table .test-search-input i.icon__search').simulate('click');
        expect(wrapper.find('.test-table .uc-fe-table-title .uc-fe-table-search-tip-wrap').length).toBe(1);
        expect(wrapper.find('.test-table .uc-fe-table-filter i').length).toBe(5);
        wrapper
            .find('.test-table .uc-fe-table-filter i')
            .at(0)
            .simulate('click');
        expect(document.querySelectorAll('body>div>div>.uc-fe-popover').length).toBe(10);
        document.querySelector('body>div>div>.uc-fe-popover').children[0].children[0].children[0].children[0].click();
        expect(
            renderToJson(wrapper.find('.test-table .uc-fe-table-title .uc-fe-table-search-tip-wrap').render())
        ).toMatchSnapshot();

        wrapper.find('.test-table .test-column-config-btn button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelector('.uc-fe-modal-wrap').outerHTML).toMatchSnapshot();
        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);

        wrapper.instance().setLocale('en_US');

        expect(
            renderToJson(wrapper.find('.test-table .uc-fe-table-title .uc-fe-table-search-tip-wrap').render())
        ).toMatchSnapshot();

        wrapper.find('.test-table .test-column-config-btn button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelector('.uc-fe-modal-wrap').outerHTML).toMatchSnapshot();
        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);
    });
    test('Slider', () => {
        const wrapper = mount(<Demo />);
        const slider1 = wrapper.find('div.test-slider');
        const slider2 = wrapper.find('div.test-slider-sensitive');
        const input1 = slider1.find('input');
        const input2 = slider2.find('input');

        input1.simulate('focus');
        expect(renderToJson(slider1.render())).toMatchSnapshot();
        input2.simulate('focus');
        expect(renderToJson(slider2.render())).toMatchSnapshot();

        wrapper.instance().setLocale('en_US');

        input1.simulate('focus');
        expect(renderToJson(slider1.render())).toMatchSnapshot();
        input2.simulate('focus');
        expect(renderToJson(slider2.render())).toMatchSnapshot();
    });
});
