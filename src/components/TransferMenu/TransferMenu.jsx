import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Transfer from 'src/components/Transfer';
import Menu from 'src/components/Menu';

import { MenuWrap, menuCls } from './style';

class TransferMenu extends PureComponent {
    static propTypes = {
        ...Transfer.propTypes,
        /** 渲染项 */
        renderItem: PropTypes.func
    };
    renderList = ({ dataSource, selectedKeys, onChange, disabled }) => {
        const { renderItem } = this.props;
        return (
            <MenuWrap>
                <Menu
                    className={menuCls}
                    multiple
                    showSelectAll
                    block
                    disabled={disabled}
                    onChange={onChange}
                    selectedKeys={selectedKeys}
                >
                    {dataSource.map(item => (
                        <Menu.Item key={item.key} itemKey={item.key} disabled={item.disabled}>
                            {renderItem ? renderItem(item) : item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </MenuWrap>
        );
    };
    render() {
        const { ...rest } = this.props;
        return <Transfer {...rest} renderList={this.renderList} />;
    }
}

export default TransferMenu;
