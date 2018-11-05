import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import Slider from 'src/components/Slider';
import KeyCode from 'src/interfaces/KeyCode';
import sleep from 'tests/shared/sleep';

jest.unmock('rc-trigger');

describe('Slider', () => {
    test('float', () => {
        const onChange = jest.fn();
        let onChangeCalledTimes = 0;
        const wrapper = mount(<Slider min={0} max={100} step={0.1} onChange={onChange} />);
        const input = wrapper.find('input');

        input.simulate('focus');
        input.simulate('change', { target: { value: '4.11111111' } });
        input.simulate('blur');
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onChange).toHaveBeenCalledWith(4.1);
    });
    test('onLastChange', () => {
        const onChange = jest.fn(v => (currentValue = v));
        const onLastChange = jest.fn();
        let onChangeCalledTimes = 0;
        let onLastChangeCalledTimes = 0;
        let currentValue = 12;
        const wrapper = mount(
            <Slider
                min={10}
                max={1000}
                onChange={onChange}
                onLastChange={onLastChange}
                isSensitive
                defaultValue={currentValue}
            />
        );

        const input = wrapper.find('input');

        expect(input.length).toBe(1);
        input.simulate('focus');

        const testChange = shouldTriggerChange => {
            expect(onChange).toHaveBeenCalledTimes(shouldTriggerChange ? ++onChangeCalledTimes : onChangeCalledTimes);
        };
        const changeAndEnter = (v, matchRule, shouldTriggerChange = true) => {
            input.simulate('change', { target: { value: v } });
            testChange(matchRule && shouldTriggerChange);
            input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
            testChange(!matchRule && shouldTriggerChange);
            expect(onLastChange).toHaveBeenCalledTimes(++onLastChangeCalledTimes);
            expect(`input: ${v}, after press enter, value is: ${currentValue}`).toMatchSnapshot();
        };

        changeAndEnter('13.12312312312');
        changeAndEnter('3.12312312312');
        changeAndEnter('sdasdsa1231(*)@!', false, false);
        changeAndEnter('101001010');
        changeAndEnter('999', true);
        changeAndEnter('950', true);
        changeAndEnter('');
        changeAndEnter(' dsadas --', false, false);

        input.simulate('change', { target: { value: '123' } });
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onLastChange).toHaveBeenCalledTimes(onLastChangeCalledTimes);
        input.simulate('change', { target: { value: '111' } });
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onLastChange).toHaveBeenCalledTimes(onLastChangeCalledTimes);
        input.simulate('change', { target: { value: '213' } });
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onLastChange).toHaveBeenCalledTimes(onLastChangeCalledTimes);
        input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
        expect(onChange).toHaveBeenCalledTimes(onChangeCalledTimes);
        expect(onLastChange).toHaveBeenCalledTimes(++onLastChangeCalledTimes);
        input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
        expect(onChange).toHaveBeenCalledTimes(onChangeCalledTimes);
        expect(onLastChange).toHaveBeenCalledTimes(++onLastChangeCalledTimes);
    });
    test('controlled', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Slider
                min={10}
                max={1000}
                onChange={onChange}
                value={12}
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
        const sliderHandlerStyle = sliderHandler.instance().style;
        expect({ 12: sliderHandlerStyle.left }).toMatchSnapshot();
        wrapper.setProps({
            value: 10
        });
        expect({ 10: sliderHandlerStyle.left }).toMatchSnapshot();
        wrapper.setProps({
            value: 200
        });
        expect({ 200: sliderHandlerStyle.left }).toMatchSnapshot();
        wrapper.setProps({
            value: 210
        });
        expect({ 210: sliderHandlerStyle.left }).toMatchSnapshot();
        wrapper.setProps({
            value: 420
        });
        expect({ 420: sliderHandlerStyle.left }).toMatchSnapshot();
        wrapper.setProps({
            value: 1000
        });
        expect({ 1000: sliderHandlerStyle.left }).toMatchSnapshot();

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

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(24);
        expect({ 1000: sliderHandlerStyle.left }).toMatchSnapshot();
    });
    test('uncontrolled', () => {
        const onChange = jest.fn(v => (currentValue = v));
        let onChangeCalledTimes = 0;
        let currentValue = 12;
        const wrapper = mount(
            <Slider
                min={10}
                max={1000}
                onChange={onChange}
                defaultValue={currentValue}
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
        const sliderHandlerStyle = sliderHandler.instance().style;
        const slider = wrapper.find('div.uc-fe-slider');
        expect(sliderHandler.length).toBe(1);
        expect({ [currentValue]: sliderHandlerStyle.left }).toMatchSnapshot();
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
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onChange).toHaveBeenLastCalledWith(24);
        expect({ [currentValue]: sliderHandlerStyle.left }).toMatchSnapshot();
        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 300,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onChange).toHaveBeenLastCalledWith(1000);
        expect({ [currentValue]: sliderHandlerStyle.left }).toMatchSnapshot();
        slider.simulate('mousedown', {
            type: 'mousedown',
            pageX: 60,
            button: 0,
            stopPropagation() {},
            preventDefault() {},
            target: slider.getDOMNode()
        });
        slider.simulate('mouseup');
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect(onChange).toHaveBeenLastCalledWith(100);
        expect({ [currentValue]: sliderHandlerStyle.left }).toMatchSnapshot();
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
        expect(onChange).toHaveBeenCalledTimes(++onChangeCalledTimes);
        expect({ [currentValue]: sliderHandlerStyle.left }).toMatchSnapshot();
    });
    test('number input', () => {
        const onChange = jest.fn(v => (currentValue = v));
        let onChangeCalledTimes = 0;
        let currentValue = 12;
        const wrapper = mount(
            <Slider
                min={10}
                max={1000}
                onChange={onChange}
                defaultValue={currentValue}
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

        const input = wrapper.find('input');

        expect(input.length).toBe(1);
        input.simulate('focus');

        const changeAndEnter = (v, shouldTriggerChange = true) => {
            input.simulate('change', { target: { value: v } });
            expect(onChange).toHaveBeenCalledTimes(onChangeCalledTimes);
            input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
            expect(onChange).toHaveBeenCalledTimes(shouldTriggerChange ? ++onChangeCalledTimes : onChangeCalledTimes);
            expect(`input: ${v}, after press enter, value is: ${currentValue}`).toMatchSnapshot();
        };

        changeAndEnter('123');
        changeAndEnter('124', false);
        changeAndEnter('1001');
        changeAndEnter('123');
        changeAndEnter('12');
        changeAndEnter('44');
        changeAndEnter('75');
        changeAndEnter('280');
        changeAndEnter('1000');
        changeAndEnter('asdsaad');
        changeAndEnter('H#OI!*&', false);
        changeAndEnter('123');
        changeAndEnter('');
        changeAndEnter('123');
        changeAndEnter('   dsada   ');
        changeAndEnter('14.12312312312');
        changeAndEnter('14.12312312312', false);

        wrapper.setProps({
            marks: {}
        });

        changeAndEnter('13.12312312312');
        changeAndEnter('3.12312312312');
        changeAndEnter('sdasdsa1231(*)@!', false);
        changeAndEnter('101001010');
        changeAndEnter('999');
        changeAndEnter('950');
        changeAndEnter('');
        changeAndEnter(' dsadas --', false);
    });
    test('isSensitive', () => {
        const onChange = jest.fn(v => (currentValue = v));
        let onChangeCalledTimes = 0;
        let currentValue = 12;
        const wrapper = mount(
            <Slider
                min={10}
                max={1000}
                onChange={onChange}
                isSensitive
                defaultValue={currentValue}
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

        const input = wrapper.find('input');

        expect(input.length).toBe(1);
        input.simulate('focus');

        const testChange = shouldTriggerChange => {
            expect(onChange).toHaveBeenCalledTimes(shouldTriggerChange ? ++onChangeCalledTimes : onChangeCalledTimes);
        };
        const changeAndEnter = (v, matchRule, shouldTriggerChange = true) => {
            input.simulate('change', { target: { value: v } });
            testChange(matchRule && shouldTriggerChange);
            input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
            testChange(!matchRule && shouldTriggerChange);
            expect(`input: ${v}, after press enter, value is: ${currentValue}`).toMatchSnapshot();
        };

        changeAndEnter('120', true);
        changeAndEnter('124', false, false);
        changeAndEnter('1001');
        changeAndEnter('123');
        changeAndEnter('12', true);
        changeAndEnter('44', true);
        changeAndEnter('75', true);
        changeAndEnter('280', true);
        changeAndEnter('1000', true);
        changeAndEnter('asdsaad', false, true);
        changeAndEnter('H#OI!*&', false, false);
        changeAndEnter('123');
        changeAndEnter('');
        changeAndEnter('123');
        changeAndEnter('   dsada   ');
        changeAndEnter('14.12312312312');
        changeAndEnter('14.12312312312', false, false);

        wrapper.setProps({
            marks: {}
        });

        changeAndEnter('13.12312312312');
        changeAndEnter('3.12312312312');
        changeAndEnter('sdasdsa1231(*)@!', false, false);
        changeAndEnter('101001010');
        changeAndEnter('999', true);
        changeAndEnter('950', true);
        changeAndEnter('');
        changeAndEnter(' dsadas --', false, false);
    });
    test('numberInputTipFormatter', async () => {
        const wrapper = mount(<Slider min={10} defaultValue={10} max={1000} />);

        const input = wrapper.find('input');

        expect(input.length).toBe(1);
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        input.simulate('focus');
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.setProps({
            numberInputTipFormatter: null
        });
        await sleep(500);
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.setProps({
            numberInputTipFormatter: function tip(option) {
                const { currentValue, inputValue, isSensitive } = option;
                return (
                    <span>
                        currentValue: {currentValue}
                        inputValue: {inputValue}
                        isSensitive: {isSensitive + ''}
                    </span>
                );
            }
        });
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        input.simulate('change', { target: { value: 'asdasd' } });
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.setProps({
            isSensitive: true
        });
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
    });
});
