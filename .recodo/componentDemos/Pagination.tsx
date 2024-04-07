// @ts-nocheck
import { Form, NumberInput, Pagination, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';

// demo start
const { Size } = Pagination;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            showTitle: false,
            showQuickJumper: false,
            showSizeChanger: false,
            showPrevNextJumpers: false,
            simple: false,
            goButton: false,
            total: 100
        };
    }
    render() {
        const {
            size,
            showTitle,
            showQuickJumper,
            showSizeChanger,
            showPrevNextJumpers,
            simple,
            goButton,
            total,
            showTotal
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({ value: size }))}
                        />
                    </Form.Item>
                    {[
                        'showTitle',
                        'showQuickJumper',
                        'goButton',
                        'showSizeChanger',
                        'showPrevNextJumpers',
                        'simple',
                        'showTotal'
                    ].map(key => (
                        <Form.Item key={key} label={key} {...itemLayout}>
                            <Switch checked={this.state[key]} onChange={v => this.setState({ [key]: v })} />
                        </Form.Item>
                    ))}
                    <Form.Item label="total" {...itemLayout}>
                        <NumberInput value={total} onChange={total => this.setState({ total })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Pagination
                        {...{
                            size,
                            showTitle,
                            showQuickJumper: showQuickJumper ? { goButton } : false,
                            showSizeChanger,
                            showPrevNextJumpers,
                            total,
                            simple,
                            showTotal
                        }}
                        onChange={(...args) => console.log('onChange', ...args)}
                        onPageSizeChange={(...args) => console.log('onPageSizeChange', ...args)}
                        onAdvise={(...args) => console.log('onAdvise', ...args)}
                    />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
