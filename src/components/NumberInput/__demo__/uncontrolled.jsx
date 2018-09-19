import React from 'react';
import NumberInput from 'components/NumberInput';

// demo start
const layout = {
    style: {
        margin: 8
    }
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 4
        };
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <NumberInput value={value} onChange={value => this.setState({ value })} {...layout} />
                <NumberInput defaultValue={3} {...layout} />
            </div>
        );
    }
}

// demo end

export default Demo;
