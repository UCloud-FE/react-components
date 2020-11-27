import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { BoxWrap } from './style';

const Spacing = ['xs', 'sm', 'md', 'lg', 'xlg', 'xxlg'];
const SizeType = PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(Spacing)]);
const SizeTypeWithString = PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(Spacing)]);

class Box extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node,
        /** 是否为容器，为容器时容器属性才能生效，并且被包裹的子组件中的一些属性（如 flex，order 等才能生效） */
        container: PropTypes.bool,
        /**
         * 子组件间的间距，预设 sm md lg 等内置尺寸，或自定义间距大小(传入 number，单位为 px)，间距方向跟随布局方向
         * 可传入数组同时定义横向和纵向间距 [横向间距, 纵向间距]
         */
        spacing: PropTypes.oneOfType([SizeType, PropTypes.arrayOf(SizeType)]),
        /** 布局方向，默认为 row 横向布局，column 为纵向布局，加上 -reverse 为单行（单列）子元素顺序反转 */
        direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
        /** 容器定义，默认为 nowrap，超出不会换行/列，使用 wrap 可让其超出换行/列，-reverse 为多行（多列）顺序反转 */
        wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
        /** 项目定位 */
        alignItems: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'stretch']),
        /** 内容整体定位，center 为居中（按照布局方向），start 和 end 为首尾对其（按照布局方向）*/
        alignContent: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
        /** 内容定位 */
        justifyContent: PropTypes.oneOf([
            'center',
            'flex-start',
            'flex-end',
            'space-between',
            'space-around',
            'stretch'
        ]),
        /** 间距，可以为 sm md lg 等内置尺寸，或者为自定义字符串，或传入数组 [横向 padding, 纵向 padding]，或有效的 padding 字符串 */
        padding: PropTypes.oneOfType([SizeTypeWithString, PropTypes.arrayOf(SizeTypeWithString)]),
        /** 宽度, 同 css 宽度 */
        width: PropTypes.string,
        /** 高度，同 css 高度 */
        height: PropTypes.string,
        /** 栅格宽度，12栅格，支持小数点，12栅格不够用的情况下可使用小数点 */
        span: PropTypes.number,
        /** 排序，同 css 的 order */
        order: PropTypes.number,
        /** flex 属性，同 css 的 flex */
        flex: PropTypes.string,
        /** 是否创建外层容器来清除外间距，正常情况下不需要关注，但是如果有滚动需求，又使用了 spacing，外边距会对滚动容器造成影响，此时可以通过这个参数来自动创建一个清理容器来修复 */
        cleanMargin: PropTypes.bool
    };
    render() {
        const { cleanMargin, container, ...rest } = this.props;
        const box = <BoxWrap {...rest} container={container} />;

        if (cleanMargin) {
            return <div style={{ overflow: 'hidden' }}>{box}</div>;
        }

        return box;
    }
}

export default Box;

Box.Spacing = Spacing;
