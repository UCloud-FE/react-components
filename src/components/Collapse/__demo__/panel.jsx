import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'components/Collapse';
import Form from 'components/Form';
import Switch from 'components/Switch';
import Icon from 'components/Icon';

// demo start
const CustomTitle = ({ open, disabled, children, ...rest }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: 10 }} {...rest}>
            {children}
            {!disabled && <Icon style={{ float: 'right' }} type={`${open ? 'up' : 'down'}`} />}
        </div>
    );
};
CustomTitle.propTypes = {
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            disabled: false,
            customTitle: false
        };
    }
    render() {
        const { open, disabled, customTitle } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="open" {...itemLayout}>
                        <Switch checked={open} onChange={open => this.setState({ open })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="customTitle" {...itemLayout}>
                        <Switch checked={customTitle} onChange={customTitle => this.setState({ customTitle })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Collapse.Panel
                        title={
                            customTitle
                                ? ({ open, disabled }) => (
                                      <CustomTitle open={open} disabled={disabled}>
                                          Custom title
                                      </CustomTitle>
                                  )
                                : 'Panel title'
                        }
                        onChange={open => {
                            this.setState({
                                open
                            });
                            console.log(open);
                        }}
                        open={open}
                        disabled={disabled}
                    >
                        Content
                    </Collapse.Panel>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
