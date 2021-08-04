import React, { MouseEvent, useCallback } from 'react';

interface ExpandIconProps {
    record: any;
    prefixCls: string;
    expandable: any;
    expanded: boolean;
    needIndentSpaced: boolean;
    onExpand: (record: any, e: MouseEvent) => void;
}

const ExpandIcon = ({ expandable, prefixCls, onExpand, needIndentSpaced, expanded, record }: ExpandIconProps) => {
    const handleClick = useCallback(e => onExpand(record, e), [onExpand, record]);
    if (expandable) {
        const expandClassName = expanded ? 'expanded' : 'collapsed';
        return <span className={`${prefixCls}-expand-icon ${prefixCls}-${expandClassName}`} onClick={handleClick} />;
    } else if (needIndentSpaced) {
        return <span className={`${prefixCls}-expand-icon ${prefixCls}-spaced`} />;
    }
    return null;
};

export default React.memo(ExpandIcon);
