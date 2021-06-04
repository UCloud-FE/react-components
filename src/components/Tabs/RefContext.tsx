import React from 'react';

export type GetRef = (name: string) => HTMLElement | null;
export type SaveRef = (name: string) => (node: HTMLElement | null) => void;

const RefContext = React.createContext<{
    getRef: GetRef;
    saveRef: SaveRef;
}>({
    getRef: () => null,
    saveRef: () => () => null
});

export default RefContext;
