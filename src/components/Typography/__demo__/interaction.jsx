import React from 'react';
import Typography from 'src/components/Typography';
import SvgIcon from 'src/components/SvgIcon';
import Tooltip from 'src/components/Tooltip';

// demo start
const { Text } = Typography;

const Demo = () => (
    <>
        <Text
            color="dark"
            useCopy={{
                text: 'UCloud Design 是一个设计系统，它定义了一套企业级中后台设计与前端基础组件.',
                moveTip: '复制',
                clickedTip: '已复制'
            }}
        >
            UCloud Design 是一个设计系统，它定义了一套企业级中后台设计与前端基础组件
        </Text>
        <br />
        <Text
            color="dark"
            size="t3"
            useCopy={{
                text: 'UCloud Design 是一个设计系统，它定义了一套企业级中后台设计与前端基础组件.',
                moveTip: '复制',
                clickedTip: '已复制'
            }}
        >
            UCloud Design 是一个设计系统，它定义了一套企业级中后台设计与前端基础组件
        </Text>
        <br />
        <Text
            color="dark"
            lineHeight="lg"
            suffix={
                <Tooltip
                    popup={<>测试</>}
                    placement="top"
                    getPopupContainer={() => document.body}
                    onVisibleChange={() => console.log('visibleChange')}
                >
                    <SvgIcon
                        type="exclamation-circle-filled"
                        size="12px"
                        color="#3860f4"
                        style={{ cursor: 'pointer' }}
                    />
                </Tooltip>
            }
        >
            UCloud Design 是一个设计系统，它定义了一套企业级中后台设计与前端基础组件
        </Text>
        <br />
        <Text
            color="dark"
            lineHeight="lg"
            isLink
            suffix={
                <Tooltip
                    popup={<>测试</>}
                    placement="top"
                    getPopupContainer={() => document.body}
                    onVisibleChange={() => console.log('visibleChange')}
                >
                    <SvgIcon type="exclamation-circle-filled" size="12px" style={{ cursor: 'pointer' }} />
                </Tooltip>
            }
        >
            UCloud Design 是一个设计系统，它定义了一套企业级中后台设计与前端基础组件
        </Text>
    </>
);
// demo end

export default Demo;
