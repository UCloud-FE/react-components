import React from 'react';

import Card from 'src/components/Card';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import ActionList from 'src/components/ActionList';
import Select from 'src/components/Select';
import DatePicker from 'src/components/DatePicker';
import TimePicker from 'src/components/TimePicker';
import PopConfirm from 'src/components/PopConfirm';
import AutoComplete from 'src/components/AutoComplete';
import Tooltip from 'src/components/Tooltip';
import Popover from 'src/components/Popover';
import ConfigProvider from 'src/components/ConfigProvider';

// demo start
const list = [
    {
        title: 'Select',
        demo: <Select options={new Array(100).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }))} />
    },
    {
        title: 'DatePicker',
        demo: <DatePicker />
    },
    {
        title: 'DatePicker.Month',
        demo: <DatePicker type="month" />
    },
    {
        title: 'DatePicker.Range',
        demo: <DatePicker.Range />
    },
    {
        title: 'TimePicker',
        demo: <TimePicker />
    },
    {
        title: 'ActionList',
        demo: (
            <ActionList
                exposeCount={1}
                actionList={new Array(6).fill(null).map((v, i) => ({
                    label: `Action ${i}`
                }))}
            />
        )
    },
    {
        title: 'AutoComplete',
        demo: <AutoComplete options={new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }))} />
    },
    {
        title: 'PopConfirm',
        demo: (
            <PopConfirm popup="xxx">
                <Button>pop confirm</Button>
            </PopConfirm>
        )
    },
    {
        title: 'Tooltip',
        demo: (
            <Tooltip popup="xxx">
                <Button>tooltip</Button>
            </Tooltip>
        )
    },
    {
        title: 'Popover',
        demo: (
            <Popover popup="xxx">
                <Button>popover</Button>
            </Popover>
        )
    }
];
const render = (title, key) => {
    return (
        <div key={key}>
            <h2>{title}</h2>
            <div>
                {list.map(v => {
                    return (
                        <div className="demo-wrap" key={v.title}>
                            <Card>
                                <Card.Header>{v.title}</Card.Header>
                                <Card.Content>
                                    <div style={{ position: 'relative' }}>{v.demo}</div>
                                </Card.Content>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const Demo = () => {
    const [modalVisible, setModalVisible] = React.useState({});
    return [
        { title: 'default', config: false },
        {
            title: 'forwardPopupContainer: false',
            config: { forwardPopupContainer: false }
        },
        {
            title: 'getPopupContainer: body',
            config: { popover: { getPopupContainer: () => document.body } }
        },
        {
            title: 'getPopupContainer: body & ignorePopover',
            config: {
                popover: { getPopupContainer: () => document.body, ignorePopover: true }
            }
        },
        {
            title: 'forwardPopupContainer: parent & ignore align when scroll',
            config: {
                popover: { getPopupContainer: triggerNode => triggerNode.parentNode, forceAlignWhenScroll: false }
            }
        }
    ].map(({ title, config }, i) => {
        let content = (
            <div key={i}>
                {render(title, i)}
                <div className="demo-wrap">
                    <Button onClick={() => setModalVisible({ ...modalVisible, [i]: true })}>Open Modal</Button>
                </div>
                <Modal
                    visible={modalVisible[i]}
                    onClose={() => setModalVisible({ ...modalVisible, [i]: false })}
                    footer={
                        <Button styleType="primary" onClick={() => setModalVisible({ ...modalVisible, [i]: false })}>
                            确定
                        </Button>
                    }
                >
                    <Modal.Content>{render(title, i)}</Modal.Content>
                </Modal>
            </div>
        );
        if (config) {
            content = (
                <ConfigProvider key={i} {...config}>
                    {content}
                </ConfigProvider>
            );
        }
        return content;
    });
};
// demo end

export default Demo;
