import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from 'components/Menu';

export default class Group extends Component {
    static propTypes = {
        /** 标题内容 */
        title: PropTypes.node,
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        allSelectedStatus: PropTypes.string,
        /** @ignore */
        multiple: PropTypes.bool,
        /** @ignore */
        selectAll: PropTypes.func,
        /** @ignore */
        unselectAll: PropTypes.func,
        /** 子菜单的唯一key，也用作collapse的panel的key */
        groupKey: PropTypes.any
    };

    render() {
        const { groupKey, ...rest } = this.props;
        return <Menu.SubMenu {...rest} subMenuKey={groupKey} />;
    }
}

Group.isMenuSubMenu = true;
