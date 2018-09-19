import React from 'react';
import Upload from 'components/Upload';

import Form from 'components/Form';
import Modal from 'components/Modal';
import Switch from 'components/Switch';

// demo start
const { readFile } = Upload;
const handlePreview = file => {
    readFile(file)
        .then(url => {
            Modal.alert(
                {
                    title: '预览',
                    size: 'md'
                },
                <img src={url} width={500} height={500} />
            );
        })
        .catch(e => {
            alert(e);
        });
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            disableAdd,
            disableRemove,
            multiple,
            enablePreview,
            disabled,
            onlyAcceptImage,
            maxSize,
            maxCount,
            customSelector,
            hideList
        } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            multiple,
            disabled
        };
        if (disableAdd) {
            props.onAdd = () => false;
        }
        if (disableRemove) {
            props.onRemove = () => false;
        }
        if (enablePreview) {
            props.onPreview = handlePreview;
        }
        if (onlyAcceptImage) {
            props.accept = 'image/*';
        }
        if (maxSize) {
            props.maxSize = 1024 * 100;
        }
        if (maxCount) {
            props.maxCount = 3;
        }
        if (customSelector) {
            props.selector = <div>点我选文件</div>;
        }
        if (hideList) {
            props.listType = 'none';
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="disableAdd" {...itemLayout}>
                        <Switch checked={disableAdd} onChange={disableAdd => this.setState({ disableAdd })} />
                    </Form.Item>
                    <Form.Item label="disableRemove" {...itemLayout}>
                        <Switch checked={disableRemove} onChange={disableRemove => this.setState({ disableRemove })} />
                    </Form.Item>
                    <Form.Item label="multiple" {...itemLayout}>
                        <Switch checked={multiple} onChange={multiple => this.setState({ multiple })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="enablePreview" {...itemLayout}>
                        <Switch checked={enablePreview} onChange={enablePreview => this.setState({ enablePreview })} />
                    </Form.Item>
                    <Form.Item label="onlyAcceptImage" {...itemLayout}>
                        <Switch
                            checked={onlyAcceptImage}
                            onChange={onlyAcceptImage => this.setState({ onlyAcceptImage })}
                        />
                    </Form.Item>
                    <Form.Item label="maxSize" {...itemLayout}>
                        <Switch checked={maxSize} onChange={maxSize => this.setState({ maxSize })} />
                    </Form.Item>
                    <Form.Item label="maxCount" {...itemLayout}>
                        <Switch checked={maxCount} onChange={maxCount => this.setState({ maxCount })} />
                    </Form.Item>
                    <Form.Item label="customSelector" {...itemLayout}>
                        <Switch
                            checked={customSelector}
                            onChange={customSelector => this.setState({ customSelector })}
                        />
                    </Form.Item>
                    <Form.Item label="hideList" {...itemLayout}>
                        <Switch checked={hideList} onChange={hideList => this.setState({ hideList })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Upload {...props} onChange={console.log} onError={console.error} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
