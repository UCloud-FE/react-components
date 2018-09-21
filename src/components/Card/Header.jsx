import React from 'react';
import PropTypes from 'prop-types';

import { HeaderWrap, CommentWrap } from './style';

const Header = ({ comment, children, ...rest }) => {
    return (
        <HeaderWrap {...rest}>
            <div>{children}</div>
            <CommentWrap>{comment}</CommentWrap>
        </HeaderWrap>
    );
};

Header.propTypes = {
    /** 小标题，注解 */
    comment: PropTypes.node,
    /** @ignore */
    children: PropTypes.node
};

export default Header;
