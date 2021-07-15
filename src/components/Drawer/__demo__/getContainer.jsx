import React from 'react';
import Drawer from 'src/components/Drawer';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveContainer = container => (this.container = container);
    }
    toggle(visible) {
        this.setState({
            visible: visible == null ? !this.state.visible : visible
        });
    }
    open() {
        this.toggle(true);
    }
    close() {
        this.toggle(false);
    }
    render() {
        const { visible } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <div
                        ref={this.saveContainer}
                        style={{
                            width: 300,
                            height: 300,
                            position: 'relative',
                            border: '1px solid #ccc',
                            overflow: 'hidden'
                        }}
                    />
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        visible={visible}
                        onClose={() => this.close()}
                        width="30%"
                        keyboard
                        maskClosable
                        getContainer={() => this.container}
                    >
                        content
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
