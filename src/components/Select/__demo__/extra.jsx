import React from 'react';

import Select from 'src/components/Select';
import Button from 'src/components/Button';

// demo start
const { Option, Extra } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        extra={{
                            autoHidePopup: false,
                            content: (
                                <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                    插入按钮
                                </Button>
                            )
                        }}
                    >
                        <Option value={1}>1</Option>
                        <Option value={'disable'} disabled>
                            disable
                        </Option>
                        <Extra>
                            <span style={{ padding: '0 8px' }}>插入一段文案</span>
                        </Extra>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        {new Array(100).fill(null).map((v, i) => (
                            <Option key={i} value={`v_${i}`}>
                                option{i}
                            </Option>
                        ))}
                        <Extra autoHidePopup>
                            <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
                                插入按钮
                            </Button>
                        </Extra>
                    </Select>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
