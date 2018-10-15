import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Popover from 'components/Popover';
import { getPlacements } from 'components/Popover/placements';
import Collapse from 'components/Collapse';
import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';

import {
    SubMenuTitleWrap,
    SubMenuIcon,
    TitleContentWrap,
    PopupContentWrap,
    PopupWrap,
    SelectAllCheckbox
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
        locale: PropTypes.object
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
            ...rest
        } = this.props;
        const selectAllCheckbox = multiple && (
            <SelectAllCheckbox
                checked={allSelectedStatus === 'ALL'}
                onChange={checked => onMultipleSelect(checked, uid)}
            >
                {locale.selectAll}
            </SelectAllCheckbox>
        );

        return (
            <div {...rest}>
                {styleType === 'collapse' ? (
                    <div>
                        <Collapse.Panel
                            title={({ open }) => (
                                <SubMenuTitleWrap selected={allSelectedStatus !== 'NONE'}>
                                    <TitleContentWrap collapse>
                                        {title}
                                        <SubMenuIcon type={open ? 'up' : 'down'} />
                                    </TitleContentWrap>
                                </SubMenuTitleWrap>
                            )}
                            panelKey={subMenuKey}
                        >
                            {selectAllCheckbox}
                            {renderChildren(children)}
                        </Collapse.Panel>
                    </div>
                ) : (
                    <div>
                        <Popover
                            popup={
                                <PopupWrap>
                                    <PopupContentWrap>
                                        {selectAllCheckbox}
                                        {renderChildren(children)}
                                    </PopupContentWrap>
                                </PopupWrap>
                            }
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            builtinPlacements={placements}
                            placement="rightTop"
                        >
                            <SubMenuTitleWrap selected={allSelectedStatus !== 'NONE'}>
                                <TitleContentWrap>
                                    {title}
                                    <SubMenuIcon type="caret-right" />
                                </TitleContentWrap>
                            </SubMenuTitleWrap>
                        </Popover>
                    </div>
                )}
            </div>
        );
    }
}

SubMenu.isMenuSubMenu = true;

export default SubMenu;
