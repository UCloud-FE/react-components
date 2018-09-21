import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/Tooltip';
import Radio from 'components/Radio';
import Form from 'components/Form';
import Button from 'components/Button';

// demo start
const { Placement, Theme } = Tooltip;
const Popup = () => <div>This is a popup, dadada</div>;
const Content = props => <Button {...props} />;
Content.propTypes = {
    children: PropTypes.node
};

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placement: Placement[0],
            theme: Theme[0]
        };
    }
    render() {
        const { placement, theme } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="placement" {...itemLayout}>
                        <Radio.Group
                            value={placement}
                            onChange={placement => this.setState({ placement })}
                            options={Placement.map(placement => ({
                                value: placement
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="theme" {...itemLayout}>
                        <Radio.Group
                            value={theme}
                            onChange={theme => this.setState({ theme })}
                            options={Theme.map(theme => ({
                                value: theme
                            }))}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tooltip placement={placement} popup={<Popup />} theme={theme}>
                        <Content>content</Content>
                    </Tooltip>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
