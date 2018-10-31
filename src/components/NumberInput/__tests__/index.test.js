import React from 'react';
import { mount } from 'enzyme';

import NumberInput from 'src/components/NumberInput';
import KeyCode from 'src/interfaces/KeyCode';

describe('NumberInput', () => {
    test('action', () => {
        const onChange = jest.fn();
        const onNumberChange = jest.fn();
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const onEnter = jest.fn();

        let onNumberChangeCallTimes = 0;

        const wrapper = mount(
            <NumberInput
                className="test-wrapper"
                onChange={onChange}
                onNumberChange={onNumberChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onEnter={onEnter}
            />
        );

        const upHandler = wrapper
            .find('div.test-wrapper>div')
            .at(0)
            .childAt(0);
        upHandler.simulate('mousedown');
        upHandler.simulate('mouseup');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(1);
        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);

        const downHandler = wrapper
            .find('div.test-wrapper>div')
            .at(0)
            .childAt(1);
        downHandler.simulate('mousedown');
        downHandler.simulate('mouseup');

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith(0);
        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);

        const input = wrapper.find('input');
        input.simulate('focus');
        input.simulate('change', { target: { value: 'aaa' } });
        expect(onChange).toHaveBeenLastCalledWith('aaa');
        input.simulate('blur');
        expect(onChange).toHaveBeenLastCalledWith(0);
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(0);

        input.simulate('focus');
        input.simulate('keydown', { keyCode: KeyCode['ARROW_UP'] });
        input.simulate('keyup', { keyCode: KeyCode['ARROW_UP'] });

        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(1);

        input.simulate('keydown', { keyCode: KeyCode['ARROW_UP'] });
        input.simulate('keyup', { keyCode: KeyCode['ARROW_UP'] });

        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(2);

        input.simulate('keydown', { keyCode: KeyCode['ARROW_DOWN'] });
        input.simulate('keyup', { keyCode: KeyCode['ARROW_DOWN'] });

        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(1);

        input.simulate('keydown', { keyCode: KeyCode['ARROW_DOWN'] });
        input.simulate('keyup', { keyCode: KeyCode['ARROW_DOWN'] });

        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(0);

        input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
        input.simulate('keyup', { keyCode: KeyCode['ENTER'] });
        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(0);

        input.simulate('change', { target: { value: 'aaa' } });
        expect(onChange).toHaveBeenLastCalledWith('aaa');
        input.simulate('blur');
        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(0);

        input.simulate('focus');
        input.simulate('change', { target: { value: 'aaa' } });
        expect(onChange).toHaveBeenLastCalledWith('aaa');
        input.simulate('keydown', { keyCode: KeyCode['ENTER'] });
        input.simulate('keyup', { keyCode: KeyCode['ENTER'] });
        expect(onNumberChange).toHaveBeenCalledTimes(++onNumberChangeCallTimes);
        expect(onNumberChange).toHaveBeenLastCalledWith(0);
        input.simulate('blur');

        expect(onEnter).toHaveBeenCalledTimes(2);
    });
});
