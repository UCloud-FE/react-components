import React from 'react';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Button
                    onClick={() =>
                        this.setState({
                            visible: true
                        })
                    }
                >
                    open
                </Button>
                <Modal visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
                    <Modal.Content maxHeight="500px">
                        <div style={{ height: '1000px', background: 'gray' }}>内容区域</div>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}
// demo end

export default Demo;
