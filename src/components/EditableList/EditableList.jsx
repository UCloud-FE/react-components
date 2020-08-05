import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import localeConsumerDecorator from 'src/components/LocaleProvider/localeConsumerDecorator';
import { Row, Col } from 'src/components/Grid';
import Button from 'src/components/Button';
import SvgIcon from 'src/components/SvgIcon';
import Combine from 'src/components/Combine';
import Size from 'src/interfaces/Size';

import LOCALE from './locale/zh_CN';
import { ListWrap, itemCls, actionCls, liCls, liGridCls } from './style';

const noop = () => {};

const colShape = {
    /** 栅格占位格数 */
    span: PropTypes.number,
    /** 栅格向右偏移格数，偏移占位 */
    offset: PropTypes.number,
    /** 栅格向左偏移格数，偏移不占位 */
    pull: PropTypes.number,
    /** 栅格向右偏移格数，偏移不占位 */
    push: PropTypes.number
};

@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'EditableList' })
class EditableList extends PureComponent {
    static propTypes = {
        /**
         * 数据列表
         */
        dataSource: PropTypes.array,
        /**
         * 数据渲染
         * @param item 数据
         */
        renderItem: PropTypes.func,
        /**
         * 使用 grid 布局
         */
        grid: PropTypes.shape({
            /**
             * item 的 col 配置
             */
            itemCol: PropTypes.shape(colShape),
            actionCol: PropTypes.shape(colShape)
        }),
        /**
         * 自带控件尺寸
         */
        size: PropTypes.oneOf(Size),
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
                 * 是否禁用
                 */
                disabled: PropTypes.bool
            })
        ]),
        /**
         * 是否可删除（false 隐藏删除按钮）
         */
        itemDeletion: PropTypes.oneOfType([
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
                getDisabledOfItem: PropTypes.func
            })
        ]),
        /** @ignore */
        locale: PropTypes.object
    };
    static defaultProps = {
        addition: true,
        itemDeletion: true,
        size: 'md'
    };
    onAdd = () => {
        const { addition } = this.props;
        const { onAdd = noop } = addition;
        onAdd();
    };
    onDelete = item => {
        const { itemDeletion } = this.props;
        const { onDelete = noop } = itemDeletion;
        onDelete(item);
    };
    renderItem = (item, latest) => {
        const { renderItem = noop, itemDeletion, addition, grid, size } = this.props;
        const { getDisabledOfItem } = itemDeletion;
        const _item = renderItem(item);
        const _action = (
            <Combine sharedProps={{ size }}>
                {!itemDeletion || (getDisabledOfItem && getDisabledOfItem(item)) ? null : (
                    <Button onClick={() => this.onDelete(item)} shape="square">
                        <SvgIcon type="minus" />
                    </Button>
                )}
                {latest && addition && !addition.disabled && (
                    <Button onClick={this.onAdd} shape="square">
                        <SvgIcon type="plus" />
                    </Button>
                )}
            </Combine>
        );
        if (grid) {
            const { itemCol = { span: 8 }, actionCol = { span: 4 } } = grid || {};
            return (
                <Row key={item.key} className={liGridCls}>
                    <Col {...itemCol} className={itemCls}>
                        {_item}
                    </Col>
                    <Col {...actionCol} className={actionCls}>
                        {_action}
                    </Col>
                </Row>
            );
        }
        return (
            <div key={item.key} className={liCls}>
                <div className={itemCls}>{_item}</div>
                <div className={actionCls}>{_action}</div>
            </div>
        );
    };
    renderList = () => {
        const { dataSource = [], addition, size, locale } = this.props;
        return !dataSource.length ? (
            <Button onClick={this.onAdd} disabled={!addition || addition.disabled} size={size}>
                {locale.add}
            </Button>
        ) : (
            dataSource.map((item, i) => {
                return this.renderItem(item, i === dataSource.length - 1);
            })
        );
    };
    render() {
        return <ListWrap>{this.renderList()}</ListWrap>;
    }
}

export default EditableList;
