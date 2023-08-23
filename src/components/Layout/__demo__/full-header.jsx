import React from 'react';

import Layout from 'src/components/Layout';

// demo start
const headerStyle = {
    textAlign: 'center',
    color: '#000',
    height: 64,
    lineHeight: '64px',
    backgroundColor: '#EAEEFD'
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#95bff7'
};

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#c1d4fa'
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea'
};

const Demo = () => (
    <Layout>
        <Layout.Header style={headerStyle}>Header</Layout.Header>
        <Layout hasSider>
            <Layout.Sider style={siderStyle}>Sider</Layout.Sider>
            <Layout>
                <Layout.Header style={headerStyle}>Sub Header</Layout.Header>
                <Layout.Content style={contentStyle}>Content</Layout.Content>
                <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
            </Layout>
        </Layout>
    </Layout>
);
// demo end

export default Demo;
