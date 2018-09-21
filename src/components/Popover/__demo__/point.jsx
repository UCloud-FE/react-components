import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'components/Popover';

// demo start
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;
const Content = props => (
    <div style={{ width: 80, height: 50, background: '#ddd', display: 'inline-block', marginLeft: 5 }} {...props} />
);
Content.propTypes = {
    children: PropTypes.node
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div ref={ref => (this.container = ref)} />
                <Popover popup={<Popup />} alignPoint>
                    <Content>hover me</Content>
                </Popover>
            </div>
        );
    }
}
// demo end

export default Demo;
