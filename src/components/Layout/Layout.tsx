import React, { HTMLAttributes } from 'react';
import { Override } from 'src/type';
import classnames from 'classnames';

import { LayoutWrap, prefixCls, prefixClsHasSider } from './style';

export interface LayoutProps {
    /**
     * 是否有侧边导航
     */
    hasSider?: boolean;
}

export interface LayoutContextProps {
    siderHook: {
        addSider: (id: string) => void;
        removeSider: (id: string) => void;
    };
}
export const LayoutContext = React.createContext<LayoutContextProps>({
    siderHook: {
        addSider: () => null,
        removeSider: () => null
    }
});

const Layout = ({ hasSider, ...rest }: LayoutProps & Override<HTMLAttributes<HTMLDivElement>, LayoutProps>) => {
    const [siders, setSiders] = React.useState<string[]>([]);

    const contextValue = React.useMemo(
        () => ({
            siderHook: {
                addSider: (id: string) => {
                    setSiders(prev => [...prev, id]);
                },
                removeSider: (id: string) => {
                    setSiders(prev => prev.filter(currentId => currentId !== id));
                }
            }
        }),
        []
    );

    return (
        <LayoutContext.Provider value={contextValue}>
            <LayoutWrap {...rest} className={classnames(prefixCls, rest.className, (hasSider || !!siders.length) && prefixClsHasSider)} />
        </LayoutContext.Provider>
    );
};

const MemoLayout = React.memo(Layout);

export default MemoLayout;
