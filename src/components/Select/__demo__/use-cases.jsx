import React from 'react';

import demoUtil from 'shared/demoUtil';
import Select from 'src/components/Select';

// demo start
const { DemoWrap, DemoBlock } = demoUtil;
const { Option } = Select;

const options = new Array(100).fill(null).map((_, i) => ({ value: i, label: 'option-' + i }));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoWrap title="单选">
                    <DemoBlock row>
                        <h3>单选+无默认值+可清除</h3>
                        <Select options={options} clearable />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>单选+默认值+不可清除</h3>
                        <Select options={options} defaultValue={1} />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>单选+搜索</h3>
                        <Select options={options} clearable search />
                    </DemoBlock>
                </DemoWrap>
                <DemoWrap title="多选">
                    <DemoBlock row>
                        <h3>多选+默认值</h3>
                        <Select options={options} defaultValue={[1, 2]} multiple />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>多选+默认值+全选+搜索</h3>
                        <Select
                            options={options}
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            multiple
                            search
                            showSelectAll
                        />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>多选+默认值+styleType:list</h3>
                        <Select
                            options={options}
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            multiple
                            styleType="list"
                        />
                    </DemoBlock>
                    <DemoBlock row>
                        <h3>多选+默认值+styleType:list+全选+搜索</h3>
                        <Select
                            options={options}
                            defaultValue={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            multiple
                            styleType="list"
                            search
                            showSelectAll
                        />
                    </DemoBlock>
                </DemoWrap>
            </div>
        );
    }
}
// demo end

export default Demo;
