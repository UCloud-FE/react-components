import React from 'react';
import Loading from 'components/Loading';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading
                        loading
                        indicator={
                            <img width={50} src="https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif" />
                        }
                    >
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading
                        loading
                        indicator={
                            <img
                                width={50}
                                src="https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif"
                            />
                        }
                    >
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
