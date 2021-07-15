import React from 'react';
import Notice from 'src/components/Notice';
import Icon from 'src/components/Icon';

// demo start
const layout = { style: { marginBottom: 8 } };

class Demo extends React.Component {
    render() {
        return (
            <div>
                <Notice closable={false} {...layout}>
                    Notice content
                </Notice>
                <Notice icon={null} {...layout}>
                    Notice content
                </Notice>
                <Notice icon={false} {...layout}>
                    Notice content
                </Notice>
                <Notice icon="loading" {...layout}>
                    Notice content
                </Notice>
                <Notice icon={<Icon type="loading" spin />} {...layout}>
                    Notice content
                </Notice>
                <Notice action={<Icon type="loading" onClick={e => console.log(e)} />} {...layout}>
                    Notice content
                </Notice>
                <Notice action={<Icon type="loading" onClick={e => console.log(e)} />} {...layout}>
                    Notice content Notice content Notice content Notice content Notice content Notice content Notice
                    content Notice content Notice content Notice content Notice content Notice content
                </Notice>
            </div>
        );
    }
}

// demo end

export default Demo;
