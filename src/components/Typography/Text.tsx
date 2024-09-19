import { isString } from 'lodash';
import React from 'react';
import Copy from './Copy';
import { TextProps } from './interface';
import LineEllipsis from './LineEllipsis';
import TextEllipsis from './TextEllipsis';
import { StyledTag,SuffixStyleTag } from './style';

const Text: React.FC<TextProps> = ({
    children,
    isNum = false,
    component = 'span',
    useCopy,
    suffix,
    ellipsis,
    containerClassName,
    ...others
}) => {
    let _children = children;

    // 识别并转换数字，如 10000元 -> 10,000元
    if (isNum && isString(children)) {
        _children = children.replace(/\d+/gm, num => num.replace(/(\d)(?=(\d{3})+$)/g, '$1,'));
    }
    const { text, moveTip, clickedTip, ...rest } = useCopy || {};
    const { textProps, lineProps } = ellipsis || {};
    const showType = React.useMemo(() => { 
      if(!ellipsis){
        return 'default'
      }
      const { textProps } = ellipsis;
      if(textProps && textProps.maxLength && isString(children)){
        return 'text'
      }
      return 'line'
    },[ellipsis])

    return (
        <span className={containerClassName}>
            {showType === 'line' &&(
                <LineEllipsis
                    typographyProps={{
                        isNum,
                        ...others
                    }}
                    text={
                        _children
                    }
                    {...lineProps}
                />
            )} 
            
            {showType === 'text' && isString(children) &&(
                <TextEllipsis
                    text={ _children }
                    maxLength={30}
                    typographyProps={{
                      isNum,
                      ...others
                    }}
                    {...textProps}
                />
            )}
            {showType === 'default' && (
                <StyledTag isNum={isNum} component={component} {...others}>
                    {_children}
                </StyledTag>
            )}

            {text && (
                <Copy
                    text={text}
                    tipContent={{
                        moveTip: moveTip,
                        clickedTip: clickedTip
                    }}
                    size={others.size as any}
                    lineHeight={others.lineHeight}
                    {...rest}
                />
            )}
            <SuffixStyleTag  isLink={others.isLink}>
            {suffix}
            </SuffixStyleTag>
        </span>
    );
};

export default Text;
