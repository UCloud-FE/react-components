import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import Pagination from 'src/components/Pagination';

jest.unmock('rc-trigger');
describe('Pagination', () => {
    test('click and keyboard', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Pagination total={100} onChange={onChange} />);

        expect(wrapper.find('li').length).toBe(9);

        wrapper
            .find('li')
            .at(1)
            .simulate('click');
        expect(onChange).toHaveBeenCalledTimes(0);

        wrapper
            .find('li')
            .at(2)
            .simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2, 10);

        wrapper.find('.uc-fe-pagination-prev').simulate('click');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith(1, 10);

        wrapper.find('.uc-fe-pagination-next').simulate('click');
        expect(onChange).toHaveBeenCalledTimes(3);
        expect(onChange).toHaveBeenLastCalledWith(2, 10);

        wrapper.find('.uc-fe-pagination-jump-next').simulate('click');
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(onChange).toHaveBeenLastCalledWith(7, 10);

        wrapper.find('.uc-fe-pagination-jump-prev').simulate('click');
        expect(onChange).toHaveBeenCalledTimes(5);
        expect(onChange).toHaveBeenLastCalledWith(2, 10);

        wrapper
            .find('.uc-fe-pagination-prev')
            .simulate('focus')
            .simulate('keyPress', { key: 'Enter' });
        expect(onChange).toHaveBeenCalledTimes(6);
        expect(onChange).toHaveBeenLastCalledWith(1, 10);

        wrapper
            .find('.uc-fe-pagination-next')
            .simulate('focus')
            .simulate('keyPress', { key: 'Enter' });
        expect(onChange).toHaveBeenCalledTimes(7);
        expect(onChange).toHaveBeenLastCalledWith(2, 10);

        wrapper
            .find('.uc-fe-pagination-jump-next')
            .simulate('focus')
            .simulate('keyPress', { key: 'Enter' });
        expect(onChange).toHaveBeenCalledTimes(8);
        expect(onChange).toHaveBeenLastCalledWith(7, 10);

        wrapper
            .find('.uc-fe-pagination-jump-prev')
            .simulate('focus')
            .simulate('keyPress', { key: 'Enter' });
        expect(onChange).toHaveBeenCalledTimes(9);
        expect(onChange).toHaveBeenLastCalledWith(2, 10);

        wrapper
            .find('li')
            .at(1)
            .simulate('focus')
            .simulate('keyPress', { key: 'Enter' });
        expect(onChange).toHaveBeenCalledTimes(10);
        expect(onChange).toHaveBeenLastCalledWith(1, 10);
    });

    test('readonly warn', () => {
        const warn = (global.console.warn = jest.fn());
        mount(<Pagination current={1} total={100} />);

        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenLastCalledWith(
            'Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'
        );
    });

    test('change pagesize', () => {
        const onPageSizeChange = jest.fn();
        const wrapper = mount(
            <Pagination
                pageSize={10}
                showSizeChanger
                onPageSizeChange={onPageSizeChange}
                total={100}
                optionsProps={{ select: { popover: { getPopupContainer: () => document.body } } }}
            />
        );

        expect(wrapper.find('li').length).toBe(10);
        wrapper.setProps({
            pageSize: 30
        });
        expect(wrapper.find('li').length).toBe(7);

        wrapper
            .find('div.uc-fe-pagination-options-size-changer')
            .at(0)
            .childAt(0)
            .simulate('click');
        expect(document.querySelectorAll('.uc-fe-popover').length).toBe(1);
        expect(document.querySelectorAll('.uc-fe-popover.uc-fe-popover-hidden').length).toBe(0);
        expect(document.querySelectorAll('div.uc-fe-popover>div>div>div').length).toBe(4);

        document.querySelectorAll('div.uc-fe-popover>div>div>div')[1].click();

        expect(onPageSizeChange).toHaveBeenCalledTimes(1);
        expect(onPageSizeChange).toHaveBeenLastCalledWith(1, 20);

        wrapper.unmount();
    });

    test('quick jumper', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Pagination onChange={onChange} total={100} showQuickJumper={{ goButton: true }} />);

        expect(wrapper.find('input').length).toBe(1);
        wrapper.find('input').instance().value = '2';
        wrapper.find('input').simulate('change', 2);
        wrapper.find('.uc-fe-pagination-options button').simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(2, 10);
    });

    test('hideOnSinglePage', () => {
        const wrapper = mount(<Pagination hideOnSinglePage total={0} />);
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
    });

    test('onAdvise', () => {
        const onAdvise = jest.fn();

        const wrapper = mount(<Pagination current={2} total={100} onAdvise={onAdvise} />);

        expect(onAdvise).toHaveBeenCalledTimes(0);
        wrapper.setProps({
            current: 5,
            total: 50
        });
        expect(onAdvise).toHaveBeenCalledTimes(0);

        wrapper.setProps({
            total: 40
        });
        expect(onAdvise).toHaveBeenCalledTimes(1);
        expect(onAdvise).toHaveBeenCalledWith(4, 10);

        wrapper.setProps({
            current: 5
        });
        expect(onAdvise).toHaveBeenCalledTimes(2);
        expect(onAdvise).toHaveBeenCalledWith(4, 10);

        const onAdvise2 = jest.fn();
        const wrapper2 = mount(<Pagination defaultCurrent={5} total={100} onAdvise={onAdvise2} />);
        wrapper2.setProps({
            total: 30
        });
        expect(onAdvise2).toHaveBeenCalledTimes(1);
        expect(onAdvise2).toHaveBeenCalledWith(3, 10);
    });
});
