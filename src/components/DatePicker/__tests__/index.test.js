import React from 'react';
import { mount } from 'enzyme';
import DatePicker from 'src/components/DatePicker';

describe('DatePicker', () => {
    test('Checking errors in the selected time range and correcting', () => {
        const onChange = jest.fn();
        const testDate = 1712505600000;
        function Demo() {
            return (
                <div>
                    <DatePicker.Range
                        rules={{
                            maxRange: {
                                day: 2
                            }
                        }}
                        defaultValue={[testDate, testDate]}
                        onChange={onChange}
                    />
                </div>
            );
        }
        const RangeComp = mount(<Demo />);
        const startTimeDom = RangeComp.find('.uc-fe-datepicker-range span').at(0).childAt(0).find('input');
        const confirmBtnDom = () => RangeComp.find('.uc-fe-datepicker-footer .uc-fe-button').at(0);
        startTimeDom.simulate('click'); // click start time

        RangeComp.find('.uc-fe-calendar-tbody > .uc-fe-calendar-row')
            .at(0)
            .find('.uc-fe-calendar-cell')
            .at(4)
            .simulate('click'); // click April 1st
        confirmBtnDom().simulate('click'); // click the confirm button
        expect(RangeComp.find('.uc-fe-datepicker-footer > .uc-fe-datepicker-tip-error > span').at(0).html()).toBe(
            '<span>超出最大范围</span>'
        );

        startTimeDom.simulate('click'); // click start time
        RangeComp.find('.uc-fe-calendar-tbody > .uc-fe-calendar-row')
            .at(1)
            .find('.uc-fe-calendar-cell')
            .at(1)
            .simulate('click'); // click April 7th
        confirmBtnDom().simulate('click'); // click the confirm button
        expect(RangeComp.find('.uc-fe-datepicker-footer > span').at(0).html()).toBe('<span></span>');

        const endTimeDom = RangeComp.find('.uc-fe-datepicker-range span').at(0).childAt(1).find('input');
        endTimeDom.simulate('click'); // click end time
        RangeComp.find('.uc-fe-calendar-tbody')
            .at(1)
            .find('.uc-fe-calendar-row')
            .at(1)
            .find('.uc-fe-calendar-cell')
            .at(1)
            .simulate('click'); // click April 7th
        RangeComp.find('.uc-fe-datepicker-footer').at(9).find('.uc-fe-button').at(0).simulate('click');
    });
});
