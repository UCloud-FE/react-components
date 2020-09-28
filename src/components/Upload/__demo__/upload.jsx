import React from 'react';

import Upload from 'src/components/Upload';
import Form from 'src/components/Form';
import Modal from 'src/components/Modal';
import Switch from 'src/components/Switch';
import Radio from 'src/components/Radio';

// demo start
const { readFile } = Upload;
const handlePreview = file => {
    if (file.type.split('/')[0] === 'image') {
        readFile(file)
            .then(url => {
                Modal.alert(
                    {
                        title: '预览',
                        size: 'md'
                    },
                    <div style={{ textAlign: 'center' }}>
                        <img src={url} width={500} />
                    </div>
                );
            })
            .catch(e => {
                alert(e);
            });
    }
};
const handleError = error => {
    alert(`报错了：${error}`);
    console.error(error);
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: true,
            listType: 'list',
            listTypeOption: null
        };
    }
    render() {
        const {
            disableAdd,
            disableRemove,
            multiple,
            customPreview,
            customErrorHandle,
            disabled,
            onlyAcceptImage,
            maxSize,
            maxCount,
            customSelector,
            listType,
            listTypeOption
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
            disabled,
            listType
        };
        if (listTypeOption) {
            props.listType = [props.listType, listTypeOption];
        }
        if (disableAdd) {
            props.onAdd = () => false;
        }
        if (disableRemove) {
            props.onRemove = () => false;
        }
        if (customPreview) {
            props.onPreview = handlePreview;
        }
        if (customErrorHandle) {
            props.onError = handleError;
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
                    <Form.Item label="listType" {...itemLayout}>
                        <Radio.Group
                            value={listType}
                            options={['none', 'text', 'list', 'dropzone'].map(v => ({ value: v, label: v }))}
                            onChange={listType => this.setState({ listType })}
                        />
                    </Form.Item>
                    <Form.Item label="listTypeOption" {...itemLayout}>
                        <Radio.Group
                            value={listTypeOption}
                            options={[
                                { value: null, label: 'null' },
                                { value: 'thumbnail', label: 'thumbnail' },
                                { value: 'card', label: 'card' }
                            ]}
                            onChange={listTypeOption => this.setState({ listTypeOption })}
                        />
                    </Form.Item>
                    <Form.Item label="customPreview" {...itemLayout}>
                        <Switch checked={customPreview} onChange={customPreview => this.setState({ customPreview })} />
                    </Form.Item>
                    <Form.Item label="customErrorHandle" {...itemLayout}>
                        <Switch
                            checked={customErrorHandle}
                            onChange={customErrorHandle => this.setState({ customErrorHandle })}
                        />
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
                </Form>
                <div className="demo-wrap">
                    <Upload {...props} onChange={console.log} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
