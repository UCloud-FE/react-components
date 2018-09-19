import React, { PureComponent } from 'react';
import _ from 'lodash';

import Modal from 'components/Modal';
import Grid from 'components/Grid';

import {
    ColumnConfigModalNotice,
    ColumnConfigModalCheckboxGroup,
    ColumnConfigModalCheckbox,
    ColumnConfigModalSplitLine,
    ColumnConfigWrap,
    ColumnConfigButtonWrap
} from './style';
import { TableContext } from './Table';

export default class ColumnConfigButton extends PureComponent {
    state = {
        modalVisible: false
    };
    config = {};
    showModal = () => {
        this.setState({
            modalVisible: true
        });
    };
    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };
    convertConfigToValue = (config, columns) => {
        return _.map(columns, column => {
            const { key } = column;
            const info = config[key] || {};
            return {
                key,
                hidden: info.hidden,
                disabled: info.disabled
            };
        })
            .filter(info => !info.hidden)
            .map(info => info.key);
    };
    convertValueToConfig = (value, columns) => {
        const config = this.config;
        const newConfig = {};
        _.each(columns, column => {
            const { key } = column;
            const info = config[key] || {};
            newConfig[key] = {
                hidden: !(_.indexOf(value, key) >= 0),
                disabled: info.disabled
            };
        });
        return newConfig;
    };
    render() {
        const { modalVisible } = this.state;
        const { ...rest } = this.props;

        return (
            <TableContext.Consumer>
                {({ columns, columnConfig, onColumnConfigChange }) => {
                    this.config = columnConfig;
                    const value = this.convertConfigToValue(columnConfig, columns);
                    return (
                        <ColumnConfigWrap {...rest}>
                            <ColumnConfigButtonWrap icon="cog" onClick={this.showModal} />
                            <Modal
                                header="自定义列表"
                                visible={modalVisible}
                                onClose={this.closeModal}
                                onOk={() => {
                                    onColumnConfigChange(this.config);
                                    this.closeModal();
                                }}
                                destroyOnClose
                            >
                                <ColumnConfigModalNotice closable={false} icon={null}>
                                    选中：{value.length}/{columns.length}。清除缓存或更换浏览器，自定义列表失效。
                                </ColumnConfigModalNotice>
                                <ColumnConfigModalCheckboxGroup
                                    defaultValue={value}
                                    onChange={value => (this.config = this.convertValueToConfig(value, columns))}
                                >
                                    <Grid.Row>
                                        {columns.map((column, index) => {
                                            const { key, title } = column;
                                            const dom = [
                                                <Grid.Col key={key} span={3}>
                                                    <ColumnConfigModalCheckbox
                                                        size="lg"
                                                        value={key}
                                                        disabled={columnConfig[key] && columnConfig[key].disabled}
                                                    >
                                                        {title}
                                                    </ColumnConfigModalCheckbox>
                                                </Grid.Col>
                                            ];
                                            if (index % 4 === 0 && index !== 0) {
                                                dom.unshift(
                                                    <ColumnConfigModalSplitLine
                                                        key={`column-split-line-${index}`}
                                                        span={12}
                                                    />
                                                );
                                            }
                                            return dom;
                                        })}
                                    </Grid.Row>
                                </ColumnConfigModalCheckboxGroup>
                            </Modal>
                        </ColumnConfigWrap>
                    );
                }}
            </TableContext.Consumer>
        );
    }
}
