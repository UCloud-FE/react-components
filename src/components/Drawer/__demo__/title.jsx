import React from 'react';
import Drawer from 'src/components/Drawer';
import Button from 'src/components/Button';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggle(key, visible) {
        key = `visible${key}`;
        this.setState({
            [key]: visible == null ? !this.state[key] : visible
        });
    }
    open(key) {
        this.toggle(key, true);
    }
    close(key) {
        this.toggle(key, false);
    }
    render() {
        const { visible1 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle('1')}>Toggle</Button>
                    <Drawer visible={visible1} onClose={() => this.close('1')} title="标题" width="70%">
                        <Drawer.Title>标题</Drawer.Title>
                        <Drawer.Content>content</Drawer.Content>
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
