import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'src/components/Button';
import Menu from 'src/components/Menu';
import Popover from 'src/components/Popover';

import { ActionButton } from './style';

const Size = ['sm', 'md', 'lg'];
export default class ActionList extends Component {
    static propTypes = {
        /** 操作列表 */
        actionList: PropTypes.array.isRequired,
        /** 暴露的操作数量 */
        exposeCount: PropTypes.number,
        /** 控件尺寸 */
        size: PropTypes.oneOf(Size),
        /** 操作数量等于size+1时是否直接显示按钮而不是显示下拉菜单 */
        smart: PropTypes.bool
    };
    static defaultProps = {
        exposeCount: 3,
        size: 'sm',
        smart: true
    };
    state = {};
    renderButtonList = (list, size) => {
        return list.map((info, i) => {
            const { label, onClick, ...rest } = info;
            return (
                <ActionButton key={i} size={size} styleType="border-gray" onClick={onClick} {...rest}>
                    {label}
                </ActionButton>
            );
        });
    };
    renderMenu = (list, size) => {
        if (!list.length) {
            return null;
        }
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
                return (
                    <Menu.Item key={i} onClick={info.onClick}>
                        {info.label}
                    </Menu.Item>
                );
            });
        return (
            <Popover
                trigger={['click']}
                visible={visible}
                onVisibleChange={visible => this.setState({ visible })}
                popup={
                    <Menu selectable={false} onClick={() => this.setState({ visible: false })}>
                        {renderList(list)}
                    </Menu>
                }
            >
                <Button size={size} styleType="border-gray" icon="ellipsis" />
            </Popover>
        );
    };
    render() {
        const { actionList, exposeCount, size, smart, ...rest } = this.props;
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
            <ul {...rest}>
                {this.renderButtonList(buttonList, size)}
                {this.renderMenu(menuList, size)}
            </ul>
        );
    }
}
ActionList.Size = Size;
