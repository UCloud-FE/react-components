import React, { ReactNode } from 'react';

import Menu from 'src/components/Menu';
import { Key } from 'src/hooks/group';

export interface GroupProps {
    /** 标题内容 */
    title: ReactNode;
    /** 为弹出菜单、或是折叠层 */
    styleType?: 'collapse' | 'popover';
    /** 子菜单的唯一 key，也用作 collapse 的 panel 的 key，不存在时使用 key 代替 */
    groupKey?: Key;
    /** 禁用 */
    disabled?: boolean;
}

const Group = ({ groupKey, ...rest }: GroupProps) => {
    return <Menu.SubMenu {...rest} subMenuKey={groupKey} />;
};

Group.isMenuSubMenu = true;
/**
 * @deprecated
 */
export default Group;
