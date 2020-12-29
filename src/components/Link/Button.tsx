import React, { HTMLAttributes, PureComponent, ReactNode } from 'react';
import classnames from 'classnames';

import Icon from 'src/components/Icon';
import { SButtonA, iconCls } from 'src/components/Button/style';

import { prefixCls } from './style';

const defaultProps = {
    styleType: 'border',
    size: 'md'
};

type ButtonProps = {
    /** 按钮类型 */
    styleType?: 'primary' | 'border' | 'border-gray';
    /** 按钮尺寸 */
    size?: 'sm' | 'md' | 'lg';
    /** 形状 */
    shape?: 'circle' | 'square';
    /** 图标，传入 string 时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在 children 中 */
    icon?: string | ReactNode;
} & typeof defaultProps &
    HTMLAttributes<HTMLAnchorElement>;

export default class Button extends PureComponent<ButtonProps> {
    static defaultProps = defaultProps;
    renderIcon = () => {
        const { icon } = this.props;
        if (typeof icon === 'string') {
            return <Icon className={iconCls} type={icon} />;
        }
        return icon;
    };
    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { icon, children, className, ...rest } = this.props;
        return (
            <SButtonA {...rest} className={classnames(prefixCls, className)}>
                {this.renderIcon()}
                {children}
            </SButtonA>
        );
    }
}
