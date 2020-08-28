import React from 'react';

import Loading from 'src/components/Loading';
import Spin from 'src/components/Spin';
// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Loading
                        loading
                        indicator={
                            <svg
                                width="55"
                                height="80"
                                viewBox="0 0 55 80"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#1ABC9C"
                            >
                                <g transform="matrix(1 0 0 -1 0 80)">
                                    <rect width="10" height="20" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="4.3s"
                                            values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <rect x="15" width="10" height="80" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="2s"
                                            values="80;55;33;5;75;23;73;33;12;14;60;80"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <rect x="30" width="10" height="50" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="1.4s"
                                            values="50;34;78;23;56;23;34;76;80;54;21;50"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <rect x="45" width="10" height="30" rx="3">
                                        <animate
                                            attributeName="height"
                                            begin="0s"
                                            dur="2s"
                                            values="30;45;13;80;56;72;45;76;34;23;67;30"
                                            calcMode="linear"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                </g>
                            </svg>
                        }
                    >
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading
                        loading
                        indicator={
                            <svg
                                width="140"
                                height="64"
                                viewBox="0 0 140 64"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#E74C3C"
                            >
                                <path
                                    d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z"
                                    fillOpacity=".5"
                                >
                                    <animate
                                        attributeName="fill-opacity"
                                        begin="0s"
                                        dur="1.4s"
                                        values="0.5;1;0.5"
                                        calcMode="linear"
                                        repeatCount="indefinite"
                                    />
                                </path>
                                <path
                                    d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z"
                                    fillOpacity=".5"
                                >
                                    <animate
                                        attributeName="fill-opacity"
                                        begin="0.7s"
                                        dur="1.4s"
                                        values="0.5;1;0.5"
                                        calcMode="linear"
                                        repeatCount="indefinite"
                                    />
                                </path>
                                <path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" />
                            </svg>
                        }
                    >
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
                <div className="demo-wrap">
                    <Loading loading indicator={<Spin style={{ display: 'inline-block' }}>😈</Spin>}>
                        <div style={{ height: 100, background: 'gray' }} />
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
