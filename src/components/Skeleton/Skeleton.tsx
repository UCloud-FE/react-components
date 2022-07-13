import React, { HTMLAttributes, useMemo } from 'react';

import { contentCls, SWrap } from './style';

interface SkeletonProps {
    /** 是否开启动画 */
    animation?: boolean;
    /** 章节的行数 */
    rows?: number;
    /** 宽度 */
    width?: string | number;
}

const Skeleton = ({ animation, rows = 1, ...rest }: SkeletonProps & HTMLAttributes<HTMLDivElement>) => {
    const content = useMemo(
        () => (
            <>
                {new Array(Math.max(rows, 1)).fill(null).map((_, i) => {
                    return <p key={i}></p>;
                })}
            </>
        ),
        [rows]
    );
    return (
        <SWrap {...rest} animation={animation}>
            <div className={contentCls}>{content}</div>
        </SWrap>
    );
};

export default Skeleton;
