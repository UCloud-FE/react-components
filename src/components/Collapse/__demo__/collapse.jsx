import React from 'react';
import Collapse from 'src/components/Collapse';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';
import Checkbox from 'src/components/Checkbox';
import Radio from 'src/components/Radio';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: true,
            openKeys: [0],
            panelCount: 5
        };
    }
    render() {
        const { openKeys, multiple, panelCount } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const panels = [];
        panels.length = panelCount;
        panels.fill();
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch checked={multiple} onChange={v => this.setState({ multiple: v, openKeys: [] })} />
                    </Form.Item>
                    <Form.Item label="openKeys" {...itemLayout}>
                        {multiple ? (
                            <Checkbox.Group
                                value={openKeys}
                                options={panels.map((v, i) => ({ value: i }))}
                                onChange={openKeys => this.setState({ openKeys })}
                            />
                        ) : (
                            <Radio.Group
                                value={openKeys[0]}
                                options={panels.map((v, i) => ({ value: i }))}
                                onChange={openKey => this.setState({ openKeys: [openKey] })}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="panelCount" {...itemLayout}>
                        <NumberInput
                            value={panelCount}
                            min={1}
                            onNumberChange={panelCount =>
                                this.setState({
                                    panelCount
                                })
                            }
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Collapse
                        openKeys={openKeys}
                        multiple={multiple}
                        onChange={(v, ...rest) => {
                            this.setState({
                                openKeys: v
                            });
                            console.log(v, ...rest);
                        }}
                    >
                        {panels.map((v, i) => (
                            <Collapse.Panel key={i} title={`panel ${i}`} panelKey={i}>
                                content {i}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
