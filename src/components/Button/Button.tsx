import React, { ButtonHTMLAttributes, PureComponent, ReactNode } from 'react';

import Icon from 'src/components/Icon';
import SvgIcon from 'src/components/SvgIcon';
import { Override } from 'src/type';

import { SButton, iconCls, iconMarginRightls } from './style';
import { StyleTypes, Sizes, Shapes } from './shared';

const defaultProps = {
    styleType: 'border',
    size: 'md',
    type: 'button'
};

export interface ButtonProps {
    /** 按钮类型 */
    styleType?: 'primary' | 'border' | 'border-gray';
    /** 按钮尺寸 */
    size?: 'sm' | 'md' | 'lg';
    /** 形状 */
    shape?: 'circle' | 'square';
    /** 是否加载中 */
    loading?: boolean;
    /**
     * 伪装 disabled，配合 disabled 一起使用。
     *
     * 添加后 disabled 时除了 onClick 事件，其它的事件会正常触发，且生成的 button 上不会出现 disabled 属性。
     *
     * button 的 disabled 会将所有事件全部屏蔽，有时会导致一些问题，比如 tooltip 里嵌入 disabled button 时，无法获取事件导致无法正常显示。
     */
    fakeDisabled?: boolean;
    /** 图标，传入 string 时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在 children 中 */
    icon?: string | ReactNode;
    /** 设置原生的 button 上 type 属性 */
    type?: string;
    /** 展示设置为块元素 */
    block?: boolean;
    /**
     * @ignore
     * 内部使用，请勿使用，是否可选中，样式会有区别
     */
    checkAble?: boolean;
    /**
     * @ignore
     * 内部使用，请勿使用，选中状态
     */
    checked?: boolean;
}

export default class Button extends PureComponent<
    ButtonProps & Override<ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps & typeof defaultProps>
> {
    static defaultProps = defaultProps;
    static StyleTypes = StyleTypes;
    static Sizes = Sizes;
    static Shapes = Shapes;
    renderIcon = () => {
        const { loading, icon, children } = this.props;
        if (loading) {
            return <SvgIcon className={`${iconCls} ${children?iconMarginRightls:''}`} type="ring-loading" spin />;
        } else if (typeof icon === 'string') {
            return <Icon className={`${iconCls} ${children?iconMarginRightls:''}`} type={icon} />;
        }
        return icon;
    };
    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { loading, icon, children, ...rest } = this.props;
        return (
            <SButton loading={loading} {...rest}>
                {this.renderIcon()}
                {children}
            </SButton>
        );
    }
}
