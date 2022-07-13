import React from 'react';

import demoUtil from 'shared/demoUtil';
import NumberInput from 'src/components/NumberInput';
import Skeleton from 'src/components/Skeleton';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';

// demo start
const { formLayout, DemoWrap } = demoUtil;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: false,
            rows: 1
        };
    }
    render() {
        const { animated, rows } = this.state;

        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="animated">
                        <Switch checked={animated} onChange={animated => this.setState({ animated })} />
                    </Form.Item>
                    <Form.Item label="rows">
                        <NumberInput value={rows} onChange={rows => this.setState({ rows })} />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    {/* use key to reset animated */}
                    <Skeleton key={rows} {...{ animated, rows }} />
                </DemoWrap>
            </div>
        );
    }
}
// demo end

export default Demo;
