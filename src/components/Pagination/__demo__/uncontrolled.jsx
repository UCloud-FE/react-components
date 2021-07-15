import React from 'react';
import Pagination from 'src/components/Pagination';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Pagination total={100} current={1} onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Pagination total={100} defaultCurrent={1} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
