import React from 'react';

import Combine from 'src/components/Combine';
import Select from 'src/components/Select';
import Input from 'src/components/Input';
import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <div>
        <h3>组合</h3>
        <div className="demo-wrap">
            <Combine>
                <Combine spacing="compact">
                    <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                    <Input />
                </Combine>
                <Button styleType="primary">按钮</Button>
            </Combine>
        </div>

        <h3>按钮组</h3>
        <div className="demo-wrap">
            <Combine>
                <Button styleType="primary">按钮组展示</Button>
                <Button>按钮组展示</Button>
                <Button>按钮组展示</Button>
                <Button disabled>按钮组展示</Button>
            </Combine>
        </div>

        <h3>工具栏</h3>
        <div className="demo-wrap">
            <Combine>
                <Input.Search />
                <Button icon="repeat" />
                <Button icon="cog" />
                <Button icon="cloud-download" />
                <Button>按钮</Button>
            </Combine>
        </div>
    </div>
);
// demo end

export default Demo;
