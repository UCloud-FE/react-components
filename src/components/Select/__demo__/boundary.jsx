import React from 'react';

import demoUtil from 'shared/demoUtil';
import Select from 'src/components/Select';

// demo start
const { DemoWrap } = demoUtil;
const { Option } = Select;

const objectValue = {};
const arrayValue = [];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <h2>最大宽度</h2>
                <DemoWrap>
                    <Select defaultValue={1}>
                        <Option value={1}>
                            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                        </Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </DemoWrap>
                <h2>最小宽度</h2>
                <DemoWrap>
                    <Select defaultValue={1}>
                        <Option value={1}></Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                    </Select>
                </DemoWrap>
                <h2>特殊 value</h2>
                <DemoWrap>
                    <Select defaultValue={null} onChange={console.log}>
                        <Option value={null}>null value</Option>
                        <Option value={objectValue}>object value</Option>
                        <Option value={arrayValue}>array value</Option>
                    </Select>
                </DemoWrap>
                <DemoWrap>
                    <Select multiple onChange={console.log}>
                        <Option value={null}>null value</Option>
                        <Option value={objectValue}>object value</Option>
                        <Option value={arrayValue}>array value</Option>
                    </Select>
                </DemoWrap>
                <DemoWrap>
                    <Select
                        defaultValue={null}
                        options={[null, objectValue, arrayValue].map((v, i) => ({ value: v, label: `option ${i}` }))}
                        onChange={console.log}
                    />
                </DemoWrap>
                <DemoWrap>
                    <Select
                        multiple
                        options={[null, objectValue, arrayValue].map((v, i) => ({ value: v, label: `option ${i}` }))}
                        onChange={console.log}
                    />
                </DemoWrap>
                <h2>使用 key</h2>
                <DemoWrap>
                    <Select multiple onChange={console.log}>
                        <Option key={null}>null key</Option>
                        <Option key={111}>number key</Option>
                        <Option key={'111'}>string number key</Option>
                        <Option key="string">string key</Option>
                    </Select>
                </DemoWrap>
            </div>
        );
    }
}
// demo end

export default Demo;
