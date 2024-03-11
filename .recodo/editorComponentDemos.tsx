import { ThemeProvider } from '@ucloud-fe/react-components';
import React, { ReactNode } from 'react';

const snake = (str: string) => {
    return str.replace(/^[A-Z]/, s => s.toLowerCase()).replaceAll(/[A-Z]/g, s => '_' + s.toLowerCase());
};
const editorComponentDemos = [
    '操作列表 ActionList',
    '自动填充 AutoComplete',
    '卡片 Card',
    '级联选择器 Cascader',
    '按钮 Button',
    '数字输入框 NumberInput',
    '输入框 Input',
    '文本域 Textarea',
    '单选 Radio',
    '多选 Checkbox',
    '下拉选择器 Select',
    '日期选择器 DatePicker',
    '日历 Calendar',
    '步骤条 Steps',
    '面包屑 Breadcrumb',
    '标签页 Tabs',
    '表格 Table',
    '分页器 Pagination',
    '自增表格  EditableTable',
    '穿梭机 Transfer',
    '开关 Switch',
    '骨架屏 Skeleton',
    '时间选择器 TimePicker',
    '下拉菜单穿梭机 TransferMenu',
    '表格穿梭机 TransferTable',
    '滑块 Slider',
    '树控件 Tree',
    '上传 Upload',
    '冒泡 Tooltip',
    '气泡确认 PopConfirm',
    '弹窗 Modal',
    '全局提示 Message',
    '徽标数 Badge',
    '标签 Tag',
    '进度条 Progress',
    '提示 Notice',
    '折叠面板 Collapse',
    '间距 Combine',
    '抽屉 Drawer',
    '自增表单 EditableList',
    '表单 Form',
    '图标 Icon',
    '布局 Layout',
    '加载中 Loading',
    '链接 Link',
    '下拉菜单 Menu',
    '基础导航 Nav'
].map(desc => {
    const [, component] = desc.split(/\s+/);
    const Demo = require(`./componentDemos/${component}`).default;
    return {
        title: desc,
        component: snake(component),
        demo: <Demo />
    };
});

const ComponentDemosWrap = ({ tokens, children }: { tokens: any; children: ReactNode }) => {
    return <ThemeProvider theme={{ designTokens: tokens }}>{children}</ThemeProvider>;
};

export default editorComponentDemos;

export { ComponentDemosWrap };
