import React from 'react';
import Pagination from 'src/components/Pagination';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showQuickJumper />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} showQuickJumper={{ goButton: true }} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
