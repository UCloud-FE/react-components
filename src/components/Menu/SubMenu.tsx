import React, { HTMLAttributes, ReactNode, useContext } from 'react';
import classnames from 'classnames';

import Popover from 'src/components/Popover';
import Collapse from 'src/components/Collapse';
import Checkbox from 'src/components/Checkbox';
import { getPlacements } from 'src/components/Popover/placements';
import { Key, useSubGroup } from 'src/hooks/group';
import { Override } from 'src/type';

import {
    selectallWrapCls,
    collapseWrapCls,
    collapseTitleCls,
    popupWrapCls,
    popupContentCls,
    popupTitleCls,
    selectedCls,
    checkboxCls,
    disabledCls,
    PopupMenuWrap,
    SubMenuIcon,
    firstCls,
    lastCls
} from './style';
import MenuContext from './MenuContext';

const placements = getPlacements(0);

export interface SubMenuProps {
    /** 标题内容 */
    title: ReactNode;
    /** 为弹出菜单、或是折叠层 */
    styleType?: 'collapse' | 'popover';
    /** 子菜单的唯一 key，也用作 collapse 的 panel 的 key，不存在时使用 key 代替 */
    subMenuKey?: Key;
    /** 禁用 */
    disabled?: boolean;
    /** @ignore */
    isFirst?: boolean;
    /** @ignore */
    isLast?: boolean;
}

const getPopoverContainer = (triggerNode: Element) => triggerNode.parentNode;

const SubMenu = ({
    title,
    styleType = 'collapse',
    subMenuKey,
    children,
    className,
    disabled,
    isFirst,
    isLast
}: SubMenuProps & Override<HTMLAttributes<HTMLDivElement>, SubMenuProps>) => {
    const menuContext = useContext(MenuContext);
    const [selectedStatus, toggleAllItems] = useSubGroup(subMenuKey || '', menuContext);

    const { multiple, locale } = menuContext;
    const selectAllCheckbox = multiple && (
        <div className={classnames(selectallWrapCls, disabled && disabledCls)}>
            <Checkbox
                size="lg"
                className={checkboxCls}
                checked={selectedStatus === 'ALL'}
                indeterminate={selectedStatus === 'PART'}
                onChange={toggleAllItems}
                disabled={disabled}
            >
                {locale.selectAll}
            </Checkbox>
        </div>
    );
    return styleType === 'collapse' ? (
        <Collapse.Panel
            className={classnames(collapseWrapCls, className, isFirst && firstCls, isLast && lastCls)}
            title={({ open }) => (
                <div className={classnames(collapseTitleCls, selectedStatus !== 'NONE' && selectedCls)}>
                    {title}
                    <SubMenuIcon size="14px" type={open ? 'arrow-up' : 'arrow-down'} />
                </div>
            )}
            panelKey={subMenuKey}
        >
            {selectAllCheckbox}
            {children}
        </Collapse.Panel>
    ) : (
        <Popover
            popup={
                <PopupMenuWrap className={popupWrapCls}>
                    <div className={popupContentCls}>
                        {selectAllCheckbox}
                        {children}
                    </div>
                </PopupMenuWrap>
            }
            getPopupContainer={getPopoverContainer}
            builtinPlacements={placements}
            placement="rightTop"
        >
            <div className={classnames(className, isFirst && firstCls, isLast && lastCls)}>
                <div className={classnames(popupTitleCls, selectedStatus !== 'NONE' && selectedCls)}>
                    {title}
                    <SubMenuIcon type="triangle-right" />
                </div>
            </div>
        </Popover>
    );
};
const MemoSubMenu: ReturnType<typeof React.memo> & { isMenuSubMenu?: true } = React.memo(SubMenu);
MemoSubMenu.isMenuSubMenu = true;

export default MemoSubMenu;
