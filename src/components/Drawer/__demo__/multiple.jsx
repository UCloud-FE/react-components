import React from 'react';
import Drawer from 'components/Drawer';
import Button from 'components/Button';

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
        const { visible1, visible2, visible3 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle('1')}>Toggle</Button>
                    <Drawer visible={visible1} onClose={() => this.close('1')} width="70%">
                        <Button onClick={() => this.toggle('2')}>Toggle</Button>
                        <Drawer visible={visible2} onClose={() => this.close('2')} width="50%">
                            <Button onClick={() => this.toggle('3')}>Toggle</Button>
                            <Drawer visible={visible3} onClose={() => this.close('3')} width="25%">
                                content
                            </Drawer>
                        </Drawer>
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
