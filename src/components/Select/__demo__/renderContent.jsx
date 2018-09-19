import React from 'react';
import Select from 'components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select defaultValue={1} renderContent={v => <span style={{ color: 'red' }}>{v}</span>}>
                        <Option value={1}>一</Option>
                        <Option value={2}>二</Option>
                        <Option value={3}>三</Option>
                    </Select>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
