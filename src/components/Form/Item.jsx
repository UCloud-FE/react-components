import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'src/components/Tooltip';

import ItemContext from './ItemContext';
import ControllerContext from './ControllerContext';
import {
    ItemWrap,
    LabelWrap,
    ControllerWrap,
    tipIconCls,
    tipContentCls,
    StatusIcon,
    Tip,
    RequiredLabel,
    HelpIcon
} from './style';

const Help = React.memo(({ help }) => {
    return help ? (
        <Tooltip
            popup={help}
            align={{
                points: ['bl', 'tl'],
                overflow: { adjustX: 1, adjustY: 1 },
                offset: [-10, -10],
                targetOffset: [0, 0]
            }}
        >
            <HelpIcon type="question-circle" size="14px" />
        </Tooltip>
    ) : null;
});
Help.propTypes = {
    help: PropTypes.node
};

const Item = props => {
    const itemContext = useContext(ItemContext);
    let { label, required, children, labelCol, controllerCol, status, tip, shareStatus, help, ...rest } = {
        ...itemContext,
        ...props
    };

    if (typeof tip === 'string' || React.isValidElement(tip)) tip = { content: tip };
    const item = (
        <ItemWrap {...rest}>
            <LabelWrap {...labelCol}>
                {label}
                {required && <RequiredLabel>*</RequiredLabel>}
                <Help help={help} />
            </LabelWrap>
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
    if (shareStatus) {
        return <ControllerContext.Provider value={{ status }}>{item}</ControllerContext.Provider>;
    }
    return item;
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
    /** 表单项的提示描述 */
    help: PropTypes.node,
    /** 表单项是否为必填/必选，仅影响 UI，逻辑必须请看 ZForm rules 的 required */
    required: PropTypes.bool,
    /** @ignore */
    className: PropTypes.string,
    /** 影响提示的状态/类型、包裹的控件的状态 */
    status: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'loading']),
    /** 是否将状态传递给 item 下的表单控件（目前仅 Input 支持部分状态） */
    shareStatus: PropTypes.bool,
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

export default React.memo(Item);
