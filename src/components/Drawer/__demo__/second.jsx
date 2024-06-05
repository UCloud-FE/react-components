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
        const { visible1, visible2, visible3 } = this.state;

        return (
            <div>
                <div className="demo-wrap">
                    <Button onClick={() => this.toggle('1')}>Toggle</Button>
                    <Drawer visible={visible1} onClose={() => this.close('1')} width="1080">
                        <Drawer.Title>一级抽屉</Drawer.Title>
                        <Drawer.Content>
                            <Button onClick={() => this.toggle('2')}>Toggle</Button>
                        </Drawer.Content>

                        <Drawer visible={visible2} onClose={() => this.close('2')} width="736">
                            <Drawer.Title>二级抽屉</Drawer.Title>
                            <Drawer.Content>二级抽屉内容</Drawer.Content>
                        </Drawer>
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
