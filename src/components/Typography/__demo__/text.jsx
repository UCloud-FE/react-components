import React from 'react';

import Typography from 'src/components/Typography';
// demo start
const { Text } = Typography;

const Demo = () => {
    return (
        <div>
            <Text color="light" lineHeight="lg">
                Udesign(default)
            </Text>
            <br />
            <Text color="dark" lineHeight="lg">
                Udesign(dark)
            </Text>
            <br />
            <Text color="light" lineHeight="lg">
                Udesign(light)
            </Text>
            <br />
            <Text color="remark" lineHeight="lg">
                Udesign(remark)
            </Text>
            <br />
            <Text color="remark_light" lineHeight="lg">
                Udesign(remark_light)
            </Text>
            <br />
            <Text color="primary" lineHeight="lg" disabled={true}>
                Udesign(disabled)
            </Text>
            <br />
            <Text color="success" lineHeight="lg">
                Udesign(success)
            </Text>
            <br />
            <Text color="warning" lineHeight="lg">
                Udesign(warning)
            </Text>
            <br />
            <Text color="error" lineHeight="lg">
                Udesign(error)
            </Text>
            <br />
            <Text color="primary" lineHeight="lg" isLink={true}>
                Udesign(link)
            </Text>
            <br />
            <Text color="dark" lineHeight="lg">
                Udesign(code)
            </Text>
            <br />
            {/* <Text color="bright"  lineHeight="lg">Udesign(bright)</Text>
        <br /> */}
        </div>
    );
};
// demo end

export default Demo;
