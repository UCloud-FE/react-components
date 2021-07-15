import React from 'react';
import Drawer from 'src/components/Drawer';
import Button from 'src/components/Button';

// demo start
const { Placement } = Drawer;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toggle(key, visible) {
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
        return (
            <div>
                <div className="demo-wrap">
                    {Placement.map(placement => {
                        const key = `visible_${placement}`;
                        const size =
                            placement === 'left' || placement === 'right' ? { width: '30%' } : { height: '30%' };
                        return (
                            <div key={placement}>
                                <Button onClick={() => this.toggle(key)}>Toggle {placement}</Button>
                                <Drawer
                                    visible={this.state[key]}
                                    onClose={() => this.close(key)}
                                    {...size}
                                    keyboard
                                    maskClosable
                                    placement={placement}
                                >
                                    content
                                </Drawer>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
