import React from 'react';
import Select from 'src/components/Select';

// demo start
const { Option } = Select;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <Select
                    value={value}
                    multiple
                    search
                    autoClearSearchValue
                    onChange={v => {
                        console.log(v);
                        this.setState({ value: v });
                    }}
                >
                    <Option value={1}>test option 1</Option>
                    <Option value={'disable'} disabled>
                        disable
                    </Option>
                    <Option value={2}>test option 2</Option>
                    <Option value={3}>test option 3</Option>
                    <Option value={4}>test option 4</Option>
                    <Option value={5}>test option 5</Option>
                    <Option value={6}>test option 6</Option>
                    <Option value={7}>test option 7</Option>
                    <Option value={8}>test option 8</Option>
                    <Option value={9}>test option 9</Option>
                    <Option value={10}>test option 10</Option>
                </Select>
            </div>
        );
    }
}
// demo end

export default Demo;
