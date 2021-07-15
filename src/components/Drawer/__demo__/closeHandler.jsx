import React from 'react';
import Drawer from 'src/components/Drawer';
import Button from 'src/components/Button';

// demo start
class Container extends React.Component {
    constructor(props) {
        super(props);
        console.log('new container');
    }
    componentWillUnmount() {
        console.log('ummount');
    }
    render() {
        return <div {...this.props} />;
    }
}
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    <Button onClick={() => this.toggle()}>Toggle</Button>
                    <Drawer
                        visible={visible}
                        onClose={() => this.close()}
                        width="30%"
                        destroyOnClose
                        closeHandler={false}
                        keyboard
                        maskClosable
                    >
                        <Container>content</Container>
                    </Drawer>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
