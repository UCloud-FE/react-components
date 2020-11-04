import React from 'react';
import _ from 'lodash';

import EditableList from 'src/components/EditableList';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import ZForm from 'src/components/ZForm';

// demo start
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

const renderItem = item => {
    return <Input defaultValue={item.name} />;
};

class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                generateData({ name: '默认数据，不能删除', deletable: false }),
                generateData({ name: '默认数据，不能删除', deletable: false })
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
            <EditableList
                renderItem={renderItem}
                dataSource={dataSource}
                addition={{ onAdd: () => this.handleAdd() }}
                itemDeletion={{
                    onDelete: record => this.handleDelete(record),
                    getDisabledOfItem: record => record.deletable === false
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
            <EditableList
                renderItem={renderItem}
                dataSource={dataSource}
                addition={{
                    onAdd: () => this.handleAdd(),
                    disabled: dataSource.length >= 5
                }}
                itemDeletion={{
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

const renderError = (error, key) => {
    const e = _.get(error, key);
    return e ? <p style={{ color: 'red' }}>{e.join(',')}</p> : null;
};

class Demo3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
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
    renderItem(item, originErrors) {
        return (
            <div>
                <ZInput zName={`data.${item.key}.name`} zOptions={{ rules: [{ required: true }] }} />
                {renderError(originErrors, `data.${item.key}.name`)}
            </div>
        );
    }
    render() {
        const { form } = this.props;
        const { dataSource } = this.state;
        const originErrors = form.getFieldsError() || [];

        return (
            <div>
                <ZForm form={form}>
                    <EditableList
                        renderItem={item => this.renderItem(item, originErrors)}
                        dataSource={dataSource}
                        addition={{
                            onAdd: () => this.handleAdd()
                        }}
                        itemDeletion={{
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
