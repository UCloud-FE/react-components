import React from 'react';
import SvgIcon from 'src/components/SvgIcon';
import Typography from 'src/components/Typography';
// demo start
const { H3, Text } = Typography;

const Demo = () => {
    return (
        <div>
            <H3>超出隐藏</H3>
            <H3>LineEllipsis</H3>
            <Text ellipsis>
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Text>
            <H3>自定义气泡中文案</H3>
            <Text
                ellipsis={{
                    lineProps: {
                        tipText: ' UCloud Design'
                    }
                }}
            >
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Text>
            <H3>LineEllipsis 自定义宽度</H3>
            <Text
                ellipsis={{
                    lineProps: {
                        style: { width: 400 }
                    }
                }}
            >
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
                <SvgIcon type="tick" />
            </Text>

            <br />
            <br />
            <br />
            <H3>TextEllipsis</H3>
            <Text
                ellipsis={{
                    textProps: {
                        maxLength: 30
                    }
                }}
            >
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Text>

            <H3>截断方向可选择从前或从后</H3>
            <Text
                ellipsis={{
                    textProps: {
                        maxLength: 30,
                        direction: 'fromEnd'
                    }
                }}
            >
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Text>
            <H3>超过字符数量限制后默认出 tip，未超过限制不出 tip</H3>
            <Text
                ellipsis={{
                    textProps: {
                        maxLength: 30,
                        tipStyle: { maxWidth: 400 }
                    }
                }}
            >
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Text>
            <H3>自定义省略号字符</H3>
            <Text
                ellipsis={{
                    textProps: {
                        maxLength: 30,
                        ellipsis: '~~~'
                    }
                }}
            >
                UCloud Design
                是一个设计系统，它定义了一套企业级中后台设计与前端基础组件，帮助我们更容易地创造更加一致的用户体验。每个设计师、开发者都有自己的习惯、审美和工作方式，在
                UCloud，我们希望设计师能够从重复的工作中获得解脱，与开发者合作，更敏捷地解决问题。我们希望打破设计师与开发者的隔阂，让大家的协同变得更流畅和高效。因此，我们打造了
                UCloud Design。
            </Text>
            <H3>basedOn 截断基准，如果不设置，则根据字符自动判断</H3>
            <Text
                ellipsis={{
                    textProps: {
                        maxLength: 10
                    }
                }}
            >
                React makes it painless to create interactive UIs. Design simple views for each state in your
                application, and React will efficiently update and render just the right components when your data
                changes.
            </Text>
            <H3>fromEnd</H3>
            <Text
                ellipsis={{
                    textProps: {
                        maxLength: 10,
                        direction: 'fromEnd'
                    }
                }}
            >
                React makes it painless to create interactive UIs. Design simple views for each state in your
                application, and React will efficiently update and render just the right components when your data
                changes.
            </Text>
        </div>
    );
};
// demo end

export default Demo;
