import React from 'react';
import _ from 'lodash';

import Tabs from 'src/components/Tabs';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import NumberInput from 'src/components/NumberInput';

// demo start
const { TabBarPositions, StyleTypes, Sizes } = Tabs;
class PaneContent extends React.Component {
    componentWillUnmount() {
        console.log('Will log this when destroyInactiveTabPane is true');
    }
    render() {
        return <div style={{ padding: 16 }} {...this.props} />;
    }
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: TabBarPositions[0],
            styleType: StyleTypes[0],
            size: Sizes[0],
            tabCount: 10,
            activeKey: '3',
            destroyInactiveTabPane: false
        };
    }
    render() {
        const { position, styleType, size, tabCount, activeKey, destroyInactiveTabPane } = this.state;
        const tabs = [];
        tabs.length = tabCount;
        tabs.fill();
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="position" {...itemLayout}>
                        <Radio.Group
                            value={position}
                            options={TabBarPositions.map(v => ({ value: v }))}
                            onChange={position =>
                                this.setState({
                                    position
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            options={StyleTypes.map(v => ({ value: v }))}
                            onChange={styleType =>
                                this.setState({
                                    styleType
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Sizes.map(v => ({ value: v }))}
                            onChange={size =>
                                this.setState({
                                    size
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="destroyInactiveTabPane" {...itemLayout}>
                        <Switch
                            checked={destroyInactiveTabPane}
                            onChange={destroyInactiveTabPane =>
                                this.setState({
                                    destroyInactiveTabPane
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="tabCount" {...itemLayout}>
                        <NumberInput
                            min={0}
                            value={tabCount}
                            onNumberChange={tabCount => this.setState({ tabCount })}
                        />
                    </Form.Item>
                    <Form.Item label="activeKey" {...itemLayout}>
                        <NumberInput
                            min={0}
                            max={tabCount - 1}
                            value={activeKey}
                            onNumberChange={activeKey => this.setState({ activeKey: '' + activeKey })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tabs
                        tabBarPosition={position}
                        activeKey={activeKey}
                        destroyInactiveTabPane={destroyInactiveTabPane}
                        onChange={activeKey => {
                            console.log(activeKey);
                            this.setState({ activeKey });
                        }}
                        styleType={styleType}
                        size={size}
                        style={{ height: 300 }}
                    >
                        {_.map(tabs, (tab, index) => (
                            <Tabs.Pane tab={`tab ${index}`} key={index}>
                                <PaneContent>tab content {index}</PaneContent>
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
