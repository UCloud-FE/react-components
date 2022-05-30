import React, { Ref, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import KEYCODE from 'src/utils/KeyCode';
import noop from 'src/utils/noop';

import Input, { InputProps, InputRef } from './Input';
import { SearchIcon } from './style';

export interface SearchProps {
    /** 搜索回调，回车/点击搜索按钮触发 */
    onSearch?: (value: string) => void;
}

// eslint-disable-next-line react/display-name
const Search = forwardRef(
    ({ onSearch: _onSearch, onKeyDown, disabled, ...rest }: SearchProps & InputProps, ref: Ref<InputRef>) => {
        const inputRef = useRef<InputRef>(null);
        const onSearch = useCallback(() => {
            !disabled &&
                _onSearch &&
                _onSearch((inputRef.current && inputRef.current.input && inputRef.current.input.value) || '');
        }, [_onSearch, disabled]);
        useImperativeHandle(ref, () => inputRef.current || { focus: noop, input: null }, []);
        return (
            <Input
                {...rest}
                onKeyDown={e => {
                    if (e.keyCode === KEYCODE['ENTER']) {
                        onSearch();
                        e.preventDefault();
                    }
                    if (onKeyDown) {
                        onKeyDown(e);
                    }
                }}
                disabled={disabled}
                ref={inputRef}
                suffix={<SearchIcon type="search" onClick={onSearch} />}
            />
        );
    }
);

export default React.memo(Search);
