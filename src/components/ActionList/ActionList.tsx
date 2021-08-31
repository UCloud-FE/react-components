import React, { HTMLAttributes, MouseEvent, ReactNode, useCallback, useState } from 'react';
import classnames from 'classnames';

import Button from 'src/components/Button';
import Menu from 'src/components/Menu';
import Popover from 'src/components/Popover';
import Tooltip from 'src/components/Tooltip';
import Combine from 'src/components/Combine';
import SvgIcon from 'src/components/SvgIcon';
import { ButtonProps } from 'src/components/Button/Button';
import usePopoverConfig from 'src/hooks/usePopoverConfig';
import { Override, Size } from 'src/type';

import { prefixCls } from './style';

interface SubMenuItemProps {
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
    handleHide?: () => void;
    children: ReactNode;
}

const SubMenuItem = ({ onClick, disabled, handleHide, ...rest }: SubMenuItemProps) => {
    const clickHandler = useCallback(
        (e: MouseEvent) => {
            if (disabled) return;
            if (onClick) {
                onClick(e);
                handleHide?.();
            }
        },
        [disabled, handleHide, onClick]
    );
    return <Menu.Item onClick={clickHandler} disabled={disabled} {...rest} />;
};

interface ActionInfo {
    /** 展示 */
    label?: ReactNode;
    /** 点击回调 */
    onClick?: (e: MouseEvent) => void;
    /** 子菜单，仅 menu 项有效 */
    children?: ActionInfo[];
    /** 提示内容，或自定义 tooltip props */
    tooltip?: ReactNode | any;
    /** 禁用 */
    disabled?: boolean;
}

export interface ActionListProps {
    /** 操作列表 */
    actionList: ActionInfo[];
    /** 暴露的操作数量 */
    exposeCount?: number;
    /** 控件尺寸 */
    size?: Size;
    /** 操作数量等于 exposeCount+1 时是否直接显示按钮而不是显示下拉菜单 */
    smart?: boolean;
    /** 按钮的默认样式类别，参考 Button 的 styleType */
    buttonStyleType?: ButtonProps['styleType'];
    /** 自定义更多按钮内容，也可通过传入 object 来定义 props*/
    dropdownButton?: ReactNode | ButtonProps;
    /** 弹出层的 popover props */
    popoverProps?: any;
}

const renderActionButtonList = ({
    list,
    size,
    buttonStyleType
}: Pick<ActionListProps, 'size' | 'buttonStyleType'> & { list: ActionInfo[] }) => {
    return list.map((info, i) => {
        const { label, tooltip, ...rest } = info;
        const button = (
            <Button key={i} size={size} styleType={buttonStyleType} fakeDisabled={!!tooltip} {...rest}>
                {label}
            </Button>
        );
        return tooltip ? (
            typeof tooltip === 'string' || React.isValidElement(tooltip) ? (
                <Tooltip popup={tooltip} placement="topRight" key={i}>
                    {button}
                </Tooltip>
            ) : (
                <Tooltip placement="topRight" key={i} {...tooltip}>
                    {button}
                </Tooltip>
            )
        ) : (
            button
        );
    });
};

const ActionMenu = ({
    list,
    size,
    buttonStyleType,
    dropdownButton,
    popoverProps
}: Pick<ActionListProps, 'size' | 'buttonStyleType' | 'dropdownButton' | 'popoverProps'> & {
    list: ActionInfo[];
}) => {
    const popoverConfigProps = usePopoverConfig();
    const [visible, setVisible] = useState(false);
    const hide = useCallback(() => {
        setVisible(false);
    }, []);
    if (!list.length) return null;
    const renderList = (list: ActionInfo[]) =>
        list.map((info, i) => {
            if (info.children) {
                return (
                    <Menu.SubMenu key={i} styleType="popover" title={info.label}>
                        {renderList(info.children)}
                    </Menu.SubMenu>
                );
            }
            const { label, disabled, onClick, ...rest } = info;
            return (
                <SubMenuItem key={i} disabled={disabled} onClick={onClick} handleHide={hide} {...rest}>
                    {label}
                </SubMenuItem>
            );
        });
    return (
        <Popover
            trigger={['click']}
            popup={
                <Menu selectable={false} customStyle={{ maxHeight: '380px' }}>
                    {renderList(list)}
                </Menu>
            }
            {...popoverConfigProps}
            {...popoverProps}
            visible={visible}
            onVisibleChange={setVisible}
        >
            {dropdownButton ? (
                typeof dropdownButton === 'string' || React.isValidElement(dropdownButton) ? (
                    <Button size={size} styleType={buttonStyleType}>
                        {dropdownButton}
                    </Button>
                ) : (
                    <Button {...dropdownButton} />
                )
            ) : (
                <Button size={size} styleType={buttonStyleType} icon={<SvgIcon type="ellipsis" />} />
            )}
        </Popover>
    );
};

const ActionList = ({
    actionList = [],
    exposeCount = 3,
    size = 'md',
    smart = true,
    buttonStyleType = 'border',
    popoverProps,
    dropdownButton,
    className,
    ...rest
}: ActionListProps & Override<HTMLAttributes<HTMLDivElement>, ActionListProps>) => {
    const l = actionList.length;
    let buttonList: ActionInfo[], menuList: ActionInfo[];
    if (l > exposeCount + 1) {
        buttonList = actionList.slice(0, exposeCount);
        menuList = actionList.slice(exposeCount);
    } else if (l === exposeCount + 1) {
        if (smart) {
            buttonList = actionList;
            menuList = [];
        } else {
            buttonList = actionList.slice(0, exposeCount);
            menuList = actionList.slice(exposeCount);
        }
    } else {
        buttonList = actionList;
        menuList = [];
    }
    const sharedProps = { size, buttonStyleType };
    return (
        <Combine {...rest} className={classnames(prefixCls, className)} sharedProps={{ size }} spacing="smart">
            {renderActionButtonList({ list: buttonList, ...sharedProps })}
            {menuList.length ? (
                <ActionMenu
                    list={menuList}
                    {...sharedProps}
                    dropdownButton={dropdownButton}
                    popoverProps={popoverProps}
                />
            ) : null}
        </Combine>
    );
};

export default React.memo(ActionList);
