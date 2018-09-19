import React from 'react';
import Loading from 'components/Loading';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
