import React, { ReactNode, Ref, MouseEvent, useCallback, useImperativeHandle, useMemo, useState } from 'react';

import Menu, { Item as MenuItem } from 'src/components/Menu';
import { menuCls, PopupWrap } from './style';

interface Item {
    value: string;
    label?: ReactNode;
}

interface PopupProps {
    options: Item[];
    searchValue: string;
    onChange: (v: string) => void;
    handleSearch?: false | ((item: Item) => boolean);
    loading?: boolean;
}

export interface ListRef {
    moveUp: () => void;
    moveDown: () => void;
    select: () => void;
}

const defaultSearch = (item: Item, searchValue: string) => item?.value?.indexOf(searchValue) >= 0;

const PopupWithOutMemo = React.forwardRef(function Popup(
    { searchValue, options, onChange, handleSearch, loading }: PopupProps,
    ref: Ref<ListRef>
) {
    const searchResult = useMemo(() => {
        if (handleSearch === false) return options || [];
        const filterHandle = typeof handleSearch === 'function' ? handleSearch : defaultSearch;
        const result = options.filter(item => filterHandle(item, searchValue));
        return result;
    }, [handleSearch, options, searchValue]);

    const [index, setIndex] = useState<number | null>(null);
    useImperativeHandle(
        ref,
        () => {
            return {
                moveUp: () => {
                    if (index === null) {
                        setIndex(searchResult.length - 1);
                    } else {
                        setIndex((index + 1) % searchResult.length);
                    }
                },
                moveDown: () => {
                    if (index === null) {
                        setIndex(0);
                    } else {
                        setIndex((index + 1) % searchResult.length);
                    }
                },
                select: () => {
                    if (index === null) return;
                    onChange(searchResult[index].value);
                }
            };
        },
        [index, searchResult, onChange]
    );

    const onSelect = useCallback(
        values => {
            onChange(values[0]);
        },
        [onChange]
    );
    const onMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault();
    }, []);

    if (!searchResult.length) return null;

    return (
        <PopupWrap loading={loading} indicator={null}>
            <Menu
                selectedKeys={[searchValue]}
                onChange={onSelect}
                onMouseDown={onMouseDown}
                customStyle={{ maxHeight: '182px', maxWidth: '800px' }}
                className={menuCls}
            >
                {searchResult.map(item => (
                    <MenuItem itemKey={item.value} key={item.value}>
                        {item.label || item.value}
                    </MenuItem>
                ))}
            </Menu>
        </PopupWrap>
    );
});

export default React.memo(PopupWithOutMemo);
