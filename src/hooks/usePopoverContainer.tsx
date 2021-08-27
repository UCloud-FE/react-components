import { useContext, useMemo } from 'react';

import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

const defaultPopupContainer = (triggerNode: HTMLElement) => triggerNode.parentNode;

const usePopoverContainer = (getContainer?: (triggerNode: Element) => Element) => {
    const configContext = useContext(ConfigContext);
    const popoverContainerProps = useMemo(() => {
        return getContainer
            ? { getPopupContainer: getContainer }
            : configContext.getPopupContainer
            ? { getPopupContainer: configContext.getPopupContainer }
            : configContext.forwardPopupContainer
            ? { forwardPopupContainer: defaultPopupContainer }
            : { getPopupContainer: defaultPopupContainer };
    }, [configContext.forwardPopupContainer, configContext.getPopupContainer, getContainer]);
    return popoverContainerProps;
};

export default usePopoverContainer;
