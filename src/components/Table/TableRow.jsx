import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Popover from 'src/components/Popover';

export default class TableRow extends PureComponent {
    static propTypes = {
        record: PropTypes.object,
        contextMenu: PropTypes.func
    };
    state = {
        contextMenuVisible: false
    };
    hideContextMenu = () => {
        this.setState({
            contextMenuVisible: false
        });
    };
    render() {
        const { record, contextMenu, ...rest } = this.props;
        const { contextMenuVisible } = this.state;
        if (contextMenu) {
            return (
                <Popover
                    popup={<div>{contextMenu(record, this.hideContextMenu)}</div>}
                    trigger={['contextMenu']}
                    hideAction={['click']}
                    visible={contextMenuVisible}
                    onVisibleChange={visible => this.setState({ contextMenuVisible: visible })}
                    animation={null}
                    alignPoint
                >
                    <tr {...rest} />
                </Popover>
            );
        }
        return <tr {...rest} />;
    }
}
