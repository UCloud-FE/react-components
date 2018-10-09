import React from 'react';
import { mount } from 'enzyme';

import KEYCODE from 'src/interfaces/KeyCode';
import Input from 'src/components/Input';

describe('Input Search', () => {
    test('search on input', () => {
        const onSearch = jest.fn();
        const onKeyDown = jest.fn();
        const wrapper = mount(<Input.Search onSearch={onSearch} onKeyDown={onKeyDown} />);
        wrapper.find('input').instance().value = 'searchValue';
        wrapper.find('i.icon__search').simulate('click');
        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenLastCalledWith('searchValue');

        wrapper.find('input').instance().value = 'newSearchValue';
        wrapper.find('input').simulate('keydown', { keyCode: KEYCODE['ENTER'] });
        expect(onSearch).toHaveBeenCalledTimes(2);
        expect(onSearch).toHaveBeenLastCalledWith('newSearchValue');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.calls[0][0].keyCode).toBe(KEYCODE['ENTER']);
    });
});
