import React from 'react';
import Grid from 'components/Grid';
const { Row, Col } = Grid;

// demo start
const Demo = () => {
    const style = { background: '#888', height: 20, border: '1px solid #111' };
    const layout = {
        style: {
            marginBottom: 10
        }
    };
    return (
        <div>
            <Row {...layout}>
                <Col span={6}>
                    <div style={style} />
                </Col>
                <Col span={6}>
                    <div style={style} />
                </Col>
            </Row>
            <Row {...layout}>
                <Col span={8}>
                    <div style={style} />
                </Col>
                <Col span={3}>
                    <div style={style} />
                </Col>
            </Row>
            <Row {...layout}>
                <Col span={1}>
                    <div style={style} />
                </Col>
                <Col span={2}>
                    <div style={style} />
                </Col>
                <Col span={4}>
                    <div style={style} />
                </Col>
                <Col span={5}>
                    <div style={style} />
                </Col>
            </Row>
            <Row {...layout}>
                <Col span={4}>
                    <div style={style} />
                </Col>
                <Col span={2}>
                    <div style={style} />
                </Col>
                <Col span={3}>
                    <div style={style} />
                </Col>
                <Col span={2}>
                    <div style={style} />
                </Col>
                <Col span={1}>
                    <div style={style} />
                </Col>
            </Row>
        </div>
    );
};
// demo end

export default Demo;
