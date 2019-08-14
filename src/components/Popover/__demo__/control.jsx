import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'components/Popover';

// demo start
const Popup = () => (
    <div style={{ maxHeight: 200, border: '1px solid #ddd', background: '#fff', overflow: 'auto' }}>
        <div style={{ height: 10000, background: '#ddd' }}>This is a popup</div>
    </div>
);
const Content = props => (
    <div style={{ width: 80, height: 50, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }
    render() {
        return (
            <div>
                <div ref={ref => (this.container = ref)} />
                <Popover popup={<Popup />} visible={this.state.visible}>
                    <Content>hover me</Content>
                </Popover>
                <button
                    onClick={() =>
                        this.setState({
                            visible: !this.state.visible
                        })
                    }
                >
                    toggle
                </button>
            </div>
        );
    }
}
// demo end

export default Demo;
