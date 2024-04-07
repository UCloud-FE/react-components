// @ts-nocheck
import { Form, Layout } from '@ucloud-fe/react-components';
import React from 'react';
const { Group } = Form;
// demo start

const Demo = () => (
    <div>
        <Group title="顶部通栏+侧边导航">
            <Layout>
                <Layout.Header
                    style={{
                        textAlign: 'center',
                        color: '#000',
                        height: 64,
                        lineHeight: '64px',
                        backgroundColor: '#EAEEFD'
                    }}
                >
                    Header
                </Layout.Header>
                <Layout>
                    <Layout.Sider
                        style={{
                            textAlign: 'center',
                            lineHeight: '120px',
                            color: '#fff',
                            backgroundColor: '#c1d4fa'
                        }}
                    >
                        Sider
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header
                            style={{
                                textAlign: 'center',
                                color: '#000',
                                height: 64,
                                lineHeight: '64px',
                                backgroundColor: '#EAEEFD'
                            }}
                        >
                            Sub Header
                        </Layout.Header>
                        <Layout.Content
                            style={{
                                textAlign: 'center',
                                minHeight: 120,
                                lineHeight: '120px',
                                color: '#fff',
                                backgroundColor: '#95bff7'
                            }}
                        >
                            Content
                        </Layout.Content>
                        <Layout.Footer
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                backgroundColor: '#7dbcea'
                            }}
                        >
                            Footer
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </Layout>
        </Group>
        <Group title="顶部通栏">
            <Layout>
                <Layout>
                    <Layout.Header
                        style={{
                            textAlign: 'center',
                            color: '#000',
                            height: 64,
                            lineHeight: '64px',
                            backgroundColor: '#EAEEFD'
                        }}
                    >
                        Header
                    </Layout.Header>
                    <Layout.Header
                        style={{
                            textAlign: 'center',
                            color: '#000',
                            height: 64,
                            lineHeight: '64px',
                            backgroundColor: '#EAEEFD'
                        }}
                    >
                        Sub Header
                    </Layout.Header>
                    <Layout.Content
                        style={{
                            textAlign: 'center',
                            minHeight: 120,
                            lineHeight: '120px',
                            color: '#fff',
                            backgroundColor: '#95bff7'
                        }}
                    >
                        Content
                    </Layout.Content>
                    <Layout.Footer
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                            backgroundColor: '#7dbcea'
                        }}
                    >
                        Footer
                    </Layout.Footer>
                </Layout>
            </Layout>
        </Group>
        <Group title="侧边通栏">
            <Layout>
                <Layout.Sider
                    style={{
                        textAlign: 'center',
                        lineHeight: '120px',
                        color: '#fff',
                        backgroundColor: '#c1d4fa'
                    }}
                >
                    Sider
                </Layout.Sider>
                <Layout>
                    <Layout.Header
                        style={{
                            textAlign: 'center',
                            color: '#000',
                            height: 64,
                            lineHeight: '64px',
                            backgroundColor: '#EAEEFD'
                        }}
                    >
                        Header
                    </Layout.Header>
                    <Layout.Header
                        style={{
                            textAlign: 'center',
                            color: '#000',
                            height: 64,
                            lineHeight: '64px',
                            backgroundColor: '#EAEEFD'
                        }}
                    >
                        Sub Header
                    </Layout.Header>
                    <Layout.Content
                        style={{
                            textAlign: 'center',
                            minHeight: 120,
                            lineHeight: '120px',
                            color: '#fff',
                            backgroundColor: '#95bff7'
                        }}
                    >
                        Content
                    </Layout.Content>
                    <Layout.Footer
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                            backgroundColor: '#7dbcea'
                        }}
                    >
                        Footer
                    </Layout.Footer>
                </Layout>
            </Layout>
        </Group>
    </div>
);
// demo end

export default Demo;
