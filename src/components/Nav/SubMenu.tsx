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

    let titleWrapNode: React.ReactNode;

    if (!icon) {
        titleWrapNode = (
            <div className={classNames(prefixClsTitleContent)}>
                <span className={prefixClsTitleText}>
                    {subMenuItemRender ? subMenuItemRender(props, <>{title}</>) : title}
                </span>
            </div>
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

        titleWrapNode = (
            <div className={classNames(prefixClsTitleContent)}>
                {subMenuItemRender ? subMenuItemRender(props, dom) : dom}
            </div>
        );
    }

    return (
        <div style={{ marginLeft }} title={title}>
            <RcSubMenu 
            expandIcon={<SvgIcon className='uc-fe-nav-submenu-arrow' type='triangle-down' />}
             {...rest}  className={classNames(`${prefixClsMenu}-submenu-${type}`)} title={titleWrapNode} />
        </div>
    );
}

export default SubMenu;
