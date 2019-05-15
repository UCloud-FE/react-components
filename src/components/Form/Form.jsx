import React from 'react';
import PropTypes from 'prop-types';

import { FormWrap } from './style';

const Form = ({ ...rest }) => {
    return <FormWrap {...rest} />;
};

const Size = ['md', 'lg'];

Form.propTypes = {
    /**
     * 配合表单控件的size使用
     */
    size: PropTypes.oneOf(Size)
};
Form.defaultProps = {
    size: 'md'
};

Form.Size = Size;

export default Form;
