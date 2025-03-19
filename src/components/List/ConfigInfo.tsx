import React from 'react';
import Item from './Item';
import {
    StyledOuterWrapper,
    StyledWrapper,
    configInfoWrapperCls,
    itemWrapperCls,
    itemWrapperInnerCls,
    itemBorderCls,
    StyleSingledWrapper,
    itemWrapperLastLineCls
} from './style';
import { ConfigInfoProps, ItemType } from './typings';

function MultipleItemWrapper({
    item,
    index,
    groupedIndex,
    groupedDataLen,
    styleType,
    customTitleWidth
}: {
    item: ItemType;
    groupedIndex: number;
    index: number;
    groupedDataLen: number;
    styleType: ConfigInfoProps['styleType'];
    customTitleWidth: ConfigInfoProps['customTitleWidth'];
}) {
    const divRef = React.createRef<HTMLDivElement>();
    const [pHeight, setPHeight] = React.useState<number>();
    React.useEffect(() => {
        if (divRef?.current?.offsetHeight) {
            setPHeight(divRef?.current?.offsetHeight);
        }
    }, [divRef?.current?.offsetHeight]);

    return (
        <div
            className={`${itemWrapperCls} ${item?.isCovering ? '' : itemBorderCls}  ${
                groupedIndex + 1 === groupedDataLen ? itemWrapperLastLineCls : ''
            }`}
            key={index}
            ref={divRef}
        >
            <Item {...item} parentHeight={pHeight} customTitleWidth={customTitleWidth} styleType={styleType} />
        </div>
    );
}

function SingleItemWrapper({
    item,
    index,
    len,
    styleType,
    customTitleWidth
}: {
    item: ItemType;
    index: number;
    len: number;
    styleType: ConfigInfoProps['styleType'];
    customTitleWidth: ConfigInfoProps['customTitleWidth'];
}) {
    const divRef = React.createRef<HTMLDivElement>();
    const [pHeight, setPHeight] = React.useState<number>();
    React.useEffect(() => {
        if (divRef?.current?.offsetHeight) {
            setPHeight(divRef?.current?.offsetHeight);
        }
    }, [divRef?.current?.offsetHeight]);
    return (
        <div className={`${itemBorderCls} ${index + 1 === len ? itemWrapperLastLineCls : ''}`} key={index} ref={divRef}>
            <Item
                styleType={styleType}
                key={index}
                {...item}
                parentHeight={pHeight}
                customTitleWidth={customTitleWidth}
            />
        </div>
    );
}
/**
 * ConfigInfo
 * @description 展示配置信息
 */
const ConfigInfo = ({
    styleType,
    dataSource = [],
    col = 1,
    customTitleWidth,
    aligin,
    noBorder,
    ...others
}: ConfigInfoProps) => {
    const len = dataSource.length;

    if (col > 1) {
        const groupedData = [];
        const lineNum = Math.ceil(len / col);
        if (lineNum >= 1 && len >= col) {
            for (let i = 0; i < lineNum; i++) {
                groupedData.push(dataSource.slice(i * col, i * col + col));
            }
        } else {
            const coveringLen = col - len;
            const covering = new Array(coveringLen).fill({
                isCovering: true
            });
            groupedData.push([...dataSource, ...covering]);
        }
        const groupedDataLen = groupedData.length;

        return (
            <StyledOuterWrapper className={configInfoWrapperCls} {...others}>
                <StyledWrapper col={col} noBorder={noBorder}>
                    {groupedData.map((items, i) => (
                        <div className={itemWrapperInnerCls} key={i}>
                            {items.map((item, j) => (
                                <MultipleItemWrapper
                                    item={item}
                                    groupedIndex={i}
                                    index={j}
                                    key={j}
                                    groupedDataLen={groupedDataLen}
                                    styleType={styleType}
                                    customTitleWidth={customTitleWidth}
                                />
                            ))}
                        </div>
                    ))}
                </StyledWrapper>
            </StyledOuterWrapper>
        );
    }

    return (
        <StyleSingledWrapper {...others} noBorder={noBorder}>
            {dataSource.map((item, i) => (
                <SingleItemWrapper
                    item={item}
                    index={i}
                    key={i}
                    len={len}
                    styleType={styleType}
                    customTitleWidth={customTitleWidth}
                />
            ))}
        </StyleSingledWrapper>
    );
};

export default ConfigInfo;
