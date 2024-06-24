// import { ProIcontip } from '@ucloud/pro-hovertip';
import React from 'react';
import Icontip from './Icontip';
import {
    StyledItem,
    itemContentCls,
    itemContentWrapperCls,
    itemExtraCls,
    itemTitleCls,
    itemTitleIconCls,
    itemWrapperLastLineCls,
    itemContentRemarkCls,
    itemPrefixCls,
    itemSourceCls,
    itemBodyCls
} from './style';
import { ItemType } from './typings';

/**
 * ConfigInfo.Item
 * @description 配置信息项
 */
const Item = ({
    styleType = 'vertical',
    title,
    titleTip,
    content,
    remark,
    extra,
    customTitleWidth,
    isLastLine,
    prefix,
    noBorder = false,
    aligin = 'left'
}: ItemType): JSX.Element => {
    const renderTitle = () => {
        if (!title) {
            return null;
        }

        return (
            <div className={itemTitleCls} style={customTitleWidth ? { width: customTitleWidth } : {}}>
                {title}
                {titleTip && <Icontip className={itemTitleIconCls} popup={titleTip} />}
            </div>
        );
    };

    const ItemBody:React.FC<{ prefix?:React.ReactNode  }> = ({prefix , children}) => {
      return prefix ? <div className={itemBodyCls}>{children}</div> : <>{children}</>
    };
    return (
        <StyledItem
            className={`${isLastLine ? '' : itemWrapperLastLineCls}`}
            styleType={styleType}
            aligin={aligin}
            noBorder={noBorder}
            prefix={prefix}
        > 
            <ItemBody prefix={prefix}>
              {
                prefix && <div className={itemPrefixCls}>{prefix}</div>
              }
             
              <div className={itemSourceCls}>
                  {renderTitle()}
                  <div className={itemContentWrapperCls}>
                      <div className={itemContentCls}>
                          {content}
                          <div className={itemContentRemarkCls}>{remark}</div>
                      </div>
                      {extra && !prefix && <div className={itemExtraCls}>{extra}</div>}
                  </div>
              </div>
            </ItemBody>
            {extra && prefix && <div className={itemExtraCls}>{extra}</div>}
        </StyledItem>
    );
};

export default Item;

