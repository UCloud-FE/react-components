import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { contentCls } from './style';

const Content = ({ className, ...rest }) => {
    return <div className={classnames(contentCls, className)} {...rest} />;
};
Content.propTypes = {
    /** @ignore */
    className: PropTypes.string
};

export default Content;
