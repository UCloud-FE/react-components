import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'src/components/Button';
import Menu from 'src/components/Menu';
import Popover from 'src/components/Popover';
import Tooltip from 'src/components/Tooltip';
import Combine from 'src/components/Combine';
import ConfigContext from 'src/components/ConfigProvider/ConfigContext';
import SvgIcon from 'src/components/SvgIcon';

import { prefixCls } from './style';

const SubMenuItem = ({ onClick, disabled, handleHide, ...rest }) => {
    const clickHandler = React.useCallback(
        (...args) => {
            if (disabled) return;
            if (onClick) {
                onClick(...args);
                handleHide();
            }
        },
        [disabled, handleHide, onClick]
    );
    return <Menu.Item onClick={clickHandler} disabled={disabled} {...rest} />;
};
SubMenuItem.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    handleHide: PropTypes.func
};

const Sizes = Button.Sizes;
const ButtonStyleTypes = Button.StyleTypes;
export default class ActionList extends Component {
    static propTypes = {
        /** 操作列表 */
        actionList: PropTypes.array.isRequired,
        /** 暴露的操作数量 */
        exposeCount: PropTypes.number,
        /** 控件尺寸 */
        size: PropTypes.oneOf(Sizes),
        /** 按钮的默认样式类别，参考 Button 的 styleType */
        buttonStyleType: PropTypes.oneOf(ButtonStyleTypes),
        /** 操作数量等于 exposeCount+1 时是否直接显示按钮而不是显示下拉菜单 */
        smart: PropTypes.bool,
        /** 自定义更多按钮内容，也可通过传入 object 来定义 props*/
        dropdownButton: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
        /** 弹出层的 popover props */
        popoverProps: PropTypes.object,
        /** @ignore */
        className: PropTypes.string
    };
    static defaultProps = {
        exposeCount: 3,
        size: 'md',
        buttonStyleType: 'border',
        smart: true
    };
    state = {};
    getPopupContainer = triggerNode => triggerNode.parentNode;
    renderButtonList = (list, size) => {
        const { buttonStyleType } = this.props;
        return list.map((info, i) => {
            const { label, tooltip, ...rest } = info;
            const button = (
                <Button key={i} size={size} styleType={buttonStyleType} fakeDisabled={!!tooltip} {...rest}>
                    {label}
                </Button>
            );
            return tooltip ? (
                typeof tooltip === 'string' || React.isValidElement(tooltip) ? (
                    <Tooltip popup={tooltip} placement="topRight" key={i}>
                        {button}
                    </Tooltip>
                ) : (
                    <Tooltip placement="topRight" key={i} {...tooltip}>
                        {button}
                    </Tooltip>
                )
            ) : (
                button
            );
        });
    };
    toggleMenu = visible => {
        this.setState({
            visible
        });
    };
    hideMenu = () => {
        this.toggleMenu(false);
    };
    renderMenu = (list, size) => {
        if (!list.length) {
            return null;
        }
        const { buttonStyleType, popoverProps, dropdownButton } = this.props;
        const { visible } = this.state;
        const renderList = list =>
            list.map((info, i) => {
                if (info.children) {
                    return (
                        <Menu.SubMenu key={i} styleType="popover" title={info.label}>
                            {renderList(info.children)}
                        </Menu.SubMenu>
                    );
                }
                const { label, disabled, onClick, ...rest } = info;
                return (
                    <SubMenuItem key={i} disabled={disabled} onClick={onClick} handleHide={this.hideMenu} {...rest}>
                        {label}
                    </SubMenuItem>
                );
            });
        return (
            <ConfigContext.Consumer>
                {({ forwardPopupContainer } = {}) => {
                    return (
                        <Popover
                            trigger={['click']}
                            {...popoverProps}
                            visible={visible}
                            onVisibleChange={this.toggleMenu}
                            {...(forwardPopupContainer
                                ? { forwardPopupContainer: this.getPopupContainer }
                                : { getPopupContainer: this.getPopupContainer })}
                            popup={
                                <Menu selectable={false} customStyle={{ maxHeight: '380px' }}>
                                    {renderList(list)}
                                </Menu>
                            }
                        >
                            {dropdownButton ? (
                                typeof dropdownButton === 'string' || React.isValidElement(dropdownButton) ? (
                                    <Button size={size} styleType={buttonStyleType}>
                                        {dropdownButton}
                                    </Button>
                                ) : (
                                    <Button {...dropdownButton} />
                                )
                            ) : (
                                <Button size={size} styleType={buttonStyleType} icon={<SvgIcon type="ellipsis" />} />
                            )}
                        </Popover>
                    );
                }}
            </ConfigContext.Consumer>
        );
    };
    render() {
        /* eslint-disable no-unused-vars */
        const {
            actionList,
            exposeCount,
            size,
            smart,
            buttonStyleType,
            popoverProps,
            dropdownButton,
            className,
            ...rest
        } = this.props;
        /* eslint-enable no-unused-vars */
        const l = actionList.length;
        let buttonList, menuList;
        if (l > exposeCount + 1) {
            buttonList = actionList.slice(0, exposeCount);
            menuList = actionList.slice(exposeCount);
        } else if (l === exposeCount + 1) {
            if (smart) {
                buttonList = actionList;
                menuList = [];
            } else {
                buttonList = actionList.slice(0, exposeCount);
                menuList = actionList.slice(exposeCount);
            }
        } else {
            buttonList = actionList;
            menuList = [];
        }
        return (
            <Combine
                {...rest}
                className={classnames(prefixCls, className)}
                sharedProps={{ size }}
                spacing="smart"
                disabled={false}
            >
                {this.renderButtonList(buttonList, size)}
                {this.renderMenu(menuList, size)}
            </Combine>
        );
    }
}
ActionList.Sizes = Sizes;
ActionList.ButtonStyleTypes = ButtonStyleTypes;
