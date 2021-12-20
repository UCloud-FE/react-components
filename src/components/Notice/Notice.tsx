import React, { ReactNode, useCallback, useEffect, useState, MouseEvent, HTMLAttributes } from 'react';

import Icon from 'src/components/Icon';
import SvgIcon from 'src/components/SvgIcon';
import deprecatedLog from 'src/utils/deprecatedLog';

import { NoticeWrap, iconCls, iconWrapCls, contentCls, actionCls, closeCls } from './style';
import noop from 'src/utils/noop';
import { tuple } from 'src/style';

const deprecatedLogForStyleTypeInfo = deprecatedLog('Notice styleType "info"', '"success"');

export const StyleTypes = tuple('default', 'success', 'warning', 'error', 'disabled');

export type NoticeProps = {
    /** 是否显示关闭按钮 */
    closable?: boolean;
    /** 自定义前置icon，可传入Icon type或者自定义Icon，传入null、false隐藏，默认显示感叹号icon */
    icon?: null | false | string | ReactNode;
    /** 关闭的回调 */
    onClose?: (e: MouseEvent) => void;
    /** 样式类型 */
    styleType?: 'default' | 'success' | 'warning' | 'error' | 'disabled' | 'info';
    /** 自定义操作 */
    action?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Notice = ({
    closable = true,
    icon: _icon,
    children,
    onClose = noop,
    styleType = 'default',
    action,
    ...rest
}: NoticeProps) => {
    const [closed, setClosed] = useState(false);
    const handleClose = useCallback(
        (e: MouseEvent) => {
            setClosed(true);
            onClose(e);
        },
        [onClose]
    );
    useEffect(() => {
        if (styleType === 'info') {
            deprecatedLogForStyleTypeInfo();
        }
    }, [styleType]);
    let icon;
    if (_icon === null || _icon === false) {
        icon = null;
    } else if (typeof _icon === 'string') {
        icon = <Icon className={iconCls} type={_icon} />;
    } else if (React.isValidElement(_icon)) {
        icon = _icon;
    } else {
        icon = <SvgIcon size="15px" className={iconCls} type="exclamation-circle-filled" />;
    }
    return closed ? null : (
        <NoticeWrap {...rest} styleType={styleType}>
            {icon && <span className={iconWrapCls}>{icon}</span>}
            <div className={contentCls}>{children}</div>
            {action && <span className={actionCls}>{action}</span>}
            {closable && (
                <span className={closeCls}>
                    <SvgIcon type="cross" className={iconCls} onClick={handleClose} />
                </span>
            )}
        </NoticeWrap>
    );
};

export default React.memo(Notice);
