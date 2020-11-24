import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormWrap } from './style';
import ItemContext from './ItemContext';

const Form = ({ itemProps, ...rest }) => {
    const form = <FormWrap {...rest} />;
    if (itemProps) {
        itemProps = _.pick(itemProps, ['labelCol', 'controllerCol']);
        return <ItemContext.Provider value={itemProps}>{form}</ItemContext.Provider>;
    }
    return form;
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
        controllerCol: PropTypes.object
    })
};
Form.defaultProps = {
    size: 'md'
};

export default React.memo(Form);
