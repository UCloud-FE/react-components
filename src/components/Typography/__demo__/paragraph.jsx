import React from 'react';
import Typography from 'src/components/Typography';

// demo start
const { H3, Paragraph } = Typography;

const Demo = () => (
    <Typography>
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
    </Typography>
);
// demo end

export default Demo;
