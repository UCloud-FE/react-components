import React, { useEffect, useState } from 'react';

import useLocale from 'src/components/LocaleProvider/useLocale';
import Loading from 'src/components/Loading';
import Notice from 'src/components/Notice';

import { CascadeData, Key, LoadData } from './interface';
import Item from './Item';
import { emptyCls, errorCls, itemsCls } from './style/cascade';
import LOCALE from './locale/zh_CN';

const Items = ({
    items,
    selectedKey,
    expandedKey,
    disabled,
    parents,
    loadData
}: {
    items?: CascadeData[];
    selectedKey?: Key;
    expandedKey?: Key;
    disabled?: boolean;
    parents?: CascadeData[];
    loadData?: LoadData;
}) => {
    const [initial, setInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const locale = useLocale(LOCALE, 'Cascader');
    useEffect(() => {
        setInitial(false);
    }, []);
    useEffect(() => {
        let exited = false;
        (async () => {
            if (!items && loadData && parents) {
                setLoading(true);
                try {
                    await loadData([...parents?.map(item => item.key)]);
                } catch (error) {
                    if (exited) return;
                    setError(error as Error);
                }
                if (exited) return;
                setLoading(false);
            }
        })();
        return () => {
            exited = true;
        };
    }, [items, loadData, parents]);
    return (
        <Loading loading={loading}>
            {error ? (
                <div className={errorCls}>
                    <Notice styleType="error" closable={false}>
                        {error.message}
                    </Notice>
                </div>
            ) : initial || loading ? (
                <div className={itemsCls}></div>
            ) : !items || !items.length ? (
                <div className={emptyCls}>{locale.emptyTip}</div>
            ) : (
                <div className={itemsCls}>
                    {items.map(item => {
                        const { key: value, disabled: itemDisabled, title, children, isParent } = item;
                        const finalDisabled = disabled || itemDisabled;
                        const selected = value === selectedKey;
                        const expanded = value === expandedKey;
                        return (
                            <Item
                                key={value}
                                value={value}
                                title={title}
                                selected={selected}
                                expanded={expanded}
                                expandAble={isParent || !!children}
                                disabled={finalDisabled}
                                parents={parents}
                            />
                        );
                    })}
                </div>
            )}
        </Loading>
    );
};

export default React.memo(Items);
