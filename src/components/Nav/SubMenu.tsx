import * as React from 'react';
import classNames from 'classnames';
import { SubMenu as RcSubMenu } from 'rc-menu';
import { prefixClsTitleContent, prefixClsMenuItem, prefixClsTitleText, prefixClsMenu } from './style';

interface TitleEventEntity {
    key: string;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export { RcSubMenu };

export interface SubMenuProps {
    marginLeft: number;
    className?: string;
    disabled?: boolean;
    level?: number;
    title?: React.ReactNode;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    onTitleClick?: (e: TitleEventEntity) => void;
    onTitleMouseEnter?: (e: TitleEventEntity) => void;
    onTitleMouseLeave?: (e: TitleEventEntity) => void;
    type?: 'normal' | 'small';
    popupClassName?: string;
    children?: React.ReactNode;
}

function SubMenu(props: SubMenuProps) {
    const { icon, title, marginLeft, type = 'normal', ...rest } = props;

    let titleNode: React.ReactNode;

    if (!icon) {
        titleNode = <div className={prefixClsTitleText}>{title}</div>;
    } else {
        titleNode = (
            <div className={classNames(prefixClsTitleContent)}>
                {React.isValidElement(icon) &&
                    React.cloneElement(icon, {
                        className: classNames(
                            React.isValidElement(icon) ? icon.props?.className : '',
                            `${prefixClsMenuItem}-icon`
                        )
                    })}
                <span className={prefixClsTitleText}>{title}</span>
            </div>
        );
    }

    return (
        <div style={{ marginLeft }}>
            <RcSubMenu {...rest} className={classNames(`${prefixClsMenu}-submenu-${type}`)} title={titleNode} />
        </div>
    );
}

export default SubMenu;
