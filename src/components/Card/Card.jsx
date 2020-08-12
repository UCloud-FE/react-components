import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { InhertProvider } from 'src/components/Popover/ContainerContext';

import { CardWrap } from './style';

/** 卡片布局控件 */
class Card extends PureComponent {
    static propTypes = {
        /** @ignore */
        children: PropTypes.node
    };
    savePopupContainer = ref => {
        this.popupContainer = ref;
    };
    /** 由于 react 渲染和 ref 的时机，子组件渲染时无法获取到外部的 ref，故使用上层组件做路引 */
    getPopupContainer = () => this.popupContainer && this.popupContainer.parentNode.parentNode;
    render() {
        const { children, ...rest } = this.props;
        return (
            <InhertProvider value={{ getPopupContainer: this.getPopupContainer }}>
                <CardWrap {...rest}>
                    <div ref={this.savePopupContainer}></div>
                    {children}
                </CardWrap>
            </InhertProvider>
        );
    }
}

export default Card;
