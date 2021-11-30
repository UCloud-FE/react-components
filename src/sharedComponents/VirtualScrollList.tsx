import React, { HTMLAttributes, ReactNode, useRef } from 'react';

import useVirtualList from 'src/hooks/useVirtualList';

const VirtualScrollList = ({
    children,
    height,
    width,
    ...rest
}: {
    children: ReactNode[];
    height: number;
    width?: number | string;
} & HTMLAttributes<HTMLDivElement>) => {
    const scrollerRef = useRef(null);
    const heightWrapperRef = useRef(null);
    const wrapperRef = useRef(null);
    const [renderChildren, offsetTop] = useVirtualList(scrollerRef, wrapperRef, heightWrapperRef, children, {
        clientHeight: height
    });
    return (
        <div ref={scrollerRef} style={{ maxHeight: height, width, overflowY: 'auto' }} {...rest}>
            <div ref={heightWrapperRef}>
                <div ref={wrapperRef} style={{ transform: `translate(0, ${offsetTop}px)` }}>
                    {renderChildren}
                </div>
            </div>
        </div>
    );
};

export default React.memo(VirtualScrollList);
