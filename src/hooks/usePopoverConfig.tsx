import { useContext, useMemo } from 'react';

import ConfigContext, { ConfigContextType } from 'src/components/ConfigProvider/ConfigContext';

const oldDefaultPopupContainer = (triggerNode: HTMLElement) => triggerNode.parentNode;

export const getPopoverConfigFromContext = (configContext: ConfigContextType) => {
    if (configContext.popover) {
        const clone = { ...configContext.popover };
        delete clone.ignorePopover;
        return clone;
    }

    return configContext.forwardPopupContainer === true
        ? { forwardPopupContainer: oldDefaultPopupContainer }
        : { getPopupContainer: oldDefaultPopupContainer };
};

const usePopoverConfig = () => {
    const configContext = useContext(ConfigContext);
    const popoverConfigProps = useMemo(() => {
        return getPopoverConfigFromContext({
            forwardPopupContainer: configContext.forwardPopupContainer,
            popover: configContext.popover
        });
    }, [configContext.forwardPopupContainer, configContext.popover]);
    return popoverConfigProps;
};

export default usePopoverConfig;

export const useShouldUsePopoverConfig = () => {
    const configContext = useContext(ConfigContext);
    return configContext.popover && configContext.popover.ignorePopover !== false;
};
