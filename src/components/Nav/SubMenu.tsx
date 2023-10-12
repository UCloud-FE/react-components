import * as React from 'react';
import classNames from 'classnames';
import { SubMenu as RcSubMenu } from 'rc-menu';
import { prefixClsTitleContent, prefixClsMenuItem, prefixClsTitleText, prefixClsMenu } from './style';
import NavContext from './NavContext';
import { SubMenuProps } from './type';

export { RcSubMenu };

function SubMenu(props: SubMenuProps) {
    const { icon, title, marginLeft, type = 'normal', ...rest } = props;

    const { subMenuItemRender } = React.useContext(NavContext);

    let titleWarpNode: React.ReactNode;

    if (!icon) {
        titleWarpNode = (
            <span className={prefixClsTitleText}>
                {subMenuItemRender ? subMenuItemRender(props, <>{title}</>) : title}
            </span>
        );
    } else {
        const dom = (
            <>
                {React.isValidElement(icon) &&
                    React.cloneElement(icon, {
                        className: classNames(
                            React.isValidElement(icon) ? icon.props?.className : '',
                            `${prefixClsMenuItem}-icon`
                        )
                    })}
                <span className={prefixClsTitleText}>{title}</span>
            </>
        );

        titleWarpNode = (
            <div className={classNames(prefixClsTitleContent)}>
                {subMenuItemRender ? subMenuItemRender(props, dom) : dom}
            </div>
        );
    }

    return (
        <div style={{ marginLeft }}>
            <RcSubMenu {...rest} className={classNames(`${prefixClsMenu}-submenu-${type}`)} title={titleWarpNode} />
        </div>
    );
}

export default SubMenu;
