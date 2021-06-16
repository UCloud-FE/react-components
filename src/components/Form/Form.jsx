import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

import { FormWrap } from './style';
import ItemPropsWrap from './ItemPropsWrap';

const Form = ({ itemProps, onSubmit, ...rest }) => {
    const { preventFormDefaultAction } = useContext(ConfigContext);
    const handleSubmit = React.useCallback(
        e => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            onSubmit && onSubmit(e);
        },
        [onSubmit]
    );
    return (
        <ItemPropsWrap itemProps={itemProps}>
            <FormWrap onSubmit={preventFormDefaultAction ? handleSubmit : onSubmit} {...rest} />
        </ItemPropsWrap>
    );
};

const Size = ['md', 'lg'];

Form.propTypes = {
    /** @ignore */
    onSubmit: PropTypes.func,
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
