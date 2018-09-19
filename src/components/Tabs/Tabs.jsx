import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';

import { prefixCls, TabsWrap } from './style';

const Position = ['left', 'right', 'top', 'bottom'];
const StyleType = ['default', 'ink'];

class Tabs extends Component {
    static propTypes = {
        /** 当前激活的tab key，受控 */
        activeKey: PropTypes.string,
        /** 默认激活的tab key，非受控 */
        defaultActiveKey: PropTypes.string,
        /** tab修改时的回调 */
        onChange: PropTypes.func,
        /** bar的定位 */
        tabBarPosition: PropTypes.oneOf(Position),
        /** 样式风格 */
        styleType: PropTypes.oneOf(StyleType),
        /** 是否销毁不展示的tab内容 */
        destroyInactiveTabPane: PropTypes.bool
    };
    static defaultProps = {
        styleType: StyleType[0]
    };
    render() {
        const { styleType, ...rest } = this.props;
        return (
            <TabsWrap
                {...rest}
                styleType={styleType}
                prefixCls={prefixCls}
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent animated={false} />}
            />
        );
    }
}

export default Tabs;

Tabs.Position = Position;
Tabs.StyleType = StyleType;
