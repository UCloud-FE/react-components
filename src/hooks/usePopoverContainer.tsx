import { useContext, useMemo } from 'react';

import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

const usePopoverContainer = (getContainer?: (triggerNode: Element) => Element) => {
    const configContext = useContext(ConfigContext);
    const popoverContainerProps = useMemo(() => {
        return getContainer
            ? { getPopupContainer: getContainer }
            : configContext.getPopupContainer
            ? { getPopupContainer: configContext.getPopupContainer }
            : configContext.forwardPopupContainer
            ? { forwardPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode }
            : { getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode };
    }, [configContext.forwardPopupContainer, configContext.getPopupContainer, getContainer]);
    return popoverContainerProps;
};

export default usePopoverContainer;
