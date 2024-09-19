import Tooltip from 'src/components/Tooltip';
import SvgIcon from 'src/components/SvgIcon';
import React, { useCallback, useState , memo } from 'react';
import { CopyIconTag, CopyStyledWrapper, TipWrapper } from './style';
import { CopyProps } from './interface';
import useCopy from './useCopy';


const Icon = ({
  text,
  tipContent,
  customPoptip,
  handleCopy: cusHandleCopy,
  handleCopied: cusHandleCopied,
  ...restProps
}: CopyProps ) => {
  const copy = useCopy();
  const copyTip = React.useMemo(() => {
    return tipContent?.moveTip 
  },[tipContent?.moveTip]) 

  const copiedTip = React.useMemo(() => {
    return tipContent?.clickedTip 
  },[tipContent?.clickedTip ]) 

  const [copyTipContent, setCopyTipContent] = useState(copyTip);

  const PopTip = customPoptip ? (
    customPoptip?.(copyTipContent)
  ) : (
    <TipWrapper>{copyTipContent}</TipWrapper>
  );
  
  const handleCopy = useCallback(() => {
    if (cusHandleCopy) {
      cusHandleCopy?.();
    } else {
      copy?.(text);
    }

    setCopyTipContent(copiedTip);
  }, [text]);

  const handleCopied = useCallback(() => {
    if (cusHandleCopied) {
      cusHandleCopied?.();
      return;
    }
    setCopyTipContent(copyTip);
  }, []);

  return (
    <Tooltip
    popup={PopTip}
    placement="top"
    getPopupContainer={() => document.body}
    onVisibleChange={() => handleCopied()}
  >
    <CopyStyledWrapper size={restProps.size} lineHeight={restProps.lineHeight} onClick={() => handleCopy()}>
        <CopyIconTag  {...restProps} />
    </CopyStyledWrapper>
    </Tooltip>
  );
};





export default Icon;