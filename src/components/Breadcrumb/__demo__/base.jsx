import React from 'react';
import Breadcrumb from 'components/Breadcrumb';
import Icon from 'components/Icon';

// demo start
const Demo = () => (
    <Breadcrumb>
        <Icon
            type="left"
            onClick={() => window.history.back()}
            style={{ border: '1px solid #c3cad9', fontSize: 16, marginRight: 5 }}
        />
        <Breadcrumb.Item href="https://www.google.com" target="_blank">
            google
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => window.location.reload()} disabled>
            google
        </Breadcrumb.Item>
        <Breadcrumb.Item current>current</Breadcrumb.Item>
    </Breadcrumb>
);
// demo end

export default Demo;
