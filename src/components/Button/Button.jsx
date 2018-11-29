import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import withTheme from 'src/components/ThemeProvider/withTheme';
import Icon from 'components/Icon';

import { ButtonWrap } from './style';

const StyleType = ['primary', 'border', 'border-gray'];
const Size = ['sm', 'md', 'lg'];
const Shape = ['circle'];

@withTheme
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
        /** 图标，传入string时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在children中 */
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /** 设置原生的button上type属性 */
        type: PropTypes.string,
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
            btnIcon = <Icon type={icon} />;
        } else {
            btnIcon = icon;
        }
        if (loading) {
            btnIcon = <Icon type="loading" spin />;
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
