import React from 'react';
import PropTypes from 'prop-types';

import Table from 'src/components/Table';

// demo start
class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        const columns = new Array(6).fill(null).map((v, i) => {
            const onResize = w => this.handleResize(i, w);
            return {
                title: `title - ${i}`,
                key: `title-${i}`,
                width: 150,
                maxWidth: 300,
                minWidth: 50,
                onResize,
                render: record => <span>content {record.index}</span>
            };
        });
        if (props.fixed) {
            columns[0].fixed = true;
        }
        this.state = {
            columns
        };
    }
    handleResize(i, width) {
        const { columns } = this.state;
        columns[i].width = width;
        this.setState({
            columns
        });
    }
    render() {
        const dataSource = new Array(100).fill(null).map((v, i) => ({
            key: i,
            index: `index-${i}`
        }));
        const { columns } = this.state;
        return (
            <div>
                <div className="demo-wrap">
                    <Table
                        scroll={{
                            x: true,
                            y: this.props.y
                        }}
                        columnResizable
                        dataSource={dataSource}
                        columns={columns}
                        columnPlaceholder
                    />
                </div>
            </div>
        );
    }
}
Demo1.propTypes = { y: PropTypes.any, fixed: PropTypes.bool };
const Demo = () => {
    return (
        <>
            <Demo1 />
            <Demo1 y={300} fixed />
        </>
    );
};
// demo end

export default Demo;
