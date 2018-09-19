import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'components/Grid';

import { ItemWrap, LabelWrap } from './style';

const Item = ({ label, children, labelCol, controllerCol, ...rest }) => {
    return (
        <ItemWrap {...rest}>
            <LabelWrap {...labelCol}>{label}</LabelWrap>
            <Col {...controllerCol}>{children}</Col>
        </ItemWrap>
    );
};

const colShape = {
    /** 栅格占位格数 */
    span: PropTypes.number,
    /** 栅格向右偏移格数，偏移占位 */
    offset: PropTypes.number,
    /** 栅格向左偏移格数，偏移不占位 */
    pull: PropTypes.number,
    /** 栅格向右偏移格数，偏移不占位 */
    push: PropTypes.number
};

Item.propTypes = {
    /** 表单项标签 */
    label: PropTypes.node,
    /** @ignore */
    children: PropTypes.node,
    /** 标签的col配置 */
    labelCol: PropTypes.shape(colShape),
    /** 控件的col配置 */
    controllerCol: PropTypes.shape(colShape),
    /** @ignore */
    className: PropTypes.string
};

export default Item;
