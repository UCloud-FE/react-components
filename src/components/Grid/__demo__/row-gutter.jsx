import React from 'react';

import Grid from 'src/components/Grid';
const { Row, Col } = Grid;

// demo start
const Demo = () => {
    const style = { background: '#888', height: 20, border: '1px solid #111' };
    const gutters = [0, 2, 4, 8, 16, [8, 8], [4, 16]];
    return (
        <div>
            {gutters.map(gutter => (
                <div className="demo-wrap" key={gutter}>
                    <Row gutter={gutter}>
                        <Col span={3}>
                            <div style={style} />
                        </Col>
                        <Col span={3}>
                            <div style={style} />
                        </Col>
                        <Col span={3}>
                            <div style={style} />
                        </Col>
                        <Col span={3}>
                            <div style={style} />
                        </Col>
                        <Col span={3}>
                            <div style={style} />
                        </Col>
                        <Col span={3}>
                            <div style={style} />
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    );
};
// demo end

export default Demo;
