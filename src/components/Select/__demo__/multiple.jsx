import React from 'react';
import Select from 'components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [1, 2]
        };
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <Select
                    value={value}
                    multiple
                    onChange={v => {
                        console.log(v);

                        this.setState({ value: v });
                    }}
                >
                    <Option value={1}>1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </div>
        );
    }
}
// demo end

export default Demo;
