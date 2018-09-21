import React from 'react';
import Loading from 'components/Loading';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading loading style={{ display: 'inline-block' }}>
                        <div style={{ height: 100, display: 'inline-block', background: 'gray' }}>
                            <p style={{ color: 'red' }}>this is content</p>
                        </div>
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading loading style={{ display: 'inline-block' }}>
                        <div style={{ height: 100, width: 100, background: 'gray' }} />
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
