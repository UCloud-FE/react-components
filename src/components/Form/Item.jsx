import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { ItemWrap, LabelWrap, ControllerWrap, tipIconCls, tipContentCls, StatusIcon, Tip } from './style';

const Item = ({ label, children, labelCol, controllerCol, status, tip, ...rest }) => {
    if (typeof tip === 'string' || React.isValidElement(tip)) tip = { content: tip };
    return (
        <ItemWrap {...rest}>
            <LabelWrap {...labelCol}>{label}</LabelWrap>
            <ControllerWrap {...controllerCol}>
                {children}
                {tip ? (
                    <Tip spacing="sm" status={status}>
                        {tip.icon === false ? null : (
                            <div className={tipIconCls}>
                                {tip.icon || tip.icon === null || tip.icon === false ? (
                                    tip.icon
                                ) : (
                                    <StatusIcon status={status} spin={status === 'loading'} />
                                )}
                            </div>
                        )}
                        <div className={tipContentCls}>{tip.content}</div>
                    </Tip>
                ) : null}
            </ControllerWrap>
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
    className: PropTypes.string,
    /** 影响提示的状态/类型、包裹的控件的状态 */
    status: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'loading']),
    /** 提示信息 */
    tip: PropTypes.oneOfType([
        PropTypes.shape({
            /** 自定义提示图标 */
            icon: PropTypes.node,
            /** 提示内容 */
            content: PropTypes.node
        }),
        PropTypes.node
    ])
};

export default memo(Item);
