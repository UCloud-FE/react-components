import React, { ReactNode, useCallback, useContext, useState } from 'react';
import Popover from 'src/components/Popover';
import type { TooltipProps } from 'src/components/Tooltip';
import Tooltip from 'src/components/Tooltip';
import { DragContext } from './DragWrap';

interface TableRowProps {
    record: any;
    contextMenu?: (record: any, hideContextMenu: () => void) => ReactNode;
    draggable?: boolean;
    'data-row-key'?: string | number;
    rowTooltip?: (record: any) => TooltipProps;
}

const TableRowWithTooltip = React.memo(function TableRowWithTooltip({
    record,
    rowTooltip,
    ...rest
}: Omit<TableRowProps, 'dragAble' | 'contextMenu'>) {
    const tooltipProps = React.useMemo(() => rowTooltip?.(record), [record, rowTooltip]);
    if (!rowTooltip) return <tr {...rest} />;
    if (!tooltipProps) return <tr {...rest} />;
    return (
        <Tooltip {...tooltipProps}>
            <tr {...rest} />
        </Tooltip>
    );
});

const TableRowWithContextMenu = React.memo(function TableRowWithContextMenu({
    record,
    contextMenu,
    rowTooltip,
    ...rest
}: Omit<TableRowProps, 'dragAble'>) {
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const hideContextMenu = useCallback(() => {
        setContextMenuVisible(false);
    }, []);

    if (contextMenu) {
        return (
            <Popover
                popup={<div>{contextMenu(record, hideContextMenu)}</div>}
                trigger={['contextMenu']}
                hideAction={['click']}
                visible={contextMenuVisible}
                onVisibleChange={setContextMenuVisible}
                animation={null}
                alignPoint
            >
                <TableRowWithTooltip record={record} rowTooltip={rowTooltip} {...rest} />
            </Popover>
        );
    }
    return <TableRowWithTooltip record={record} rowTooltip={rowTooltip} {...rest} />;
});

const TableRowWithDrag = React.memo(function TableRowWithDrag(props: Omit<TableRowProps, 'dragAble'>) {
    const { dragProps, dropProps } = useContext(DragContext);
    return <TableRowWithContextMenu {...props} {...dragProps} {...dropProps} draggable={false} />;
});

const TableRow = ({ ...restProps }: TableRowProps) => {
    const { draggable } = useContext(DragContext);
    if (draggable) return <TableRowWithDrag {...restProps} />;
    return <TableRowWithContextMenu {...restProps} />;
};

export default React.memo(TableRow);
