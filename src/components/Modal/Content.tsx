import React, { HTMLAttributes, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { InheritProvider } from 'src/components/Popover/ContainerContext';

import { SContent } from './style';

type ContentProps = {
    /** 定义容器最大高度，传入后超过高度会出滚动 */
    maxHeight?: string;
} & HTMLAttributes<HTMLDivElement>;

const Content = ({ ...rest }: ContentProps) => {
    const containerRef = useRef(null);
    const getContainer = useCallback(() => {
        return containerRef.current;
    }, []);
    return (
        <InheritProvider value={{ getPopupContainer: getContainer }}>
            <>
                <div ref={containerRef}></div>
                <SContent {...rest} />
            </>
        </InheritProvider>
    );
};
Content.propTypes = {
    /** @ignore */
    className: PropTypes.string
};

export default Content;
