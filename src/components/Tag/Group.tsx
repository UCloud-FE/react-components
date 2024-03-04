import React, { useState, useLayoutEffect, useRef, useMemo, HTMLAttributes } from 'react';
import useOverflow from 'src/hooks/useOverflow';
import usePopoverConfig from 'src/hooks/usePopoverConfig';
import Popover from 'src/components/Popover';
import Menu from 'src/components/Menu';
import Tag from 'src/components/Tag';
import { SWrap, TagGroupWrapper, TagMoreWapper, TagPopoverWrap, TagMenuWapper } from './style';

let _uid = 0;
const ID_KEY = 'data-urc-tag_list-id';

export type Key = number | string;
export interface TagGroupProps {
    /** @ignore */
    children?: React.ReactNode;
    /**
     * 紧凑型布局
     */
    compact?: boolean;
    /**
     * 暴露的Tag数量
     */
    exposeCount?: number;
    /**
     * 是否自动按照宽度调整展示数量
     *  */
    autoAdjustment?: boolean;
    /** 弹出层的 popover props */
    popoverProps?: any;
}

const TagMenu = ({
    list,
    popoverProps
}: {
    list: React.ReactNode[];
    popoverProps: Pick<TagGroupProps, 'popoverProps'>;
}) => {
    const popoverConfigProps = usePopoverConfig();

    if (!list.length) return null;
    const renderList = (list: React.ReactNode[]) =>
        list.map((info, i) => {
            return <TagPopoverWrap key={i}>{info}</TagPopoverWrap>;
        });
    return (
        <Popover
            trigger={['hover']}
            popup={
                <TagMenuWapper>
                    <Menu selectable={false} customStyle={{ maxHeight: '380px' }}>
                        {renderList(list)}
                    </Menu>
                </TagMenuWapper>
            }
            {...popoverConfigProps}
            {...popoverProps}
        >
            <TagMoreWapper>
                <Tag>+{list.length}</Tag>
            </TagMoreWapper>
        </Popover>
    );
};

const PureTagList = (
    props: TagGroupProps & {
        lens: number;
    }
) => {
    const { children, exposeCount, lens, popoverProps, ...rest } = props;
    const childArray = React.Children.toArray(children);
    const _exposeCount = exposeCount || 0;

    let tagList: React.ReactNode[], menuList: React.ReactNode[];
    if (lens > _exposeCount + 1) {
        tagList = childArray.slice(0, exposeCount);
        menuList = childArray.slice(exposeCount);
    } else {
        tagList = childArray;
        menuList = [];
    }

    return exposeCount === void 0 ? (
        <>{tagList}</>
    ) : (
        <SWrap {...rest} exposeCount={exposeCount} sharedProps={{ size: 'sm' }}>
            {tagList}
            {menuList.length ? <TagMenu list={menuList} popoverProps={popoverProps} /> : null}
        </SWrap>
    );
};
const AutoAdjustmentTagList = (
    props: TagGroupProps & {
        lens: number;
    }
) => {
    const { children, exposeCount: _exposeCount = 3, lens, ...rest } = props;
    const [uid] = useState(() => _uid++);

    const containerRef = useRef<HTMLElement | null>(null);
    useLayoutEffect(() => {
        containerRef.current = document.querySelector(`[${ID_KEY}="${uid}"]`) as HTMLElement;
    }, [uid]);
    const maxCount = useMemo(() => {
        let maxCount = Math.min(lens, Math.max(_exposeCount, 0));

        return maxCount;
    }, [_exposeCount, lens]);

    const [exposeCount] = useOverflow({
        containerRef,
        defaultCount: maxCount,
        maxCount
    });

    return <PureTagList {...rest} lens={lens} children={children} exposeCount={exposeCount} {...{ [ID_KEY]: uid }} />;
};

const Group = (props: TagGroupProps & HTMLAttributes<HTMLDivElement>) => {
    const { autoAdjustment, compact, children, ...rest } = props;
    if (!children) {
        return null;
    }
    const lens = Array.isArray(children) ? children.length : 1;

    return !compact ? (
        <TagGroupWrapper compact={false} {...rest}>
            {autoAdjustment ? (
                <AutoAdjustmentTagList lens={lens} children={children} {...rest} />
            ) : (
                <PureTagList lens={lens} children={children} {...rest} />
            )}
        </TagGroupWrapper>
    ) : (
        <TagGroupWrapper compact={compact} children={children} {...rest} />
    );
};

export default React.memo(Group);
