import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import KEYCODE from 'src/interfaces/KeyCode';
import Calendar from 'src/components/Calendar';
import { isDateDisabled, getValidDate } from 'src/components/Calendar/utils';

describe('Calendar', () => {
    test('calendar keyboard action', () => {
        const onSelect = jest.fn();
        const onChange = jest.fn();
        const now = moment.now();
        const wrapper = mount(<Calendar onSelect={onSelect} onChange={onChange} />);

        wrapper.instance().focus();
        wrapper.simulate('focus');
        wrapper.simulate('keydown', { keyCode: KEYCODE['ARROW_DOWN'] });
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].toString()).toBe(
            moment(now)
                .add({ day: 7 })
                .toString()
        );
        wrapper.simulate('keydown', { keyCode: KEYCODE['ENTER'] });
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0].toString()).toBe(
            moment(now)
                .add({ day: 7 })
                .toString()
        );
    });
});

describe('Month', () => {
    test('month keyboard action', () => {
        const onSelect = jest.fn();
        const onChange = jest.fn();
        const now = moment.now();
        const wrapper = mount(<Calendar.Month onSelect={onSelect} onChange={onChange} />);

        wrapper.instance().focus();
        wrapper.simulate('focus');
        wrapper.simulate('keydown', { keyCode: KEYCODE['ARROW_DOWN'] });
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].toString()).toBe(
            moment(now)
                .add({ month: 3 })
                .toString()
        );
        wrapper.simulate('keydown', { keyCode: KEYCODE['ENTER'] });
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0].toString()).toBe(
            moment(now)
                .add({ month: 3 })
                .toString()
        );
    });
});

describe('utils', () => {
    test('isDateDisabled', () => {
        const value = moment.now();
        expect(isDateDisabled(value, value)).toBe(false);
        const rules1 = {
            range: [moment(value).add({ days: -7 }), moment(value).add({ days: 7 })]
        };
        expect(
            !!isDateDisabled(
                moment(value).add({
                    days: -7
                }),
                value,
                rules1
            )
        ).toBe(false);
        expect(
            isDateDisabled(
                moment(value).add({
                    days: -8
                }),
                value,
                rules1
            )
        ).toBe(true);
        expect(
            !!isDateDisabled(
                moment(value).add({
                    days: 7
                }),
                value,
                rules1
            )
        ).toBe(false);
        expect(
            isDateDisabled(
                moment(value).add({
                    days: 8
                }),
                value,
                rules1
            )
        ).toBe(true);
    });
    test('getValidDate', () => {
        const value = moment.now();
        const rules1 = {
            range: [moment(value).add({ days: -7 }), moment(value).add({ days: 7 })]
        };
        expect(
            getValidDate(
                moment(value).add({
                    days: -7
                }),
                rules1
            ).toString()
        ).toBe(
            moment(value)
                .add({
                    days: -7
                })
                .toString()
        );
        expect(
            getValidDate(
                moment(value).add({
                    days: -7,
                    hour: -1
                }),
                rules1
            ).toString()
        ).toBe(
            moment(value)
                .add({
                    days: -7
                })
                .toString()
        );

        expect(
            getValidDate(
                moment(value).add({
                    days: 7
                }),
                rules1
            ).toString()
        ).toBe(
            moment(value)
                .add({
                    days: 7
                })
                .toString()
        );
        expect(
            getValidDate(
                moment(value).add({
                    days: 7,
                    hour: 1
                }),
                rules1
            ).toString()
        ).toBe(
            moment(value)
                .add({
                    days: 7
                })
                .toString()
        );
    });
});
