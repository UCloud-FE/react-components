import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from 'src/components/Table';
import SvgIcon from 'src/components/SvgIcon';

import { AddBar, btnCls, AddTip, RemoveBtn } from './style';

const noop = () => {};

class EditableTable extends PureComponent {
    static propTypes = {
        /**
         * @ignore
         */
        footer: PropTypes.func,
        /**
         * @ignore
         */
        columns: PropTypes.array.isRequired,
        /**
         * 是否可添加（false 时禁用添加栏）
         */
        addition: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                /**
                 * 添加回调
                 */
                onAdd: PropTypes.func,
                /**
                 * 添加区域的自定义提示信息
                 */
                tip: PropTypes.node,
                /**
                 * 是否禁用
                 */
                disabled: PropTypes.bool
            })
        ]),
        /**
         * 是否可删除（false 隐藏删除按钮）
         */
        rowDeletion: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                /**
                 * 列删除回调
                 * @param record 删除列数据
                 */
                onDelete: PropTypes.func,
                /**
                 * 获取当前列的是否禁用删除
                 * @param record 当前列数据
                 */
                getDisabledOfRow: PropTypes.func,
                /** 是否固定列 */
                fixed: PropTypes.bool
            })
        ])
    };
    static defaultProps = {
        footer: noop,
        addition: true,
        rowDeletion: true
    };
    onRemove = record => {
        const { rowDeletion } = this.props;
        const { onDelete = noop } = rowDeletion;
        onDelete(record);
    };
    onAdd = () => {
        const { addition } = this.props;
        const { onAdd = noop } = addition;
        onAdd();
    };
    renderFooter = () => {
        const { footer, addition } = this.props;
        const { tip, disabled } = addition;
        const _disabled = !addition || disabled;
        return [
            <AddBar key="add" onClick={_disabled ? null : this.onAdd} disabled={_disabled}>
                {tip ? (
                    [
                        <SvgIcon className={btnCls} type="plus" key="add_btn" size="16px" />,
                        <AddTip key="add_tip">{tip}</AddTip>
                    ]
                ) : (
                    <SvgIcon className={btnCls} type="plus" size="20px" />
                )}
            </AddBar>,
            footer()
        ];
    };
    getColumns = () => {
        const { columns, rowDeletion } = this.props;
        if (!rowDeletion) return columns;
        const { getDisabledOfRow, fixed } = rowDeletion;
        const removeColumn = {
            title: null,
            key: '__editable_table_remove',
            width: 40,
            fixed,
            render: (v, record) => {
                return getDisabledOfRow && getDisabledOfRow(record) ? null : (
                    <RemoveBtn type="cross" onClick={() => this.onRemove(record)} size="16px" />
                );
            }
        };
        return [...columns, removeColumn];
    };
    render() {
        const { ...rest } = this.props;
        return (
            <Table
                {...rest}
                pagination={null}
                footer={this.renderFooter}
                columns={this.getColumns()}
                emptyContent={null}
            />
        );
    }
}

export default EditableTable;
