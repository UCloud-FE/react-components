import React, { ReactNode, useCallback, useMemo } from 'react';

import useLocale from 'src/components/LocaleProvider/useLocale';
import Loading from 'src/components/Loading';
import Notice from 'src/components/Notice';
import VirtualScrollList from 'src/sharedComponents/VirtualScrollList';

import { CascadeData, Key, LoadData } from './interface';
import { dividerCls, emptyCls, errorCls, itemsCls, SCascade } from './style/cascade';
import Items from './Items';
import Item from './Item';
import CascadeContext from './CascadeContext';
import LOCALE from './locale/zh_CN';

const getExpandedItems = (dataSource?: CascadeData[], expandedValue?: string[]) => {
    if (!dataSource) return [];
    let tmpItems: CascadeData[] | void = dataSource;
    const tmpParents: CascadeData[] = [];
    const expandedItems: {
        items?: CascadeData[];
        parents: CascadeData[];
    }[] = [
        {
            items: dataSource,
            parents: [...tmpParents]
        }
    ];
    if (!expandedValue?.length) return expandedItems;
    for (let i = 0; i < expandedValue.length; i++) {
        const expandedKey = expandedValue[i];
        if (!tmpItems) {
            console.error(`ExpandedValue: ${expandedValue} is invalid.`);
            break;
        }
        const item: CascadeData | void = tmpItems.find(item => item.key === expandedKey);
        if (!item) {
            console.error(`ExpandedValue: ${expandedValue} is invalid.`);
            break;
        }
        tmpItems = item.children;
        tmpParents.push(item);
        expandedItems.push({ items: item.children, parents: [...tmpParents] });
    }
    return expandedItems;
};

const flat = (dataSource: CascadeData[] = [], value?: Key[]) => {
    const result: {
        item: CascadeData;
        parents: CascadeData[];
        parentDisabled: boolean;
        selected: boolean;
    }[] = [];

    const isKeyEqual = (key?: Key, match?: Key) => {
        return key != null && key === match;
    };

    const run = (group: CascadeData[], parents: CascadeData[], parentDisabled: boolean, parentSelected: boolean) => {
        group.forEach(item => {
            const { children, isParent, key } = item;
            if (children) {
                run(
                    children,
                    [...parents, item],
                    parentDisabled || !!item.disabled,
                    parentSelected && isKeyEqual(key, value?.[parents.length])
                );
            } else if (isParent) {
                return;
            } else {
                result.push({
                    item,
                    parents,
                    parentDisabled,
                    selected: parentSelected && isKeyEqual(key, value?.[value.length - 1])
                });
            }
        });
    };
    run(dataSource, [], false, true);
    return result;
};

const Wrapper = ({
    onChange,
    onExpand,
    children
}: {
    onChange?: (value: Key[]) => void;
    onExpand?: (expandedValue: Key[]) => void;
    children: ReactNode;
}) => {
    const expandItem = useCallback(
        (expandedKeys: Key[]) => {
            onExpand?.(expandedKeys);
        },
        [onExpand]
    );
    const selectItem = useCallback(
        (selectedKeys: Key[]) => {
            const parentKeys = selectedKeys.slice(0, selectedKeys.length - 1);
            onExpand?.(parentKeys);
            onChange?.(selectedKeys);
        },
        [onChange, onExpand]
    );
    return (
        <CascadeContext.Provider value={{ expandItem, selectItem }}>
            <SCascade>{children}</SCascade>
        </CascadeContext.Provider>
    );
};

type SharedProps = Pick<ArgsType<typeof Wrapper>[0], 'onChange' | 'onExpand'>;

const Cascade = ({
    dataSource,
    value,
    onChange,
    expandedValue,
    onExpand,
    loadData,
    topExtraRender
}: {
    dataSource?: CascadeData[];
    value?: Key[];
    expandedValue: Key[];
    loadData?: LoadData;
    topExtraRender?: (props: { index: number; parents?: CascadeData[]; items?: CascadeData[] }) => React.ReactNode;
} & SharedProps) => {
    const locale = useLocale(LOCALE, 'Cascader');
    const expandedItems = useMemo(() => getExpandedItems(dataSource, expandedValue), [dataSource, expandedValue]);

    if (!dataSource?.length) {
        return (
            <SCascade>
                <div className={emptyCls}>{locale.emptyTip}</div>
            </SCascade>
        );
    }

    return (
        <Wrapper onChange={onChange} onExpand={onExpand}>
            {expandedItems.map(({ items, parents }, index) => {
                return [
                    index > 0 ? <div className={dividerCls} key={`divider-${index}`} /> : null,
                    <Items
                        key={index == 0 ? '__root-items__' : expandedValue?.[index - 1]}
                        items={items}
                        selectedKey={value?.[index]}
                        expandedKey={expandedValue?.[index]}
                        parents={parents}
                        index={index}
                        topExtraRender={topExtraRender}
                        disabled={parents.some(parent => parent.disabled)}
                        loadData={loadData}
                    />
                ];
            })}
        </Wrapper>
    );
};

const KeyFragment = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

const CascadeSearchResult = React.memo(function CascadeSearchResult({
    dataSource,
    value,
    loading,
    empty,
    error,
    onChange,
    onExpand
}: {
    dataSource?: CascadeData[];
    value?: string[];
    loading?: boolean;
    empty?: boolean;
    error?: Error;
} & SharedProps) {
    const items = useMemo(() => flat(dataSource, value), [dataSource, value]);
    const locale = useLocale(LOCALE, 'Cascader');
    const renderItems = useMemo(() => {
        return items.map(({ item, parents, parentDisabled, selected }) => {
            const { key: value, disabled: itemDisabled } = item;
            const finalDisabled = parentDisabled || itemDisabled;
            const finalTitle = [...parents, item].map((item, index) => {
                return [index === 0 ? null : '/', <KeyFragment key={index}>{item.title}</KeyFragment>];
            });
            return (
                <Item
                    key={value}
                    value={value}
                    title={finalTitle}
                    selected={selected}
                    disabled={finalDisabled}
                    parents={parents}
                />
            );
        });
    }, [items]);
    return (
        <Loading loading={loading}>
            <Wrapper onChange={onChange} onExpand={onExpand}>
                {error ? (
                    <div className={errorCls}>
                        <Notice styleType="error" closable={false}>
                            {error.message}
                        </Notice>
                    </div>
                ) : empty ? (
                    <div className={emptyCls}>{locale.emptyTip}</div>
                ) : (
                    <VirtualScrollList height={180} className={itemsCls}>
                        {renderItems}
                    </VirtualScrollList>
                )}
            </Wrapper>
        </Loading>
    );
});

export default React.memo(Cascade);

export { CascadeSearchResult };
