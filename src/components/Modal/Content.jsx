import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { InheritProvider } from 'src/components/Popover/ContainerContext';

import { SContent } from './style';

const Content = ({ ...props }) => {
    const containerRef = useRef(null);
    const getContainer = useCallback(() => {
        return containerRef.current;
    }, []);
    return (
        <InheritProvider value={{ getPopupContainer: getContainer }}>
            <>
                <div ref={containerRef}></div>
                <SContent {...props} />
            </>
        </InheritProvider>
    );
};
Content.propTypes = {
    /** 定义容器最大高度，传入后超过高度会出滚动 */
    maxHeight: PropTypes.string,
    /** @ignore */
    className: PropTypes.string
};

export default Content;
