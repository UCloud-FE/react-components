import React from 'react';

import Select from 'src/components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>optionListMaxHeight</h3>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        customStyle={{ optionListMaxHeight: 100 }}
                    >
                        {new Array(100).fill(null).map((v, i) => (
                            <Option key={i} value={`v_${i}`}>
                                option{i}
                            </Option>
                        ))}
                    </Select>
                </div>
                <h3>popupMaxWidth</h3>
                <div className="demo-wrap">
                    <Select
                        multiple
                        showSelectAll
                        search
                        onChange={console.log}
                        customStyle={{ popupMaxWidth: '200px' }}
                    >
                        {new Array(100).fill(null).map((v, i) => (
                            <Option key={i} value={`v_${i}`}>
                                optionoptionoptionoptionoptionoptionoptionoptionoptionoptionoption{i}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
