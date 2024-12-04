import React from 'react';
import { Typography } from '@ucloud-fe/react-components';

const { H1, H2, H3, H4, H5, Count, Text,Paragraph } = Typography;

const Demo = () => {
    return (
        <div>
            <H1>h1.Udesign</H1>
            <H2>h2.Udesign</H2>
            <H3>h3.Udesign</H3>
            <H4>h4.Udesign</H4>
            <H5>h5.Udesign</H5>
            <Text color="light" lineHeight="lg">
                Udesign(default)
            </Text>

            <Text color="dark" lineHeight="lg">
                Udesign(dark)
            </Text>

            <Text color="light" lineHeight="lg">
                Udesign(light)
            </Text>

            <Text color="remark" lineHeight="lg">
                Udesign(remark)
            </Text>

            <Text color="remark_light" lineHeight="lg">
                Udesign(remark_light)
            </Text>

            <Text color="primary" lineHeight="lg" disabled={true}>
                Udesign(disabled)
            </Text>

            <Text color="success" lineHeight="lg">
                Udesign(success)
            </Text>

            <Text color="warning" lineHeight="lg">
                Udesign(warning)
            </Text>

            <Text color="error" lineHeight="lg">
                Udesign(error)
            </Text>

            <Text color="primary" lineHeight="lg" isLink={true}>
                Udesign(link)
            </Text>

            <Text color="dark" lineHeight="lg">
                Udesign(code)
            </Text>
            <Text size="t1" lineHeight="sm">
                使用率
            </Text>
            <Count size="xxlg" color="dark">
                80%
            </Count>
            <H3>常规</H3>
            <Paragraph>
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Paragraph>
            <br />
            <H3>紧凑</H3>
            <Paragraph size="impact">
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Paragraph>
        </div>
    );
};

export default React.memo(Demo);
