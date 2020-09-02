import React from 'react';

import Select from 'src/components/Select';
import Card from 'src/components/Card';
import Checkbox from 'src/components/Checkbox';
import Radio from 'src/components/Radio';

// demo start
const options = new Array(10).fill(0).map((v, i) => ({ value: i, label: `option ${i}` }));

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Select
                        onChange={console.log}
                        renderPopup={({ handleVisible, onChange, value }) => (
                            <Card style={{ width: 220 }}>
                                <Card.Content>
                                    <Radio.Group
                                        value={value}
                                        options={options}
                                        onChange={v => {
                                            handleVisible(false);
                                            onChange(v);
                                        }}
                                    />
                                </Card.Content>
                            </Card>
                        )}
                        renderContent={value => (value != null ? `option ${value}` : '请选择')}
                    />
                </div>
                <div className="demo-wrap">
                    <Select
                        onChange={console.log}
                        renderPopup={({ onChange, value }) => (
                            <Card style={{ width: 200 }}>
                                <Card.Content>
                                    <Checkbox.Group value={value} options={options} onChange={onChange} />
                                </Card.Content>
                            </Card>
                        )}
                        renderContent={value =>
                            value && value.length ? value.map(v => `option ${v}`).join(',') : '请选择'
                        }
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
