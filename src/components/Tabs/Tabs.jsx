import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import { prefixCls, TabsWrap } from './style';

const Position = ['left', 'right', 'top', 'bottom'];
const StyleType = ['default', 'ink'];
const Size = ['sm', 'md', 'lg'];

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
        /** Tab 尺寸 */
        size: PropTypes.oneOf(Size),
        /** 是否销毁不展示的tab内容 */
        destroyInactiveTabPane: PropTypes.bool
    };
    static defaultProps = {
        styleType: StyleType[0],
        tabBarPosition: Position[2],
        size: Size[0]
    };
    render() {
        const { styleType, tabBarPosition, ...rest } = this.props;
        return (
            <TabsWrap
                {...rest}
                styleType={styleType}
                prefixCls={prefixCls}
                tabBarPosition={tabBarPosition}
                renderTabBar={() => (
                    <ScrollableInkTabBar
                        className={`${prefixCls}-${tabBarPosition}-bar ${prefixCls}-styletype-${styleType}-bar`}
                    />
                )}
                renderTabContent={() => (
                    <TabContent
                        className={`${prefixCls}-${tabBarPosition}-content ${prefixCls}-styletype-${styleType}-content`}
                        animated={false}
                    />
                )}
            />
        );
    }
}

export default Tabs;

Tabs.Position = Position;
Tabs.StyleType = StyleType;
Tabs.Size = Size;
