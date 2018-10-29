import React from 'react';
import { mount } from 'enzyme';

import Slider from 'src/components/Slider';

jest.unmock('rc-trigger');

describe('Slider', () => {
    test('marks', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Slider
                min={10}
                max={1000}
                onChange={onChange}
                defaultValue={12}
                marks={{
                    50: {
                        label: '50',
                        step: 2,
                        ratio: 10
                    },
                    100: {
                        label: '100',
                        step: 5,
                        ratio: 10
                    },
                    200: {
                        label: '200',
                        step: 10,
                        ratio: 15
                    },
                    400: {
                        label: '400',
                        step: 20
                    },
                    1000: {
                        label: '1000',
                        step: 50
                    }
                }}
            />
        );

        const sliderHandler = wrapper.find('div.uc-fe-slider-handle');
        const slider = wrapper.find('div.uc-fe-slider');
        expect(sliderHandler.length).toBe(1);
        slider.getDOMNode().getBoundingClientRect = () => ({
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 300
        });
        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 10,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenLastCalledWith(24);
        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 300,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenLastCalledWith(1000);
        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 60,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenLastCalledWith(100);
        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 10,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenLastCalledWith(24);
        expect(onChange).toHaveBeenCalledTimes(4);

        wrapper.setProps({
            value: 10
        });
        expect(sliderHandler.instance().style.left).toBe('0%');
        wrapper.setProps({
            value: 200
        });
        expect(sliderHandler.instance().style.left).toBe('35%');
        wrapper.setProps({
            value: 1000
        });
        expect(sliderHandler.instance().style.left).toBe('100%');

        wrapper.setProps({
            marks: {}
        });

        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 60,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenLastCalledWith((1000 - 10) / 5 + 10);
        expect(onChange).toHaveBeenCalledTimes(5);
    });
});
