import React from 'react';
import _ from 'lodash';

import EditableTable from 'src/components/EditableTable';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import ZForm from 'src/components/ZForm';
import Select from 'src/components/Select';

// demo start
const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
            options: [1, 2, 3, 4]
        },
        order: true
    },
    {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        filter: {
            options: [1, 2, 3, 4],
            multiple: true
        },
        order: true
    }
];

let uid = 0;

const generateData = ({ name, desc, deletable } = {}) => {
    const id = uid++;
    return {
        key: id + '',
        name: name || `name-${id}`,
        desc: desc || `desc-${id}`,
        deletable
    };
};

class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                generateData({ desc: '默认数据，不能删除', deletable: false }),
                generateData({ desc: '默认数据，不能删除', deletable: false })
            ]
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                addition={{ onAdd: () => this.handleAdd() }}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record),
                    getDisabledOfRow: record => record.deletable === false
                }}
            />
        );
    }
}
class Demo2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    render() {
        const { dataSource } = this.state;
        return (
            <EditableTable
                columns={columns}
                dataSource={dataSource}
                addition={{
                    onAdd: () => this.handleAdd(),
                    disabled: dataSource.length >= 5,
                    tip: dataSource.length >= 5 ? '太多了，不能再来了' : '还能再来点'
                }}
                rowDeletion={{
                    onDelete: record => this.handleDelete(record)
                }}
            />
        );
    }
}

const { formDecorator, controllerDecorator, formShape } = ZForm;
const ZInput = controllerDecorator({
    initialValue: ''
})(Input);
const ZSelect = controllerDecorator()(Select);
const tags = ['tag1', 'tag2', 'tag3'].map(v => ({ value: v, label: `tag-${v}` }));

const renderError = (error, key) => {
    const e = _.get(error, key);
    return e ? <p>{e.join(',')}</p> : null;
};

class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
        this.savePopupContainer = this.savePopupContainer.bind(this);
        this.getPopupContainer = this.getPopupContainer.bind(this);
    }
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            if (!error) {
                console.log((value.data || []).filter(v => v));
            }
        });
    }
    handleDelete(record) {
        console.log('Remove', record);
        const { dataSource } = this.state;
        const key = record.key;
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    handleAdd() {
        const { dataSource } = this.state;
        dataSource.push(generateData());
        this.setState({ dataSource });
    }
    savePopupContainer(_ref) {
        this.popupContainer = _ref;
    }
    getPopupContainer() {
        return this.popupContainer;
    }
    render() {
        const { form } = this.props;
        const { dataSource } = this.state;
        const originErrors = form.getFieldsError() || [];
        const columnsForDemo3 = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                render(value, record) {
                    return (
                        <div>
                            <ZInput size="sm" zName={`data.${record.key}.name`} />
                            {renderError(originErrors, `data.${record.key}.name`)}
                        </div>
                    );
                }
            },
            {
                title: 'desc',
                dataIndex: 'desc',
                key: 'desc',
                render(value, record) {
                    return (
                        <div>
                            <ZInput size="sm" zName={`data.${record.key}.desc`} />
                            {renderError(originErrors, `data.${record.key}.desc`)}
                        </div>
                    );
                }
            },
            {
                title: 'tag',
                dataIndex: 'tag',
                key: 'tag',
                render: (value, record) => {
                    return (
                        <div>
                            <ZSelect
                                size="sm"
                                zName={`data.${record.key}.tag`}
                                zOptions={{
                                    rules: [{ required: true }]
                                }}
                                options={tags}
                                multiple
                                search
                                popoverProps={{
                                    getPopupContainer: this.getPopupContainer
                                }}
                            />
                            {renderError(originErrors, `data.${record.key}.tag`)}
                        </div>
                    );
                }
            }
        ];
        return (
            <div>
                <div ref={this.savePopupContainer}></div>
                <ZForm form={form}>
                    <EditableTable
                        columns={columnsForDemo3}
                        dataSource={dataSource}
                        addition={{
                            onAdd: () => this.handleAdd()
                        }}
                        rowDeletion={{
                            onDelete: record => this.handleDelete(record)
                        }}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Button styleType="primary" onClick={() => this.handleSubmit()}>
                            submit
                        </Button>
                    </div>
                </ZForm>
            </div>
        );
    }
}
Demo3.propTypes = {
    form: formShape
};
const Demo3WithForm = formDecorator()(Demo3);
const Demo = () => {
    return (
        <div>
            <h2>存在默认数据，且默认数据不可删除</h2>
            <div className="demo-wrap">
                <Demo1 />
            </div>
            <h2>只能添加有限数据</h2>
            <div className="demo-wrap">
                <Demo2 />
            </div>
            <h2>组合 ZForm 表单</h2>
            <div className="demo-wrap">
                <Demo3WithForm />
            </div>
        </div>
    );
};
// demo end

export default Demo;
