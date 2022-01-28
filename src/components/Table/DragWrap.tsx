import React, { createContext, ReactNode } from 'react';
import useDrag from 'z-use-drag';

const DragContext = createContext<{
    draggable?: boolean;
    dragProps?: ReturnType<typeof useDrag>[0];
    dropProps?: ReturnType<typeof useDrag>[1];
}>({});

const DragWrap = ({
    children,
    draggable,
    ...events
}: Parameters<typeof useDrag>[0] & { children: ReactNode; draggable: boolean }) => {
    const [dragProps, dropProps] = useDrag({
        ...events,
        ignoreChildEnterLeave: true,
        // ignoreSelf: true,
        dropEffect: 'move'
    });
    return <DragContext.Provider value={{ dragProps, dropProps, draggable }}>{children}</DragContext.Provider>;
};

export { DragContext };

export default DragWrap;
