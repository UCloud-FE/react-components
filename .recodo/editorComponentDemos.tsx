import React, { ReactNode } from 'react';
import { ThemeProvider } from '@ucloud-fe/react-components';

const snake = (str: string) => {
    return str.replace(/^[A-Z]/, s => s.toLowerCase()).replaceAll(/[A-Z]/g, s => '_' + s.toLowerCase());
};
const editorComponentDemos = [
    '操作列表 ActionList',
    '自动填充 AutoComplete',
    '卡片 Card',
    '级联选择器 Cascader',
    '按钮 Button',
    '计步器 NumberInput',
    '输入框 Input',
    '文本域 Textarea',
    '单选 Radio',
    '复选框 Checkbox',
    '下拉选择器 Select',
    '日期选择器 DatePicker',
    '日历 Calendar',
    '步骤条 Steps',
    '面包屑 Breadcrumb',
    '标签切换 Tabs',
    '表格 Table',
    '分页器 Pagination',
    '自增表格  EditableTable',
    '穿梭框 Transfer',
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
    '消息通知 Message',
    '角标 Badge',
    '标签 Tag',
    '进度条 Progress',
    '提示 Notice'
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
