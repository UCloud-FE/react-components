// @ts-nocheck
import { Form, Nav, SvgIcon } from '@ucloud-fe/react-components';
import React from 'react';
// demo start

const onClick = info => {
    console.log('click ', info);
};

const Demo = () => (
    <div style={{ width: 240 }}>
        <Form.Group title="只有一级目录">
            <Nav
                onClick={onClick}
                items={[
                    {
                        icon: <SvgIcon type="calendar" />,
                        key: '410',
                        label: '一级正常标题'
                    },
                    {
                        icon: <SvgIcon type="cog" />,
                        key: '418',
                        label: '一级标题一级标题一级标题一级标题一级标题一级标题一级标题'
                    },
                    {
                        key: '417',
                        label: '一级正常标题无icon'
                    },
                    {
                        icon: <SvgIcon type="calendar" />,
                        key: '419',
                        label: '一级小标题',
                        labelType: 'small'
                    },
                    {
                        key: '416',
                        labelType: 'small',
                        label: '一级小标题无icon'
                    }
                ]}
            />
        </Form.Group>
        <Form.Group title="一/二级目录 + 切换应用 + 分类标题 + 路由跳转">
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
        </Form.Group>
        <Form.Group title="垂直展开 + 路由跳转">
            <div style={{ width: 240 }}>
                <Nav
                    mode="vertical"
                    defaultSelectedKeys={['4131']}
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
                            icon: <SvgIcon type="calendar" />,
                            key: '410',
                            label: '小标题',
                            labelType: 'small',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '411',
                                    label: '一级菜单',
                                    path: '/cloud-fe/resource/resourceset',
                                    children: [
                                        {
                                            icon: <SvgIcon type="calendar" />,
                                            key: '4131',
                                            label: '资源管理',
                                            path: '/cloud-fe/resource/resourceset'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '419',
                            label: '资源管33理'
                        },
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '418',
                            label: '一级标题',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '413',
                                    label: '资源管理',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    children: [
                                        {
                                            key: '4122211',
                                            label: 'cahidjailj',
                                            path: '/cloud-fe/resource/resourceset'
                                        },
                                        {
                                            key: '412222222',
                                            label: '32',
                                            path: '/cloud-fe/resource/resourceset'
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
                            label: '资源管理1',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4641',
                                    label: '资源管理2',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </Form.Group>
        <Form.Group title="折叠目录">
            <div style={{ width: 'fit-content' }}>
                <Nav
                    inlineCollapsed={true}
                    items={[
                        {
                            key: '410',
                            label: '小标题无icon',
                            labelType: 'small',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '411',
                                    label: '一级菜单',
                                    path: '/cloud-fe/resource/resourceset',
                                    children: [
                                        {
                                            icon: <SvgIcon type="calendar" />,
                                            key: '4131',
                                            label: '资源管理',
                                            path: '/cloud-fe/resource/resourceset'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            icon: <SvgIcon type="cog" />,
                            key: '2',
                            label: '小标题有icon',
                            labelType: 'small',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '21',
                                    label: '2级菜单',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        },
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '419',
                            label: '无子菜单菜单项'
                        },
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '418',
                            label: '一级标题',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '413',
                                    label: '资源管理small',
                                    path: '/cloud-fe/resource/resourceset',
                                    labelType: 'small',
                                    children: [
                                        {
                                            key: '412df',
                                            label: 'cahidjailj',
                                            path: '/cloud-fe/resource/resourceset'
                                        },
                                        {
                                            key: '412222df',
                                            label: '32',
                                            path: '/cloud-fe/resource/resourceset'
                                        }
                                    ]
                                },
                                {
                                    children: [
                                        {
                                            key: '4122211',
                                            label: 'cahidjailj',
                                            path: '/cloud-fe/resource/resourceset'
                                        },
                                        {
                                            key: '412222222',
                                            label: '32',
                                            path: '/cloud-fe/resource/resourceset'
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
                            key: '417',
                            label: '一级标题无icon',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4166',
                                    label: '二级资源管理',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        },
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '416',
                            label: '资源管理1',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4641',
                                    label: '资源管理2',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </Form.Group>
    </div>
);
// demo end

export default Demo;
