// @ts-nocheck
import { Form, NumberInput, Radio, Switch, Tabs } from '@ucloud-fe/react-components';
import _ from 'lodash';
import React from 'react';

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

class DemoPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forceRender: false,
            disabled: false
        };
    }
    render() {
        const { forceRender, disabled } = this.state;
        const tabs = [];
        tabs.length = 10;
        tabs.fill(null);
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
                    <Form.Item label="forceRender" {...itemLayout}>
                        <Switch
                            checked={forceRender}
                            onChange={forceRender =>
                                this.setState({
                                    forceRender
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch
                            checked={disabled}
                            onChange={disabled =>
                                this.setState({
                                    disabled
                                })
                            }
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tabs style={{ height: 300 }}>
                        {_.map(tabs, (tab, index) => (
                            <Tabs.Pane
                                tab={`tab ${index}`}
                                key={index}
                                forceRender={forceRender}
                                disabled={disabled}
                                style={{ padding: 16 }}
                            >
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
                <div className="demo-wrap" style={{ width: 800 }}>
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
                <Form.Group title="Pane ">
                    <DemoPane />
                </Form.Group>
            </div>
        );
    }
}
// demo end

export default Demo;
