import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Modal from 'components/Modal';
import Grid from 'components/Grid';

import {
    ColumnConfigModalNotice,
    ColumnConfigModalCheckboxGroup,
    ColumnConfigModalCheckbox,
    ColumnConfigWrap,
    ColumnConfigButtonWrap
} from './style';
import { TableContext } from './Table';

class ConfigModal extends PureComponent {
    static propTypes = {
        columnConfig: PropTypes.object.isRequired,
        columns: PropTypes.array.isRequired,
        locale: PropTypes.object.isRequired,
        onColumnConfigChange: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
        modalProps: PropTypes.object
    };
    constructor(props) {
        super(props);
        const { columnConfig, columns } = this.props;
        const value = this.convertConfigToValue(columnConfig, columns);
        this.state = {
            value,
            config: columnConfig
        };
    }
    convertValueToConfig = (value, columns) => {
        const { config } = this.state;
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
    render() {
        const { columns, locale, onColumnConfigChange, closeModal, modalProps } = this.props;
        const { value, config } = this.state;
        return (
            <Modal
                {...modalProps}
                title={locale.columnConfigHeader}
                visible={true}
                onClose={closeModal}
                onOk={() => {
                    onColumnConfigChange(config);
                    closeModal();
                }}
                destroyOnClose
            >
                <ColumnConfigModalNotice closable={false} icon={null}>
                    {locale.columnConfigSelected}
                    {locale.colon}
                    {value.length}/{columns.length}
                    {locale.period}
                    {locale.columnConfigTip}
                </ColumnConfigModalNotice>
                <ColumnConfigModalCheckboxGroup
                    value={value}
                    onChange={value => {
                        this.setState({
                            value,
                            config: this.convertValueToConfig(value, columns)
                        });
                    }}
                >
                    <Grid.Row>
                        {columns.map(column => {
                            const { key, title } = column;
                            const dom = [
                                <Grid.Col key={key} span={3}>
                                    <ColumnConfigModalCheckbox
                                        size="lg"
                                        value={key}
                                        disabled={config[key] && config[key].disabled}
                                    >
                                        {title}
                                    </ColumnConfigModalCheckbox>
                                </Grid.Col>
                            ];
                            return dom;
                        })}
                    </Grid.Row>
                </ColumnConfigModalCheckboxGroup>
            </Modal>
        );
    }
}

export default class ColumnConfigButton extends PureComponent {
    static propTypes = {
        /** 弹窗的props */
        modalProps: PropTypes.object
    };
    state = {
        modalVisible: false
    };
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
    render() {
        const { modalVisible } = this.state;
        const { modalProps, ...rest } = this.props;

        return (
            <ColumnConfigWrap {...rest}>
                <ColumnConfigButtonWrap icon="cog" onClick={this.showModal} />
                {modalVisible && (
                    <TableContext.Consumer>
                        {({ columns, columnConfig, onColumnConfigChange, locale }) => (
                            <ConfigModal
                                modalProps={modalProps}
                                {...{
                                    columns,
                                    columnConfig,
                                    onColumnConfigChange,
                                    locale,
                                    closeModal: this.closeModal
                                }}
                            />
                        )}
                    </TableContext.Consumer>
                )}
            </ColumnConfigWrap>
        );
    }
}
