import React from 'react';
import Nav from 'src/components/Nav';
import SvgIcon from 'src/components/SvgIcon';

// demo start

const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            subMenuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click sub menu, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            menuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click menu item, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            items={[
                {
                    key: '410',
                    label: '分类小标题',
                    labelType: 'small',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '411',
                            label: '二级标题',
                            path: '/cloud-fe/resource/resourceset',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4131',
                                    label: '三级标题',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]
                },

                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '413',
                            label: '二级标题',
                            labelType: 'small',
                            path: '/cloud-fe/resource/resourceset'
                        },
                        {
                            children: [
                                {
                                    key: '4122211',
                                    label: '三级分类小标题',
                                    labelType: 'small',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    key: '412222222',
                                    label: '资源管理',
                                    path: '/cloud-fe/resource/resourceset',
                                    children: [
                                        {
                                            key: '51',
                                            label: '四级分类小标题',
                                            labelType: 'small',
                                            path: '/cloud-fe/resource/resourceset'
                                        },
                                        {
                                            key: '33',
                                            label: '四级标题',
                                            path: '/cloud-fe/resource/resourceset'
                                        }
                                    ]
                                }
                            ],

                            icon: <SvgIcon type="calendar" />,
                            key: '41222',
                            label: '资源管理222',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '417',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4641',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '415',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4143',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '414',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4124',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                }
            ]}
        />
    </div>
);
// demo end

export default Demo;
