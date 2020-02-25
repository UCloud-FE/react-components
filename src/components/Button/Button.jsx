import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ButtonWrap, ButtonIcon } from './style';

const StyleType = ['primary', 'border', 'border-gray'];
const Size = ['sm', 'md', 'lg'];
const Shape = ['circle'];

export default class Button extends PureComponent {
    static propTypes = {
        /** 按钮类型 */
        styleType: PropTypes.oneOf(StyleType),
        /** 按钮尺寸 */
        size: PropTypes.oneOf(Size),
        /** 形状 */
        shape: PropTypes.oneOf(Shape),
        /** 是否加载中 */
        loading: PropTypes.bool,
        /**
         * 伪装disabled，配合disabled一起使用。
         *
         * 添加后disabled时除了onClick事件，其它的事件会正常触发，且生成的button上不会出现disabled属性。
         *
         * button的disabled会将所有事件全部屏蔽，有时会导致一些问题，比如tooltip里嵌入disabled button时，无法获取事件导致无法正常显示。
         */
        fakeDisabled: PropTypes.bool,
        /** 图标，传入string时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在children中 */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /** 设置原生的button上type属性 */
        type: PropTypes.string,
        /**
         * @ignore
         * 是否可选中，样式会有区别
         */
        checkAble: PropTypes.bool,
        /**
         * @ignore
         * 选中状态
         */
        checked: PropTypes.bool,
        /** @ignore */
        className: PropTypes.string,
        /** @ignore */
        children: PropTypes.node
    };

    static defaultProps = {
        styleType: 'border',
        size: 'md',
        type: 'button'
    };

    render() {
        const { loading, icon, children, ...rest } = this.props;
        let btnIcon = null;
        if (_.isString(icon)) {
            btnIcon = <ButtonIcon type={icon} />;
        } else {
            btnIcon = icon;
        }
        if (loading) {
            btnIcon = <ButtonIcon type="loading" spin />;
        }
        return (
            <ButtonWrap loading={loading} {...rest}>
                {btnIcon}
                {children}
            </ButtonWrap>
        );
    }
}

Object.assign(Button, {
    StyleType,
    Size,
    Shape
});
