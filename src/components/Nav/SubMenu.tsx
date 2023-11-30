import * as React from 'react';
import classNames from 'classnames';
import { SubMenu as RcSubMenu } from 'rc-menu';
import { prefixClsTitleContent, prefixClsMenuItem, prefixClsTitleText, prefixClsMenu } from './style';
import SvgIcon from 'src/components/SvgIcon';
import NavContext from './NavContext';
import { SubMenuProps } from './type';

export { RcSubMenu };

function SubMenu(props: SubMenuProps) {
    const { icon, title, marginLeft, type = 'normal', ...rest } = props;

    const { subMenuItemRender } = React.useContext(NavContext);

    const iconTitle = icon ? (
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
    ) : (
        <span className={prefixClsTitleText}>{title}</span>
    );

    const titleWrapNode = subMenuItemRender ? (
        React.cloneElement(subMenuItemRender(props, <>{iconTitle}</>), {
            className: prefixClsTitleContent
        })
    ) : (
        <div className={classNames(prefixClsTitleContent)}>{iconTitle}</div>
    );

    return (
        <div style={{ marginLeft }} title={title}>
            <RcSubMenu
                expandIcon={<SvgIcon className="uc-fe-nav-submenu-arrow" type="triangle-down" />}
                {...rest}
                className={classNames(`${prefixClsMenu}-submenu-${type}`)}
                title={titleWrapNode}
            />
        </div>
    );
}

export default SubMenu;
