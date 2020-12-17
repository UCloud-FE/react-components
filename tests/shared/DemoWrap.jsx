import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DemoWrap = ({ children, className, title }) => {
    return (
        <>
            {title && <h2 className="demo-title">{title}</h2>}
            <div className={classnames('demo-wrap', className)}>{children}</div>
        </>
    );
};
DemoWrap.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.node
};
export default DemoWrap;
