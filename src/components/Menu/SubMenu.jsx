import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Popover from 'src/components/Popover';
import { getPlacements } from 'src/components/Popover/placements';
import Collapse from 'src/components/Collapse';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import Checkbox from 'src/components/Checkbox';

import {
    PopupMenuWrap,
    selectallWrapCls,
    collapseWrapCls,
    collapseTitleCls,
    popupWrapCls,
    popupContentCls,
    popupTitleCls,
    selectedCls,
    checkboxCls,
    SubMenuIcon
} from './style';
import LOCALE from './locale/zh_CN';

const placements = getPlacements(0);

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Menu' })
class SubMenu extends Component {
    static propTypes = {
        /** 标题内容 */
        title: PropTypes.node,
        /** 为弹出菜单、或是折叠层 */
        styleType: PropTypes.oneOf(['collapse', 'popover']),
        /** 子菜单的唯一key，也用作collapse的panel的key */
        subMenuKey: PropTypes.any,
        /** @ignore */
        uid: PropTypes.string,
        /** @ignore */
        multiple: PropTypes.bool,
        /** @ignore */
        allSelectedStatus: PropTypes.string,
        /** @ignore */
        onMultipleSelect: PropTypes.func,
        /** @ignore */
        renderChildren: PropTypes.func,
        /** @ignore */
        children: PropTypes.node,
        /** @ignore */
        locale: PropTypes.object,
        /** @ignore */
        className: PropTypes.string
    };
    static defaultProps = {
        styleType: 'collapse'
    };

    render() {
        const {
            title,
            styleType,
            subMenuKey,
            uid,
            multiple,
            allSelectedStatus,
            onMultipleSelect,
            renderChildren,
            children,
            locale,
            className
        } = this.props;
        const selectAllCheckbox = multiple && (
            <div className={selectallWrapCls}>
                <Checkbox
                    size="lg"
                    className={checkboxCls}
                    checked={allSelectedStatus === 'ALL'}
                    indeterminate={allSelectedStatus === 'PART'}
                    onChange={checked => onMultipleSelect(checked, uid)}
                >
                    {locale.selectAll}
                </Checkbox>
            </div>
        );
        return styleType === 'collapse' ? (
            <Collapse.Panel
                className={classnames(collapseWrapCls, className)}
                title={({ open }) => (
                    <div className={classnames(collapseTitleCls, allSelectedStatus !== 'NONE' && selectedCls)}>
                        {title}
                        <SubMenuIcon type={open ? 'up' : 'down'} />
                    </div>
                )}
                panelKey={subMenuKey}
            >
                {selectAllCheckbox}
                {renderChildren(children)}
            </Collapse.Panel>
        ) : (
            <Popover
                popup={
                    <PopupMenuWrap className={popupWrapCls}>
                        <div className={popupContentCls}>
                            {selectAllCheckbox}
                            {renderChildren(children)}
                        </div>
                    </PopupMenuWrap>
                }
                getPopupContainer={triggerNode => triggerNode.parentNode}
                builtinPlacements={placements}
                placement="rightTop"
            >
                <div className={className}>
                    <div className={classnames(popupTitleCls, allSelectedStatus !== 'NONE' && selectedCls)}>
                        {title}
                        <SubMenuIcon type="caret-right" />
                    </div>
                </div>
            </Popover>
        );
    }
}

SubMenu.isMenuSubMenu = true;

export default SubMenu;
