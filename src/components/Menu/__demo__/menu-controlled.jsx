import React from 'react';
import Menu from 'src/components/Menu';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['1', '3']
        };
    }

    handleChange(v) {
        console.log(v);
        this.setState({
            selectedKeys: v
        });
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Menu multiple onChange={v => this.handleChange(v)} selectedKeys={this.state.selectedKeys}>
                        <Menu.Item itemKey="1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="4">Menu 4</Menu.Item>
                    </Menu>
                </div>
                <div className="demo-wrap">
                    <Menu multiple onChange={console.log} defaultSelectedKeys={['1', '3']}>
                        <Menu.Item itemKey="1">Menu 1</Menu.Item>
                        <Menu.Item itemKey="2">Menu 2</Menu.Item>
                        <Menu.Item itemKey="3">Menu 3</Menu.Item>
                        <Menu.Item itemKey="4">Menu 4</Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
