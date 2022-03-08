import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'src/components/Button';
import { components } from '../../../../index';

// demo start
const { Input } = components;
class InputDemo extends React.Component {
    testFindDOMNode() {
        // eslint-disable-next-line react/no-find-dom-node
        const dom = ReactDOM.findDOMNode(this.input);
        dom.style.background = 'red';
        setTimeout(() => {
            dom.style.background = '';
        }, 1000);
    }
    testRef() {
        console.log(this.input2, this.input2.input, this.input2.focus);
        this.input2.focus();
    }
    render() {
        return (
            <div>
                <h2>应当被容器压缩</h2>
                <div style={{ width: '40px', border: '1px solid red' }}>
                    <Input />
                </div>
                <h2 style={{ color: 'red' }}>findDOMNode 测试 - 请勿使用</h2>
                <div className="demo-wrap">
                    <Input ref={_ref => (this.input = _ref)} />
                    <Button onClick={() => this.testFindDOMNode()}>check</Button>
                </div>
                <h2>ref 测试</h2>
                <div className="demo-wrap">
                    <Input ref={_ref => (this.input2 = _ref)} />
                    <Button onClick={() => this.testRef()}>check</Button>
                </div>
                <h2>禁用状态下 clear 测试</h2>
                <div className="demo-wrap">
                    <Input clearable disabled defaultValue="default" />
                </div>
            </div>
        );
    }
}
class SearchDemo extends React.Component {
    testFindDOMNode() {
        // eslint-disable-next-line react/no-find-dom-node
        const dom = ReactDOM.findDOMNode(this.input);
        dom.style.background = 'red';
        setTimeout(() => {
            dom.style.background = '';
        }, 1000);
    }
    testRef() {
        console.log(this.input2, this.input2.input, this.input2.focus);
        this.input2.focus();
    }
    render() {
        return (
            <div>
                <h2>应当被容器压缩</h2>
                <div style={{ width: '40px', border: '1px solid red' }}>
                    <Input.Search />
                </div>
                <h2>前后不该被挤压</h2>
                <div style={{ width: '400px', border: '1px solid red' }}>
                    <Input
                        suffix={
                            <span>
                                <span>测试文本挤压</span>
                                <span>测试文本挤压</span>
                            </span>
                        }
                        prefix={
                            <span>
                                <span>测试文本挤压</span>
                                <span>测试文本挤压</span>
                            </span>
                        }
                    />
                </div>
                <h2 style={{ color: 'red' }}>findDOMNode 测试 - 请勿使用</h2>
                <div className="demo-wrap">
                    <Input.Search ref={_ref => (this.input = _ref)} />
                    <Button onClick={() => this.testFindDOMNode()}>check</Button>
                </div>
                <h2>ref 测试</h2>
                <div className="demo-wrap">
                    <Input.Search ref={_ref => (this.input2 = _ref)} />
                    <Button onClick={() => this.testRef()}>check</Button>
                </div>
            </div>
        );
    }
}
const Demo = () => (
    <>
        <InputDemo />
        <SearchDemo />
    </>
);
// demo end

export default Demo;
