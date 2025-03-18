import React from 'react';
import Select from 'src/components/Select';

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
                <div className="demo-wrap">
                    <Select
                        multiple
                        defaultValue={[1, 2, 3, 4, 5, 6, 7]}
                        renderContent={v => <span style={{ color: 'red' }}>{v}</span>}
                    >
                        <Option value={1}>一</Option>
                        <Option value={2}>二</Option>
                        <Option value={3}>三</Option>
                        <Option value={4}>四</Option>
                        <Option value={5}>五</Option>
                        <Option value={6}>六</Option>
                        <Option value={7}>七</Option>
                    </Select>
                </div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        styleType="list"
                        defaultValue={[1, 2, 3]}
                        renderContent={v => <span style={{ color: 'red' }}>{v}</span>}
                    >
                        <Option value={1}>
                            <span style={{ color: 'orange' }}>
                                一<br />
                                另一行
                            </span>
                        </Option>
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
