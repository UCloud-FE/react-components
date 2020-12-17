import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DemoBlock = ({ children, className, lg, row }) => {
    return (
        <div className={classnames('demo-block', className, lg && 'demo-block-lg', row && 'demo-block-row')}>
            {children}
        </div>
    );
};
DemoBlock.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    lg: PropTypes.bool,
    row: PropTypes.bool
};
export default DemoBlock;
