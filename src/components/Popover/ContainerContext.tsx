import React, { createContext, ProviderProps, useContext } from 'react';

interface Context {
    getPopupContainer?: (trigger: HTMLElement) => HTMLElement;
}
const ContainerContext = createContext<Context>({});

export default ContainerContext;

export const { Consumer, Provider } = ContainerContext;

export const InheritProvider = ({ value, ...props }: ProviderProps<Context>) => {
    const context = useContext(ContainerContext);
    return <Provider value={{ ...value, ...context }} {...props}></Provider>;
};
