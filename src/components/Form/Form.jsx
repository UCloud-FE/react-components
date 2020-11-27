import React from 'react';
import PropTypes from 'prop-types';

import { FormWrap } from './style';
import ItemPropsWrap from './ItemPropsWrap';

const Form = ({ itemProps, ...rest }) => {
    return (
        <ItemPropsWrap itemProps={itemProps}>
            <FormWrap {...rest} />
        </ItemPropsWrap>
    );
};

const Size = ['md', 'lg'];

Form.propTypes = {
    /**
     * 配合表单控件的size使用
     */
    size: PropTypes.oneOf(Size),
    /**
     * 如果存在会在所有包裹的 item 上附加该 props
     */
    itemProps: PropTypes.shape({
        /** 具体见 item 文档 */
        labelCol: PropTypes.object,
        /** 具体见 item 文档 */
        controllerCol: PropTypes.object,
        /** 具体见 item 文档 */
        shareStatus: PropTypes.bool
    })
};
Form.defaultProps = {
    size: 'md'
};

export default React.memo(Form);
