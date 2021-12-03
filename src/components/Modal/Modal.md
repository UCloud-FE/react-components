### 说明

-   弹窗组件，纯受控组件，显示隐藏通过 visible 控制
-   提供 jsx 使用和命令式调用
-   <b style="color: red;">如果想要命令式调用需要注意确保理解命令式调用的风险再去使用</b>

### <b style="color:red;">关于命令式调用弹窗的风险告知</b>

命令式调用弹窗虽然看似简单易用但却存在一些不可避免的风险，而且不易追踪和排查。

实现：命令式主要调用通过创建一个单独的 React 渲染实例来实现，所以存在以下已知问题（是否存在其它风险还不知道）：

1.  <b style="color:red;">会导致上下文丢失</b>

    由于和主实例无关联，会导致 Context 无法获取等各种问题，组件只能解决一些全局的 Context 的处理（并且伴随着一定风险，页面存在多实例可能会出现错乱的情况），而其它项目中的 Context 都会丢失，需要调用者自己处理使用 Context 包裹弹窗等。
    <b style="color:red;">并且这种问题不易排查，风险极大。</b>

2.  <b style="color:red;">生命周期脱离</b>

    同样由于命令式调用，会导致 Modal 的生命周期脱离，在对应页面生命周期变动时无法同步到，需要自行处理销毁、更新等操作。否则会出现如未关闭弹窗时切换页面，弹窗依旧存在等问题。
    <b style="color:red;">同样这种问题不易排查，风险极大。</b>

替换方案：

通过声明式弹窗可以非常简单的替换掉命令式弹窗，可以看到<b style="color:red;">代码量没有任何的增加，但是却可以规避上述的问题</b>，并且下述的命令弹窗还没处理声明周期的问题，卸载时没有销毁弹窗（可点开弹窗点浏览器后退对比试试），如果加上常规处理，<b style="color:red;">命令式的代码量会更多且风险更高</b>：

```js
class DetailModal extends React.Component {
    render() {
        return (
            <Modal
                visible
                footer={
                    <div>
                        <Button styleType="primary" onClick={this.props.onClose}>
                            确定
                        </Button>
                    </div>
                }
                onClose={this.props.onClose}
            >
                <Modal.Content>This is the detail for {this.props.detail.title}</Modal.Content>
            </Modal>
        );
    }
}
DetailModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    detail: PropTypes.object.isRequired
};

const dataSource = new Array(100).fill(null).map((item, i) => ({
    key: i,
    title: `item ${i}`
}));
const columns = [
    {
        title: 'title',
        key: 'title',
        dataIndex: 'title'
    }
];

class IDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            ...columns,
            {
                title: 'action',
                key: 'action',
                render: item => {
                    return <ActionList actionList={[{ label: 'detail', onClick: () => this.showDetail(item) }]} />;
                }
            }
        ];
    }
    showDetail(item) {
        this.modal = Modal.openModal(<DetailModal detail={item} onClose={() => this.closeDetail()} />);
    }
    closeDetail() {
        this.modal.destroy();
    }
    onEnd(result) {
        if (!this.modal) return;
        console.log(result);
        this.modal.destroy();
    }
    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={this.columns} />
            </div>
        );
    }
}

class SDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            ...columns,
            {
                title: 'action',
                key: 'action',
                render: item => {
                    return <ActionList actionList={[{ label: 'detail', onClick: () => this.showDetail(item) }]} />;
                }
            }
        ];
    }
    showDetail(item) {
        this.setState({ detailModal: item });
    }
    closeDetail() {
        this.setState({ detailModal: null });
    }
    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={this.columns} />
                {this.state.detailModal && (
                    <DetailModal detail={this.state.detailModal} onClose={() => this.closeDetail()} />
                )}
            </div>
        );
    }
}

<div>
    <h2 style={{ color: 'red' }}>命令式</h2>
    <IDemo />
    <h2 style={{ color: 'green' }}>声明式</h2>
    <SDemo />
</div>;
```

后续：后续或许会通过 hooks 来处理一些命令式的问题，<b style="color:red;">但是使用并不会更方便</b>，处理后使用上其实依旧只能规避一些常规问题，如常规声明周期等问题，项目内部的上下文问题依旧会比较麻烦，<b style="color:red;">存在隐藏的风险而不易排查</b>。

```js {"static": true}
const Demo = () => {
    const modal = useModal();
    const showDetail = () => modal.openModal(<DetailModal detail={item} onClose={() => this.closeDetail()} />);
};
```

### 演示

#### 演示

```js {"codepath": "modal.jsx"}
```

#### method - 简单的命令式打开弹窗 <b style="color:red;">慎用</b>

```js {"codepath": "method.jsx"}
```

#### openModal - 命令式调用打开整个弹窗 <b style="color:red;">慎用</b>

```js {"codepath": "openModal.jsx"}
```

#### title/footer - 自定义 title/footer 内容

```js {"codepath": "titleAndFooter.jsx"}
```

#### size - 预设尺寸

```js {"codepath": "size.jsx"}
```

#### closable - 关闭按钮

```js {"codepath": "closable.jsx"}
```

#### mask - 是否有遮罩层

```js {"codepath": "mask.jsx"}
```

#### maskClosable - 是否可通过点击遮罩层关闭

```js {"codepath": "maskClosable.jsx"}
```

#### keyboard - 是否可通过键盘关闭

```js {"codepath": "keyboard.jsx"}
```

#### destroyOnClose - 关闭后是否直接销毁

```js {"codepath": "destroyOnClose.jsx"}
```

#### notice - 弹窗中的提示

```js {"codepath": "notice.jsx"}
```

#### 自定义 className

```js {"codepath": "customClassName.jsx"}
```

#### 自定义样式

```js {"codepath": "customStyle.jsx"}
```

#### popupContainer - 弹出层容器

```js {"codepath": "popupContainer.jsx"}
```
